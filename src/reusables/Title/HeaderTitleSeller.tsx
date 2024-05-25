import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Iconions from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constant/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProductSeller from './../../screens/sellser/product_seller/ProductSeller';
import { SafeAreaView } from 'react-native';

interface props {
  text: String
}

const HeaderTitleSeller: React.FC<props> = ({ text }) => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <SafeAreaView>
      {
        route.name === 'SellerHome' ? (
          <View style={styles.containerHome}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Iconions name="arrow-back" color="white" size={25} />
            </TouchableOpacity>
            <Text style={styles.textHome}>Shop của tôi</Text>
          </View>
        ) : (
          <View style={styles.containerProduct}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Iconions name="arrow-back" style = {styles.iconItem}/>
            </TouchableOpacity>
            <View>
              <Text style={styles.textProduct}>{text}</Text>
            </View>
            <View style = {styles.icon}>
              <Feather name="search" style = {styles.iconItem} />
              <Iconions
                name="chatbubble-ellipses-outline"
                color="white"
                size={25}
                style = {styles.iconItem}
              />
            </View>
          </View>
        )
      }

    </SafeAreaView>
  )
}

export default HeaderTitleSeller

const styles = StyleSheet.create({
  containerHome: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  containerProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  textHome: {
    marginLeft: 20,
    fontSize: 22,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.white,
  },
  textProduct: {
    fontSize: 22,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.black,
  },
  icon:{
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  iconItem:{
    color: '#E9BB45',
    fontSize: 25
  }
})