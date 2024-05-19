import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constant/theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const SearchHome: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Feather name="search" size={25} color={COLORS.gray_1} />
        <Text style={styles.text}>Tên sản phẩm</Text>
      </View>
      <View style={styles.content}>
        <Feather name="camera" size={22} color={COLORS.gray_1} />
        <MaterialIcons name="keyboard-voice" size={25} color={COLORS.gray_1} />
      </View>
    </View>
  );
};

export default SearchHome;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 345,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {flexDirection: 'row', alignItems: 'center', gap: 10},
  text: {
    color: COLORS.yellowMain,
    fontFamily: FONTS.inter_regular,
    fontSize: 16,
  },
});
