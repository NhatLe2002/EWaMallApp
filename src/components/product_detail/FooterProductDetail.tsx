import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {useNavigation} from '@react-navigation/native';
import {formatPriceToVND} from '../../config/FixPrice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FooterProductDetail: React.FC = () => {
  const price = 200000;
  const formattedPrice = formatPriceToVND(price);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerBuy}>
        <View
          style={{
            paddingLeft: '4%',
            paddingTop: '2%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
          }}>
          <View style={styles.containerIcon}>
            <MaterialCommunityIcons
              name="storefront-outline"
              size={18}
              color={COLORS.yellowMain}
            />
            <Text style={styles.textIcon}>Shop</Text>
          </View>
          <View style={styles.containerIcon}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={18}
              color="#605F5F"
            />
            <Text style={styles.textIcon}>Chat ngay</Text>
          </View>
          <View style={styles.containerIcon}>
            <FontAwesome5 name="cart-plus" size={18} color="#605F5F" />
            <Text style={styles.textIcon}>Thêm vào giỏ</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonBuy}
          onPress={() => navigation.navigate('Purchase' as never)}>
          <Text style={styles.textBuy}>Mua ngay</Text>
          <Text style={{color:'white'}}>{formattedPrice}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterProductDetail;

const styles = StyleSheet.create({
  buttonBuy: {
    backgroundColor: COLORS.backgroundButton,
    paddingVertical: '2%',
    paddingHorizontal: '12%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',

    width: SIZES.width,
    height: SIZES.width / 5,
    backgroundColor: 'white',
  },
  containerBuy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBuy: {
    color: 'white',
    fontFamily: FONTS.inter_SemiBold,
    fontSize: 15,
  },
  containerIcon: {
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
    paddingVertical: '2%',
  },
  textIcon: {
    fontFamily: FONTS.inter_regular,
    fontSize: 11,
    color: '#605F5F',
  },
});
