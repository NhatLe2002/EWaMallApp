import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderProductSeller from '../../../components/product_seller/HeaderProductSeller'
import ProductListSeller from '../../../components/product_seller/ProductListSeller'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../constant/theme'




const ProductSeller = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <HeaderProductSeller />
            <ScrollView>
                <ProductListSeller />
            </ScrollView>
            <TouchableOpacity style={styles.addButton}
                onPress={() => navigation.navigate('AddProductSeller' as never)}
            >
                <AntDesign name="pluscircle" size={20} color={'#FFFFFF'} style={styles.icon} />
                <Text style={styles.addButtonText}>
                    Thêm sản phẩm
                </Text>
            </TouchableOpacity>
        </View>

    )
}

export default ProductSeller

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        zIndex: 1000,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BCA114',
        borderRadius: 20,
        paddingHorizontal: 10,
        width: '30%',
    },
    icon: {
        marginRight: 5,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        flexShrink: 1,
    },
})