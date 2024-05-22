import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../constant/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const InfoAddress: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Thông tin nhận hàng</Text>
      <View style={styles.content}>
 
        <MaterialCommunityIcons  name='map-marker' size={18} color={COLORS.yellowMain}/>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5,marginBottom:'1%'}}>
            <Text style={styles.textInfo}>Quangvinh</Text>
            <Text style={{color:'#919191'}}>|</Text>
            <Text  style={styles.textInfo}>0888385759</Text>
          </View>
          <Text>Đại học FPT</Text>
          <Text>Địa chỉ chi tiết Địa chỉ chi tiết Địa chỉ chi tiết Địa chỉ chi tiết  tiết</Text>
        </View>
      </View>
    </View>
  );
};

export default InfoAddress;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: '5%',
    backgroundColor:"white",
    paddingVertical:'2%',
    marginBottom: 10,
  },
  textHeader:{
    fontFamily:FONTS.inter_SemiBold,
  },
  content:{
    flexDirection:'row',
    gap:5,
  },
  textInfo:{
    fontFamily:FONTS.inter_SemiBold,
    fontSize:14
  },
});
