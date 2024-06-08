import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../constant/theme';
import {formatPriceToVND} from '../../config/FixPrice';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Entypo from 'react-native-vector-icons/Entypo';
import {Seller} from '../../constant/types';
import {useDispatch, useSelector} from 'react-redux';
import {InterfaceAccountState, InterfaceAddressState, InterfaceOrderState} from '../../constant/interface';
import {getFeeShip} from '../../redux/slice/addressSlice';
import { setShipCostt } from '../../redux/slice/orderSlice';
const MethodDelivery: React.FC<{totalCost: number}> = ({
  totalCost,
}) => {
  const dispatch = useDispatch<any>();
  const {listShipAddress, serviceShip, feeShip} = useSelector(
    (state: InterfaceAddressState) => state.addressReducer,
  );
  const {sellerProfile} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  const defaultAddress = listShipAddress?.find(
    (address: {isDefault: any}) => address.isDefault,
  );
  const {info_order} = useSelector(
    (state: InterfaceOrderState) => state.orderReducer,
  );
  useEffect(() => {
    if (sellerProfile?.districtId && defaultAddress && serviceShip[0]) {
      dispatch(
        getFeeShip({
          service_id: serviceShip[0]?.service_id,
          insurance_value: totalCost,
          from_district_id: sellerProfile?.districtId,
          to_district_id: defaultAddress?.districtId,
          to_ward_code: defaultAddress?.wardId.toString(),
        }),
      );
    }
   
  }, [dispatch,serviceShip]);
  useEffect(() => {
    if (feeShip?.total != null) {
      dispatch(setShipCostt(feeShip?.total));
    }
  }, [dispatch,feeShip]);
  return (
    <View style={styles.containerMethodPay}>
      <Text style={styles.textShop}>Phương thức vận chuyển</Text>
      <View style={{position: 'relative'}}>
        <LinearGradient
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.contentMethodPay}
          colors={['#FFFFFF', 'rgba(249, 237, 174, 0.8)']}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '3%',
            }}>
            <Text>{serviceShip[0]?.short_name}</Text>
            <View style={{flexDirection: 'column', gap: 5, marginBottom: '3%'}}>
              <Text
                style={{
                  color: 'rgba(167, 167, 167, 0.81)',
                  textDecorationLine: 'line-through',
                }}>
                {formatPriceToVND(feeShip?.total)}
              </Text>
              <Text>{formatPriceToVND(feeShip?.total)}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <Ionicons
              name="checkmark-circle"
              size={12}
              color={COLORS.yellowMain}
            />
            <Text style={{color: '#B07E00'}}>
              Đã áp dụng Mã miễn phí vận chuyển{' '}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.timeDelivery}>
          <Entypo name="box" size={16} color={COLORS.yellowMain} />
          <Text
            style={{
              color: '#DCB03F',
              fontFamily: FONTS.inter_medium,
              fontSize: 12,
            }}>
            Nhận hàng vào 30 tháng 2 - 31 tháng 2
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MethodDelivery;

const styles = StyleSheet.create({
  containerMethodPay: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  contentMethodPay: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderWidth: 1,
    borderColor: '#EFEEEB',
    flexDirection: 'column',
    gap: 5,
    borderRadius: 10,
  },
  textShop: {
    fontFamily: FONTS.inter_SemiBold,
    marginBottom: '5%',
  },
  timeDelivery: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    position: 'absolute',
    top: '-10%',
    left: '4%',
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
