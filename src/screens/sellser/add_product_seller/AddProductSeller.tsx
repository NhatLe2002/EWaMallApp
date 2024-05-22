import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller'
import HeightSpacer from '../../../reusables/height_spacer/HeightSpacer'
import AddImageProductSeller from '../../../components/add_product_seller/AddImageProductSeller'

const AddProductSeller = () => {
    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.header}>
                    <HeaderTitleSeller text={'Thêm sản phẩm'} />
                </View >
                <View style={styles.imageComponent}>
                    <AddImageProductSeller/>
                </View>
                <View style={styles.productName}>
                    <Text>
                        Tên sản phẩm
                    </Text>
                </View>
                <View>
                    <Text>
                        Mô tả sản phẩm
                    </Text>
                </View>
                <HeightSpacer height={5} />
            </ScrollView>
        </View>
    )
}

export default AddProductSeller

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        borderBottomColor: '9CAFAA',
        borderBottomWidth: 1,
    },
    imageComponent:{
    },
    productName:{
        height: 40
    }
})