import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller'
import AddImageProductSeller from '../../../components/add_product_seller/AddImageProductSeller'
import { ScrollView } from 'react-native'
import ProductName from '../../../components/add_product_seller/ProductName'
import ProductDescription from '../../../components/add_product_seller/ProductDescription'
import HeightSpacerSeller from '../../../reusables/height_spacer/HeightSpacerSeller'
import ProductInfor from '../../../components/product_seller/ProductInfor'
import { COLORS } from '../../../constant/theme'

const AddProductSeller = () => {
    return (
        <View style = {{flex: 1, backgroundColor: COLORS.white}}>
            <View style={styles.header}>
                <HeaderTitleSeller text={'Thêm sản phẩm'} />
            </View >
            <ScrollView style={styles.container}>

                <View style={styles.imageComponent}>
                    <AddImageProductSeller />
                </View>
                <HeightSpacerSeller height={10} color='#F6F5F2' />
                <View style={styles.productName}>
                    <ProductName />
                </View>
                <HeightSpacerSeller height={10} color='#F6F5F2' />
                <View style={styles.productDescription}>
                    <ProductDescription />
                </View>
                <HeightSpacerSeller height={10} color='#F6F5F2' />
                <View>
                    <ProductInfor />
                </View>
                <HeightSpacerSeller height={10} color='#F6F5F2' />
            </ScrollView>
            <View style={styles.bot}>
                <TouchableOpacity style = {styles.buttomBot}>
                    <Text>
                        Lưu
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.buttomBot}>
                    <Text>
                        Hiển thị
                    </Text>
                </TouchableOpacity>
            </View >
        </View>
    )
}

export default AddProductSeller

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    header: {
        borderBottomColor: '#9290908d',
        borderBottomWidth: 1,
        padding: 10
    },
    imageComponent: {
        marginHorizontal: 10,
        marginVertical: 15
    },
    productName: {
        marginHorizontal: 10,
        marginVertical: 15
    },
    productDescription: {
        marginHorizontal: 10,
        marginVertical: 15
    },

    bot:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttomBot:{
        margin: 10, 
        borderWidth: 0.5,
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#F6F5F2'
    }
})