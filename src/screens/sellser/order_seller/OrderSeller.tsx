import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderheaderSeller from '../../../components/order_seller/OrderheaderSeller'
import { useDispatch, useSelector } from 'react-redux';

const OrderSeller = () => {
  const dispatch = useDispatch<any>();
  // const { productList, productListRenderRedux } = useSelector(
  //   (state: InterfaceProductState) => state.productSellerReducer,
  // );
  return (
    <View style = {styles.containner}>
      <OrderheaderSeller />
    </View>
  )
}

export default OrderSeller

const styles = StyleSheet.create({
  containner:{
    flex:1,
  }
})