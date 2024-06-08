import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Iconions from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constant/theme';
import RattingStart from '../../reusables/ratting/RattingStart';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySellerId } from '../../redux/slice/seller/productSellerSlice';
import { InterfaceProductState } from '../../constant/interface/productInterface';
import { Product } from '../../constant/types/productType';

// const productsList = [
//     { id: 1, name: 'Ghế công thái học', rating: 4.5, price: 100, quantity: 10, image: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' },
//     { id: 2, name: 'Product 1', rating: 4.5, price: 100, quantity: 10, image: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' },
//     { id: 3, name: 'Product 1', rating: 4.5, price: 100, quantity: 10, image: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' },
// ];

const ProductListSeller = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<any>();

    const { productList,  productListRenderRedux} = useSelector(
        (state: InterfaceProductState) => state.productSellerReducer,
    );

    useEffect(() => {
        dispatch(getProductsBySellerId(2));
    }, []);


    const renderItem = ({ item }: { item: Product }) => (
        <View >
            <TouchableOpacity
                style={styles.productItem}
                onPress={() => {
                    // navigation.navigate('ProductDetail', { productId: item.id });
                }}>
                <Image source={{ uri: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' }} style={styles.productImage} />
                <View style={styles.detailProductList}>
                    <View style={styles.headerProductList}>
                        <View>
                            <Text style={styles.productName}>{item.productName}</Text>
                        </View>
                        <TouchableOpacity
                        // onPress={() => navigation.goBack()}
                        >
                            <Iconions name="trash" color={COLORS.black} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <RattingStart star={3.6} size={15} />
                        <Text style={{ marginLeft: 5 }} ></Text>
                    </View>
                    <View style={styles.botProductList}>
                        <Text style={styles.prductPridce}>{item.productSellerDetails}đ</Text>
                        <Text >Quantity: {item.productSellerDetails}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={productListRenderRedux}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            >
            </FlatList>
        </View>
    )
}

export default ProductListSeller

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
        width: '100%',
    },
    detailProductList: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '55%',
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
        width: '40%',
        height: 115,
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
        marginTop: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    prductPridce: {
        color: '#CD0000',
        fontWeight: 'bold'
    }
})