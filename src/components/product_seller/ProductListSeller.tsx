import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Iconions from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constant/theme';

const productsList = [
    { id: 1, name: 'Ghế công thái học', rating: 4.5, price: 100, quantity: 10, image: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' },
    { id: 2, name: 'Product 1', rating: 4.5, price: 100, quantity: 10, image: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' },
    { id: 3, name: 'Product 1', rating: 4.5, price: 100, quantity: 10, image: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' },
    { id: 4, name: 'Product 1', rating: 4.5, price: 100, quantity: 10, image: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' },
    { id: 5, name: 'Product 1', rating: 4.5, price: 100, quantity: 10, image: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' },
    { id: 6, name: 'Product 1', rating: 4.5, price: 100, quantity: 10, image: 'https://congthaihoc.vn/wp-content/uploads/2021/10/Sihoo-m93-2.png' },
];

const ProductListSeller = () => {
    return (
        <View style={styles.container}>
            {productsList.map(product => (
                <TouchableOpacity
                    key={product.id}
                    style={styles.productItem}
                // onPress={() => handleProductPress(product)}
                >
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={styles.detailProductList}>
                        <View style={styles.headerProductList}>
                            <View>
                                <Text style={styles.productName}>{product.name}</Text>
                            </View>
                            <View>
                                <Iconions name="trash" color={COLORS.black} size={25} />
                            </View>
                        </View>
                        <Text >Rating: {product.rating}</Text>

                        <View style={styles.botProductList}>
                            <Text >Price: ${product.price}</Text>
                            <Text >Quantity: {product.quantity}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default ProductListSeller

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        width: '100%',
    },
    detailProductList:{
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
        marginBottom: 5
        
    },
    headerProductList: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    botProductList:{
        marginTop: 15,
        justifyContent: 'space-between',
        flexDirection:'row'
    }

})