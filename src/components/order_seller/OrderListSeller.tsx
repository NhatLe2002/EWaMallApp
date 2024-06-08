import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { InterfaceOrderState } from '../../constant/interface';
import { OrderGetBySellerId } from '../../constant/types/orderType';
import HeightSpacerSeller from '../../reusables/height_spacer/HeightSpacerSeller';
import { COLORS } from '../../constant/theme';
import { updateProductDetailWithImages } from '../../features/GetImage';
import { Product } from '../../constant/types';

const OrderListSeller = () => {
    const { orderListBySellerId, orderListBySellerIdRenderRedux } = useSelector(
        (state: InterfaceOrderState) => state.orderReducer,
    );
    const fetchProductImages = async (product: Product) => {
        const updatedList = await updateProductDetailWithImages(product);
        return (updatedList.imageUrls);
        // setUpdatedProduct(updatedList);
    };

    const renderItem = ({ item }: { item: OrderGetBySellerId }) => (
        
        <View >
            <HeightSpacerSeller height={10} color='#b1b1b1' />
            <View style={styles.itemContainer}>
                <View style={styles.itemTitleContainner}>
                    <Text style={styles.userNameText}>User name</Text>
                    <Text style={styles.statusText}>Status</Text>
                </View>
                <View style={styles.itemBodyContainner}>
                    <View style={styles.itemImageContainer}>
                        <Image
                            style={styles.itemImage}
                            // source={uri : {fetchProductImages(item.orderDetails?.productSellDetail?.product)}}

                        />
                    </View>
                    <View style={styles.itemBodyDescription}>
                        <Text style = {{color: COLORS.black}}>Product name tà tà</Text>
                        <Text style = {{color: COLORS.black}}>Quantity</Text>
                        <Text style = {{color: COLORS.black}}>Giá product</Text>
                    </View>
                </View>
                <View style={styles.itemBottomContainner}>
                    <Text style={styles.itemText}>Item</Text>
                    <Text>Tổng hóa đơn</Text>
                </View>
                <View style={styles.buttonContainner}>
                    <TouchableOpacity>
                        <Text>
                            Chấp nhận đơn hàng
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottonContainner}>
                    <Text>
                        OrderId
                    </Text>
                    <Text>
                        ID
                    </Text>
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>

            <FlatList
                data={orderListBySellerIdRenderRedux}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}

            />
        </View>
    )
}

export default OrderListSeller

const styles = StyleSheet.create({
    container: {
        // flex: 1,

    },


    //Item
    itemContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        marginHorizontal: 10
    },
    itemTitleContainner: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
    },
    userNameText: {
        fontSize: 15,
        color: COLORS.black
    },
    statusText: {
        color: COLORS.red,
        fontSize: 20
    },
    itemBodyContainner: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 5,
    },
    itemBodyDescription: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    itemImage: {
        flex: 1
    },
    itemImageContainer: {
        width: '25%',
        aspectRatio: 1 / 1,
        borderColor: COLORS.black,
        // borderWidth: 0.5,
    },
    itemBottomContainner: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 5,
        paddingVertical: 5,
        borderBottomColor: COLORS.gray_1,
        borderBottomWidth: 0.5
    },
    itemText: {
        color: COLORS.black,
        fontSize: 15
    },
    buttonContainner: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: COLORS.gray_1,
        borderBottomWidth: 0.5
    },
    bottonContainner: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
})