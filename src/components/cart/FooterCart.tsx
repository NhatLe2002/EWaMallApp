import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {formatPriceToVND} from '../../config/FixPrice';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {InterfaceCartState} from '../../constant/interface';
const FooterCart: React.FC = () => {
  const price = 200000;
  const formattedPrice = formatPriceToVND(price);
  const navigation = useNavigation();
  const {product_purchase} = useSelector(
    (state: InterfaceCartState) => state.cartReducer,
  );
  console.log('tss', product_purchase);
  return (
    <View style={styles.container}>
      <View style={styles.containerVoucher}>
        <View style={styles.addVoucher}>
          <Ionicons name="ticket-outline" size={16} color={COLORS.red_price} />
          <Text style={{fontSize: 14}}>Mã giảm giá</Text>
        </View>
        <View style={styles.addVoucher}>
          <Text style={styles.textAddVoucher}>Chọn hoặc nhập mã</Text>
          <Feather name="chevron-right" size={16} color={COLORS.gray_2} />
        </View>
      </View>
      <View style={{flexGrow: 1}}>
        <View style={styles.containerBuy}>
          <View style={{paddingLeft: '4%', paddingTop: '2%'}}>
            <Text style={{fontSize: 11, color: COLORS.gray_2}}>
              Tổng thanh toán (1 sản phẩm)
            </Text>
            <Text
              style={{
                color: COLORS.red_price,
                fontFamily: FONTS.inter_SemiBold,
              }}>
              {formattedPrice}
            </Text>
          </View>
          <TouchableOpacity
            disabled={product_purchase.length === 0}
            style={[styles.buttonBuy, product_purchase.length === 0 && styles.disabledButton]}
            onPress={() => navigation.navigate('Purchase' as never)}>
            <Text style={styles.textBuy}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FooterCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

    width: SIZES.width,
    height: SIZES.height / 6,
    backgroundColor: 'white',
  },
  containerVoucher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.border_header,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 1,
    shadowRadius: 7,
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderWidth: 1,
    borderColor: COLORS.border_1,
    zIndex: 2,
  },
  addVoucher: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textAddVoucher: {
    color: COLORS.gray_2,
    fontSize: 12,
  },
  containerBuy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  disabledButton: {
    backgroundColor: COLORS.gray_2,
  },
});
