import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import BodyTitle from '../../reusables/Title/BodyTitle';
import { COLORS } from '../../constant/theme';
import { useDispatch, useSelector } from 'react-redux';
import { IOrderStatusState } from '../../constant/interface/IStatusOrder';
import { fetchAllStatus } from '../../redux/slice/statusOrderSlice';







const OrderStatusList = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  const {statusList} = useSelector(
    (state: IOrderStatusState) => state.orderStatusReducer,
  );
  useEffect(() => {
    dispatch(fetchAllStatus());
  }, []);
  return (
    <View style = {[styles.container]}>
        <BodyTitle titleLeft='Đơn hàng' titleRight='Xem tất cả >'/>
        <View style = {styles.oderStatus}>
          <TouchableOpacity 
          style = {[styles.item, { backgroundColor: '#C1BE72' }]}
          onPress={() => navigation.navigate('OrderSeller' as never)}
          >
            <Text style = {styles.text}>7</Text>
            <Text style = {styles.text}>
              Chờ lấy hàng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.item, { backgroundColor: '#8EAAC4' }]}>
            <Text style = {styles.text}>7</Text>
            <Text style = {styles.text}>
              Đơn Hủy
            </Text>
          </TouchableOpacity >
          <TouchableOpacity style = {[styles.item, { backgroundColor: '#617458' }]}>
            <Text style = {styles.text}>7</Text>
            <Text style= {[styles.text, {textAlign: 'center'}]}>
              Trả hàng/Hoàn tiền
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.item, { backgroundColor: '#D994AD' }]}>
            <Text style = {styles.text}>7</Text>
            <Text  style= {[styles.text, {textAlign: 'center'}]}>
              Phản hồi đánh giá
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default OrderStatusList

const styles = StyleSheet.create({
  container:{
    justifyContent: 'space-around',
  },
  oderStatus:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item:{
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '23%',
  },
  text: {
    color: COLORS.white,
  }
})