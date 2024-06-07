import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const SearchHome: React.FC = () => {
  var navigation = useNavigation();
  return (
    <TouchableHighlight 
    style={styles.container}
    underlayColor={COLORS.white}
    onPress={() =>
      navigation.navigate('SearchPage' as never)}
    >
    <View style={styles.container}>
      <View style={styles.content}>
        <Feather name="search" size={16} color={COLORS.gray_1} />
        <Text style={styles.text}>Tên sản phẩm</Text>
      </View>
      <View style={styles.content}>
        <Feather name="camera" size={16} color={COLORS.gray_1} />
        <MaterialIcons name="keyboard-voice" size={18} color={COLORS.gray_1} />
      </View>
    </View>
    </TouchableHighlight>
  );
};

export default SearchHome;

const styles = StyleSheet.create({
  container: {
    height: SIZES.height / 25,
    width: SIZES.width / 1.5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {flexDirection: 'row', alignItems: 'center', gap: 10},
  text: {
    color: COLORS.yellowMain,
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
  },
});
