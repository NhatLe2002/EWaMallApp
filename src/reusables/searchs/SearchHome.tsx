import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { InterfaceAccountState } from '../../constant/interface';

const SearchHome: React.FC = () => {
  const {isLogin} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  const navigation = useNavigation<any>()
  const handleCart = () => {
    if (isLogin) {
   
      navigation.navigate('SearchPage');
    } else {
    
      navigation.navigate('Login');
    }
  };
  return (
    <TouchableHighlight 
    style={styles.container}
    underlayColor={COLORS.white}
    onPress={handleCart}
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
