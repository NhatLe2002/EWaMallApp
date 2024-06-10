import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import BodyTitle from '../../reusables/Title/BodyTitle';
import { COLORS, FONTS } from '../../constant/theme';
import { useDispatch, useSelector } from 'react-redux';
import { IOrderStatusState } from '../../constant/interface/IStatusOrder';
import { fetchAllStatus } from '../../redux/slice/statusOrderSlice';
import { orderStatus } from '../../constant/types/statusOrderType';
import { OrderGetBySellerId } from '../../constant/types/orderType';
import { InterfaceOrderState } from '../../constant/interface';







const OrderStatusList = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  const { statusList } = useSelector(
    (state: IOrderStatusState) => state.orderStatusReducer,
  );
  useEffect(() => {
    dispatch(fetchAllStatus());
    // console.log(JSON.stringify(statusList, null, 2));
  }, []);
  const {orderListBySellerId} = useSelector(
    (state: InterfaceOrderState) => state.orderReducer,
  );
  const filterOrderByStatus = (status: number): OrderGetBySellerId[] => {
    return Array.isArray(orderListBySellerId)
      ? orderListBySellerId.filter(
          (order: OrderGetBySellerId) => order.statusId === status,
        )
      : [];
  };
  return (
    <View style={[styles.container]}>
      <BodyTitle titleLeft='Đơn hàng' titleRight='Xem tất cả >' />
      <View style={styles.oderStatus}>
        <ScrollView
          horizontal={true}
          // contentContainerStyle={{ width: '100%' }}
          
          >
          {statusList?.map((order: orderStatus) => (
            <TouchableOpacity
              key={order.id}
              style={[styles.item, { backgroundColor: '#C1BE72' }]}
              onPress={() => navigation.navigate('OrderSeller' as never)}
            >
              <Text style={styles.textQuantity}>{filterOrderByStatus(order.id)?.length}</Text>
              <Text style={styles.text}>
                {order.name}
              </Text>
            </TouchableOpacity>

          ))}
        </ScrollView>
      </View>
      
    </View>
  )
}

export default OrderStatusList

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  oderStatus: {
    height: 70,
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: 120,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    color: COLORS.white,
  },
  textQuantity: {
    textAlign: 'left',
    color: COLORS.white,
    fontFamily: FONTS.roboto_light,
    fontSize: 20,
  },
})