import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderSeller from '../../../reusables/header/HeaderSeller';
import OrderStatusList from '../../../components/home_seller/OrderStatusList';
import Body from '../../../components/home_seller/Body';
import HeaderProfile from '../../../components/profile/HeaderProfile';
import { useRoute } from '@react-navigation/native';
import BodyTitle from '../../../reusables/Title/BodyTitle';
import { SIZES } from '../../../constant/theme';



const SellerHome = () => {
  const check = useRoute();
  return (
    <ScrollView style={{}}>
      <View style={{ height: SIZES.height / 3.8 }}>
        {/* <HeaderSeller /> */}
        <HeaderProfile />
      </View >
      <View style={styles.body}>
        <View >
          <OrderStatusList />
        </View>
        <View style={{ marginTop: 20 }}>
          <Body />
        </View>
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <BodyTitle titleLeft='Phân tích' titleRight='Hôm nay >' />
      </View>
    </ScrollView>
  )
}

export default SellerHome

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flexDirection: 'column',
  },
  body: {
    marginHorizontal: 15,
    flexDirection: 'column',
  }
})