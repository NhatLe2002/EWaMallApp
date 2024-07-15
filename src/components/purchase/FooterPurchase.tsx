import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {useNavigation} from '@react-navigation/native';
import {formatPriceToVND} from '../../config/FixPrice';
import {useDispatch, useSelector} from 'react-redux';
import {
  InterfaceAddressState,
  InterfaceOrderState,
} from '../../constant/interface';
import {CreateOrderRequest} from '../../constant/types';
import {createOrder} from '../../redux/slice/orderSlice';

const FooterPurchase: React.FC<{totalCost: number}> = ({totalCost}) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {feeShip} = useSelector(
    (state: InterfaceAddressState) => state.addressReducer,
  );
  const {info_order} = useSelector(
    (state: InterfaceOrderState) => state.orderReducer,
  );
  const costOrder = totalCost + feeShip?.total;
  const handlePurchase = (data: CreateOrderRequest) => {
    navigation.navigate('QR');

  };

 
  return (
    <View style={styles.container}>
      <View style={styles.containerBuy}>
        <View style={{paddingLeft: '4%', paddingTop: '2%'}}>
          <Text style={{fontSize: 11, color: COLORS.gray_2}}>
            Tổng thanh toán
          </Text>
          <Text
            style={{color: COLORS.red_price, fontFamily: FONTS.inter_SemiBold}}>
            {formatPriceToVND(costOrder)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonBuy}
          onPress={() => handlePurchase(info_order)}>
          <Text style={styles.textBuy}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterPurchase;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: SIZES.width,
    height: SIZES.height / 10,
    backgroundColor: 'white',
    borderColor: COLORS.border_gray,
    borderTopWidth: 1,
  },
  containerBuy: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
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
