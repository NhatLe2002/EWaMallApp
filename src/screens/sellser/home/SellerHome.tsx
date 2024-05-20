import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderSeller from '../../../reusables/header/HeaderSeller';
import OrderStatusList from '../../../components/home_seller/OrderStatusList';
import Body from '../../../components/home_seller/Body';


const SellerHome = () => {
  return (
    <View style = {{flex : 1}}>
      <View >
        <HeaderSeller />
      </View >
      <View style={styles.body}>

        <View style={{ height: '20%' }}>
          <OrderStatusList />
        </View>
        <View style={{ height: '45%' }}>
          <Body />
        </View>
      </View>
    </View>
  )
}

export default SellerHome

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flexDirection: 'column',
  },
  body : {
    marginHorizontal: 15,
    flexDirection: 'column',
  }
})