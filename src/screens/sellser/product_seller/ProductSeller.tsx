import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderProductSeller from '../../../components/product_seller/HeaderProductSeller'
import ProductListSeller from '../../../components/product_seller/ProductListSeller'

const ProductSeller = () => {
    return (
        <ScrollView>
            <HeaderProductSeller />
            <ProductListSeller />
        </ScrollView>
    )
}

export default ProductSeller

const styles = StyleSheet.create({})