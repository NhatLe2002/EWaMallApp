import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {formatPriceToVND} from '../../config/FixPrice';
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    paddingVertical: 3,
    flexDirection: 'column',
    gap: 5,
    marginVertical: 3,
  },

  productPrice: {
    display: 'flex',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
interface TitleProductProps {
  productName: string;
  price: number;
}
const TitleProduct: React.FC<TitleProductProps> = ({productName, price}) => {
  const formattedPrice = formatPriceToVND(price);
  return (
    <View style={styles.container}>
      <Text
        style={{fontFamily: FONTS.roboto_regular, fontSize: 16}}
        numberOfLines={2}>
        {productName}
      </Text>

      <View style={styles.productPrice}>
        <Text
          style={{
            fontFamily: FONTS.poppins_Medium,
            fontSize: 23,
            color: COLORS.price_red,
          }}>
          {formattedPrice}
        </Text>
      </View>
      <View style={styles.rate}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
          <Icon name="grade" color={COLORS.yellowMain} size={17} />
          <Text style={{fontFamily: FONTS.inter_regular, fontSize: 13}}>5</Text>
        </View>
        <Text style={{color: 'rgba(216, 216, 216, 0.77)'}}>|</Text>
        <Text>Đã bán 299</Text>
      </View>
    </View>
  );
};

export default TitleProduct;
