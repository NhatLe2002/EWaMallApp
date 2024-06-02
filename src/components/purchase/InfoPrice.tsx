import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constant/theme';
import {formatPriceToVND} from '../../config/FixPrice';

const InfoPrice: React.FC<{totalCost: number}> = ({totalCost}) => {
  const price = 200000;
  const priceDelivery = 20000;
  const voucher = 0;
  const formattedPrice = formatPriceToVND(price);
  const formattedDeliveryPrice = formatPriceToVND(priceDelivery);
  const formattedVoucherPrice = formatPriceToVND(voucher);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Tổng tiền hàng (1 sản phẩm)</Text>
        <Text style={styles.price} > {formatPriceToVND(totalCost)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Phí vận chuyển</Text>
        <Text style={styles.price}>{formattedDeliveryPrice}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Tổng Voucher giảm giá</Text>
        <Text style={styles.price}>{formattedVoucherPrice}</Text>
      </View>
    </View>
  );
};

export default InfoPrice;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    flexDirection: 'column',
    gap: 5,
    backgroundColor: COLORS.white,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: '#777777',
  },
  price: {
    fontFamily: FONTS.inter_medium,
    fontSize: 14,
  },
});
