import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HeaderCommon from '../../../reusables/header/HeaderCommon';
import {COLORS, FONTS} from '../../../constant/theme';
import {useDispatch, useSelector} from 'react-redux';
import {InterfaceAccountState} from '../../../constant/interface';
import {getOrderByUserId} from '../../../redux/slice/orderSlice';

import AntDesign from 'react-native-vector-icons/AntDesign';
const PurchaseSuccessful: React.FC = () => {
  const navigation = useNavigation<any>();
  const {userId} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const timeout = setTimeout(() => {
  
      navigation.navigate('BottomTab');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <HeaderCommon
        title="Thanh toán thành công"
        colorTitle={COLORS.white}
        colorBack={COLORS.white}
        backgroundColor={COLORS.yellowMain}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          paddingHorizontal: '5%',
          paddingVertical: '5%',
        }}>
        <AntDesign name="checkcircle" size={50} color={COLORS.yellowMain} />
        <Text
          style={{
            marginTop: '10%',
            fontFamily: FONTS.inter_SemiBold,
            fontSize: 20,
          }}>
          Đơn hàng của bạn đã đặt thành công
        </Text>
        <View>
          <TouchableOpacity
            style={{
              marginTop: '10%',
              paddingHorizontal: '5%',
              paddingVertical: '4%',
              backgroundColor: COLORS.yellowMain,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('BottomTab')}>
            <Text
              style={{
                fontFamily: FONTS.inter_SemiBold,
                color: 'white',
                fontSize: 20,
              }}>
              Trang chủ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PurchaseSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
