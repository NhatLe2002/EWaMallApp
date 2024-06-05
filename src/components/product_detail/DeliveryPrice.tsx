import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {formatPriceToVND} from '../../config/FixPrice';

const DeliveryPrice: React.FC = () => {
  const price = 20000;
  const formattedPrice = formatPriceToVND(price);
  return (
    <View style={styles.container}>
      <View style={styles.deli_top}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.roboto_regular,
            color: 'black',
          }}>
          Phí vận chuyển
        </Text>
        <Text
          style={{
            fontFamily: FONTS.inter_SemiBold,
            fontSize: 16,
            color: COLORS.price_red,
          }}>
          {formattedPrice}
        </Text>
      </View>
      <View style={styles.deli_bot}>
        <Text
          style={{
            fontFamily: FONTS.inter_regular,
            color: '#5d5c5c',
            fontSize: 12,
          }}>
          Nhận vào
        </Text>
        <Text
          style={{
            fontFamily: FONTS.inter_regular,
            color: '#5d5c5c',
            fontSize: 12,
          }}>
          12 tháng 2 - 16 tháng 2
        </Text>
      </View>
    </View>
  );
};

export default DeliveryPrice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 3,
    paddingHorizontal: '4%',
    paddingVertical: 3,
    flexDirection: 'column',
    gap: 8,
  },
  deli_bot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deli_top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
