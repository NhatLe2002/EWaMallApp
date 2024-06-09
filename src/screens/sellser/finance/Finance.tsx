import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderSeller from '../../../reusables/header/HeaderSeller'
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller'
import HeightSpacerSeller from '../../../reusables/height_spacer/HeightSpacerSeller'
import { COLORS } from '../../../constant/theme'
import { useDispatch, useSelector } from 'react-redux'
import { InterfaceOrderState } from '../../../constant/interface'
import { ISellerState } from '../../../constant/interface/sellerInterface'
import { getAllOrderBySellerId } from '../../../redux/slice/orderSlice'
import { OrderGetBySellerId } from '../../../constant/types/orderType'

const Finance = () => {
    const dispatch = useDispatch<any>();
    const [ordertListFilter, setProductListFilter] = useState<OrderGetBySellerId[]>([]);

    const { orderListBySellerId } = useSelector(
        (state: InterfaceOrderState) => state.orderReducer,
    );
    const { seller } = useSelector(
        (state: ISellerState) => state.sellerReducer,
    );
    useEffect(() => {
        // dispatch(getAllOrderBySellerId(seller?.id));
        console.log(JSON.stringify(seller, null, 2))
        // console.log(seller?.seller?.id)
        dispatch(getAllOrderBySellerId(seller?.seller?.id));
        // console.log(JSON.stringify(orderListBySellerId, null, 2))
    }, []);
    useEffect(() => {
        const activeProducts = filterOrderByStatus(4);
        setProductListFilter(activeProducts);
    }, [orderListBySellerId])
    const filterOrderByStatus = (status: number) => {
        return orderListBySellerId?.filter((order: OrderGetBySellerId) => order.statusId === status);
    };


    const renderItem = ({ item }: { item: OrderGetBySellerId }) => (
        <View>
            <Text>{item.totalCost}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <HeaderTitleSeller text={'Tài chính'} />
            <HeightSpacerSeller color={COLORS.gray_3} height={10} />
            <View>
                <View>
                    <View>
                        <Text>
                            Tổng số dư
                        </Text>
                    </View>
                    <View></View>
                </View>
                <View>
                    <Text>Doanh Thu Đơn Hàng</Text>
                </View>
                <View>
                    <Text>
                        Lịch sử giao dịch
                    </Text>
                    <FlatList
                        data={ordertListFilter}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </View>
    )
}

export default Finance

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flexDirection: 'column',
    }
})