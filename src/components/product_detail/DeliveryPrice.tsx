import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../constant/theme';

const DeliveryPrice = () => {
  return (
    <View style={styles.container}>
      <View style={styles.deli_top}>
        <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
          Phí vận chuyển
        </Text>
        <Text
          style={{
            paddingLeft: 9,
            fontSize: 16,
            fontWeight: '600',
            color: 'red',
          }}>
          20.000 <Text style={{textDecorationLine: 'underline'}}>đ</Text>
        </Text>
      </View>
      <View style={styles.deli_bot}>
        <Text style={{color: 'black'}}>Nhận vào ngày</Text>
        <Text style={{paddingLeft: 5, color: 'black'}}>
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
    paddingHorizontal: '4%',
    marginVertical: 3,
    width: '100%',
    height: SIZES.height / 15,
  },
  deli_bot: {
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deli_top: {
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
