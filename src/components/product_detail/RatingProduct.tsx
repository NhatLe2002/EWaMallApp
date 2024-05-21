import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../constant/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RatingProduct = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: SIZES.height / 16,
          borderBottomWidth: 0.2,
          borderColor: '#aea093',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontWeight: '700',
            paddingTop: 5,
          }}>
          Đánh giá sản phẩm
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="star" color="#EAC452" size={12} />
          <Ionicons name="star" color="#EAC452" size={12} />
          <Ionicons name="star" color="#EAC452" size={12} />
          <Ionicons name="star-half-outline" color="#EAC452" size={12} />
          <Ionicons name="star-outline" color="#EAC452" size={12} />
          <View style={{marginLeft: 15, flexDirection: 'row'}}>
            <Text style={{fontSize: 12, color: 'red'}}>
              <Text>5</Text>/5
            </Text>
            <Text style={{marginLeft: 3, fontSize: 12, color: 'black'}}>
              (<Text>100</Text> đánh giá)
            </Text>
          </View>
        </View>
      </View>
      <View></View>
    </View>
  );
};

export default RatingProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    marginVertical: 3,
    height: SIZES.height / 4,
  },
});
