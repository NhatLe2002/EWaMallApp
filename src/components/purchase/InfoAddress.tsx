import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constant/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
const InfoAddress: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Address')}>
      <Text style={styles.textHeader}>Thông tin nhận hàng</Text>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="map-marker"
          size={18}
          color={COLORS.yellowMain}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '1%',
            flex: 1,
          }}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                marginBottom: '1%',
              }}>
              <Text style={styles.textInfo}>Quangvinh</Text>
              <Text style={{color: '#919191'}}>|</Text>
              <Text style={styles.textInfo}>0888385759</Text>
            </View>
            <Text>Đại học FPT</Text>
            <Text>
              Địa chỉ chi tiết Địa chỉ chi tiết Địa chỉ chi tiết Địa chỉ chi
              tiết tiết
            </Text>
          </View>
          <Feather name="chevron-right" size={16} color={COLORS.gray_2} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InfoAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    paddingVertical: '2%',
    gap: 5,
    marginBottom: 10,
  },
  textHeader: {
    fontFamily: FONTS.inter_SemiBold,
  },
  content: {
    flexDirection: 'row',
    gap: 5,
    flex: 1,
  },
  textInfo: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
  },
});
