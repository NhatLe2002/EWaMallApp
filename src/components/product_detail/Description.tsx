import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES} from '../../constant/theme';
import React from 'react';
interface Item {
  description: string;
}

const Description: React.FC<Item> = ({description}: Item) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: '25%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontWeight: '700',
            paddingTop: 5,
          }}>
          Mô tả sản phẩm
        </Text>
        <View style={{marginRight: 10, marginVertical: 3}}>
          <TouchableOpacity
            style={{
              height: SIZES.height / 34,
              backgroundColor: '#E9BB45',
              justifyContent: 'center',
              marginRight: 10,
              marginTop: 3,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 11}}>
              Xem thêm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{height: 'auto', color: COLORS.gray_1}}>{description}</Text>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    marginVertical: 3,
    height: SIZES.height / 6,
  },
});
