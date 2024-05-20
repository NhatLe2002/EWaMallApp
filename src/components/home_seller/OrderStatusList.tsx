import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';







const OrderStatusList = () => {
  const navigation = useNavigation();
  return (
    <View style = {styles.container}>
        <View style = {styles.title}>
          <Text>Đơn hàng</Text>
          <TouchableOpacity>

            <Text>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.oderStatus}>
          <TouchableOpacity 
          style = {[styles.item, { backgroundColor: '#ffd166' }]}
          onPress={() => navigation.navigate('' as never)}
          >
            <Text>7</Text>
            <Text>
              Chờ lấy hàng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.item, { backgroundColor: '#b5e2fa' }]}>
            <Text>7</Text>
            <Text>
              Đơn Hủy
            </Text>
          </TouchableOpacity >
          <TouchableOpacity style = {[styles.item, { backgroundColor: '#1b4332' }]}>
            <Text>7</Text>
            <Text style= {{textAlign: 'center'}}>
              Trả hàng/Hoàn tiền
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.item, { backgroundColor: '#f8ad9d' }]}>
            <Text>7</Text>
            <Text  style= {{textAlign: 'center'}}>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item:{
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '23%',
  },
  title:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})