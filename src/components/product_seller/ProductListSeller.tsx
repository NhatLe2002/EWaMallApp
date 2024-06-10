import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Iconions from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constant/theme';
import RattingStart from '../../reusables/ratting/RattingStart';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProductsBySellerId,
    updateProductOfSeller,
} from '../../redux/slice/seller/productSellerSlice';
import { InterfaceProductState } from '../../constant/interface/productInterface';
import { Product } from '../../constant/types/productType';
import { ISellerState } from '../../constant/interface/sellerInterface';
import { updateProductListWithImages } from '../../features/GetImage';
import { ActivityIndicator } from 'react-native-paper';

const ProductListSeller = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<any>();

    const { productList, productListRenderRedux } = useSelector(
        (state: InterfaceProductState) => state.productSellerReducer,
    );
    const [isLoading, setIsLoading] = useState(false);
    const { seller } = useSelector((state: ISellerState) => state.sellerReducer);

    useEffect(() => {
        dispatch(getProductsBySellerId(seller?.seller?.id));
    }, [seller]);

    const handleUpdateProduct = async (productId: number, status: number) => {
        setIsLoading(true);
        await dispatch(updateProductOfSeller({ productId, status }));
        dispatch(getProductsBySellerId(seller?.seller?.id));
        setIsLoading(false);
    };

    const [updatedProductList, setUpdatedProductList] = useState<any[]>([]);

    const confirmBox = (productId: number, status: number) => {
        Alert.alert('Hi cậu', 'Đồng ý làm người yêu tớ nhé?', [
            {
                text: 'Đồng ý',
                onPress: () => handleUpdateProduct(productId, status),
            },
            {
                text: 'Hủy',
                style: 'cancel',
            },
        ]);
    };

  useEffect(() => {
    const fetchProductImages = async () => {
      if (productListRenderRedux) {
        const filteredList = productListRenderRedux.filter(
          (product: Product) => product.productStatus === 1,
        );
        const updatedList = await updateProductListWithImages(filteredList);
        setUpdatedProductList(updatedList);
      }
    };

    fetchProductImages();
  }, [productListRenderRedux]);

    const renderItem = ({ item }: { item: Product }) => (
        <View>
            <TouchableOpacity
                style={styles.productItem}
                onPress={() => {
                    // navigation.navigate('ProductDetail', { productId: item.id });
                }}>
                <Image
                    source={{
                        uri: String(item?.imageUrls[0]),
                    }}
                    style={styles.productImage}
                />
                <View style={styles.detailProductList}>
                    <View style={styles.headerProductList}>
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productName}>{item.productName}</Text>
                        </View>
                        <TouchableOpacity onPress={() => confirmBox(item.id, 5)}>
                            <Iconions name="trash" color={COLORS.black} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ratingContainer}>
                        <RattingStart star={3.6} size={15} />
                        <Text style={{ marginLeft: 5 }}></Text>
                    </View>
                    <View style={styles.botProductList}>
                        <Text style={styles.prductPridce}>{item.minPrice}đ</Text>
                        <Text style={{ color: COLORS.gray_2, fontSize: 12 }}>Số lượng: {item.totalQuantity}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={updatedProductList}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
        </View>
    );
};

export default ProductListSeller;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        paddingHorizontal: 10,

        paddingTop: 20,
        width: '100%',
    },
    detailProductList: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1
    },
    productItem: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        width: '100%',
        borderRadius: 10,
    },
    productImage: {
        width: '35%',
        aspectRatio: 10 / 9,
        marginRight: 10,
        borderRadius: 10,
    },
    productName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.black
    },
    headerProductList: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    botProductList: {
        width: "100%",
        marginTop: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    prductPridce: {
        color: '#CD0000',
        fontWeight: 'bold'
    },
    loadingIndicator: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        alignSelf: 'center',
    },
    productNameContainer: {
        flex: 1,
        paddingRight: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})