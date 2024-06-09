import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderSeller from '../../../reusables/header/HeaderSeller'
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller'
import HeightSpacerSeller from '../../../reusables/height_spacer/HeightSpacerSeller'
import { COLORS, FONTS } from '../../../constant/theme'
import { useDispatch, useSelector } from 'react-redux'
import { InterfaceOrderState } from '../../../constant/interface'
import { ISellerState } from '../../../constant/interface/sellerInterface'
import { getAllOrderBySellerId } from '../../../redux/slice/orderSlice'
import { OrderGetBySellerId } from '../../../constant/types/orderType'
import { Path } from 'react-native-svg';

const Finance = () => {
    const dispatch = useDispatch<any>();
    const [ordertListFilter, setOrderListFilter] = useState<OrderGetBySellerId[]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);

    const { orderListBySellerId } = useSelector(
        (state: InterfaceOrderState) => state.orderReducer,
    );
    const { seller } = useSelector(
        (state: ISellerState) => state.sellerReducer,
    );
    useEffect(() => {
        // dispatch(getAllOrderBySellerId(seller?.id));
        // console.log(JSON.stringify(seller, null, 2))
        // console.log(seller?.seller?.id)
        dispatch(getAllOrderBySellerId(seller?.seller?.id));
        // console.log(JSON.stringify(orderListBySellerId, null, 2))
    }, []);
    useEffect(() => {
        const activeOrders  = filterOrderByStatus(4);
        setTotalCost(calculateTotalCost(activeOrders));
        // console.log(activeProducts);
        setOrderListFilter(activeOrders );
    }, [orderListBySellerId])
    const filterOrderByStatus = (status: number) => {
        return orderListBySellerId?.filter((order: OrderGetBySellerId) => order.statusId === status);
    };


    const renderItem = ({ item }: { item: OrderGetBySellerId }) => (
        <View>
            <Text>{item.totalCost}</Text>
        </View>
    );
    const calculateTotalCost = (orders: OrderGetBySellerId[]) => {
        return orders.reduce((acc, order) => acc + order.totalCost, 0);
    };
    const formatPrice = (price: number) => {
        return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' đ';
    };
    return (
        <View style={styles.container}>
            <HeaderTitleSeller text={'Tài chính'} />
            <HeightSpacerSeller color={COLORS.gray_3} height={10} />
            <View style={styles.doanhThuContainer}>
                <Text style={styles.text}>Tổng doanh Thu Đơn Hàng</Text>
                <Text style={styles.textPrice}>{formatPrice(totalCost)}</Text>
            </View>
            <HeightSpacerSeller color={COLORS.gray_3} height={5} />
            <View style={styles.lsddContainer}>
                <View style={styles.doanhThuTitleContainer}>
                    <Text style={styles.doanhThuText}>
                        Lịch sử giao dịch
                    </Text>
                </View>
                <View style={styles.doanhThuBodyContainer}>
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
    },
    doanhThuContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: COLORS.black,
    },
    lsddContainer: {
        padding: 10,
    },
    doanhThuTitleContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    doanhThuBodyContainer: {
        paddingVertical: 10,
    },
    text: {
        color: COLORS.black,
        fontSize: 16,
    },
    textPrice: {
        fontSize: 20,
        color: 'red',
        fontFamily: FONTS.inter_bold
    },
    doanhThuText:{
        fontSize: 20,
        fontFamily: FONTS.inter_SemiBold,
        color: COLORS.black
    }
})