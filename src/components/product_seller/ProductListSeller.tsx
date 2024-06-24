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
        Alert.alert('Bạn muốn', 'Xóa sản phẩm ra giỏ hàng?', [
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
                // const filteredList = productListRenderRedux.filter(
                //     (product: Product) => product.productStatus === 1,
                // );
                const updatedList = await updateProductListWithImages(productListRenderRedux);
                setUpdatedProductList(updatedList);
            }
        };

        fetchProductImages();
    }, [productListRenderRedux]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

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
                <View style={styles.separator} />
                <View style={styles.detailProductList}>
                    <View style={styles.headerProductList}>
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
                                {item.productName}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => confirmBox(item.id, 5)}>
                            <Iconions name="trash" color={COLORS.red} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ratingContainer}>
                        <RattingStart star={3.6} size={15} />
                    </View>
                    <View style={styles.botProductList}>
                        <View style={styles.priceContainer}>
                            <Text style={styles.productPrice}>{formatCurrency(item.minPrice)}</Text>
                        </View>
                        <Text style={styles.productQuantity}>Số lượng: {item.totalQuantity}</Text>
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
        justifyContent: 'space-between',
        flex: 1,
        paddingVertical: 10,
    },
    productItem: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.gray_1,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 10,
    },
    productName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    headerProductList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    botProductList: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        position: 'relative',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLORS.red,
        backgroundColor: '#fff',
    },
    productPrice: {
        color: COLORS.red,
        fontWeight: 'bold',
        position: 'relative',
        zIndex: 10,
    },
    productPriceBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: -10,
        right: -10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.red,
        zIndex: 5,
    },
    productQuantity: {
        color: COLORS.gray_2,
        fontSize: 12,
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
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: COLORS.gray_1,
        marginHorizontal: 10,
    },
});
