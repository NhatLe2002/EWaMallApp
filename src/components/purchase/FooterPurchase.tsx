import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constant/theme'
import { useNavigation } from '@react-navigation/native';
import { formatPriceToVND } from '../../config/FixPrice';

const FooterPurchase:React.FC<{totalCost: number}> = ({totalCost}) => {
    const price = 200000;
    const formattedPrice = formatPriceToVND(totalCost);
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
    <View style={styles.containerBuy}>
      <View style={{paddingLeft: '4%', paddingTop: '2%'}}>
        <Text style={{fontSize: 11, color: COLORS.gray_2}}>
          Tổng thanh toán
        </Text>
        <Text style={{color:COLORS.red_price, fontFamily:FONTS.inter_SemiBold}}>{formattedPrice}</Text>
      </View>
      <TouchableOpacity style={styles.buttonBuy}
      onPress={()=> navigation.navigate('Purchase' as never)}>
        <Text style={styles.textBuy}>Đặt hàng</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default FooterPurchase

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: SIZES.width,
      height: SIZES.height / 10,
      backgroundColor: 'white',
      borderColor:COLORS.border_gray,
      borderTopWidth:1,
    },
    containerBuy: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap:10,
    
    },
    buttonBuy: {
      backgroundColor: COLORS.backgroundButton,
      paddingVertical: '2%',
      paddingHorizontal: '5%',
      textAlign: 'center',
      justifyContent: 'center',
    },
    textBuy: {
      color: 'white',
      fontFamily: FONTS.inter_SemiBold,
      fontSize: 15,
    },
  });
  