import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constant/theme';
import storageService from '../../api/storageService';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../../redux/slice/accountSlice';

const Logout: React.FC = () => {
    const dispatch = useDispatch<any>()
  const handleLogout = () => {
    dispatch(setIsLogin(false));
    storageService.removeInfo();
    console.log('object');
  };
  return (
    <TouchableOpacity onPress={handleLogout} style={styles.container}>
      <Text
        style={{color: 'white', fontFamily: FONTS.inter_medium, fontSize: 15}}>
        Đăng xuất
      </Text>
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dd1630',
    paddingVertical: '2%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '3%',
    borderRadius: 10,
  },
});
