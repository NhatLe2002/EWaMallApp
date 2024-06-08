import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constant/theme';

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Mã Giảm Giá</Text>
      <TouchableOpacity>
        <Text style={styles.history}>Lịch sử</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.black,
  },
  history: {
    fontSize: 14,
    fontFamily: FONTS.roboto_regular,
    color: COLORS.primary,
  },
});

export default Header;
