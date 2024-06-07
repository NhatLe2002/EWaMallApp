import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, FONTS} from '../../constant/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {ShipAddress} from '../../constant/types';
import {useDispatch, useSelector} from 'react-redux';
import {InterfaceAddressState} from '../../constant/interface';
import {
  fetchAllProvince,
  fetchDistrictByProvinceId,
  fetchWardByDistrictId,
} from '../../redux/slice/addressSlice';
import {setShipAddressId} from '../../redux/slice/orderSlice';
const InfoAddress: React.FC<{listShipAddress: ShipAddress}> = ({
  listShipAddress,
}) => {
  const {province, district, ward} = useSelector(
    (state: InterfaceAddressState) => state.addressReducer,
  );
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const provinceName = province?.find(
    (province: {ProvinceID: number | null}) =>
      province.ProvinceID === listShipAddress?.provinceId,
  );
  const distictName = district?.find(
    (district: {DistrictID: number | null}) =>
      district.DistrictID === listShipAddress?.districtId,
  );
  const wardName = ward?.find(
    (ward: {WardCode: string | null}) =>
      ward.WardCode == listShipAddress?.wardId,
  );

  useEffect(() => {
    dispatch(fetchAllProvince());
    if (
      listShipAddress &&
      listShipAddress.provinceId &&
      listShipAddress.districtId
    ) {
      dispatch(fetchDistrictByProvinceId(listShipAddress.provinceId));
      dispatch(fetchWardByDistrictId(listShipAddress.districtId));
    }
    if (listShipAddress?.id != null) {
      dispatch(setShipAddressId(listShipAddress?.id));
    }
  }, [dispatch, listShipAddress]);

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
              <Text style={styles.textInfo}>{listShipAddress?.name}</Text>
              <Text style={{color: '#919191'}}>|</Text>
              <Text style={styles.textInfo}>
                {listShipAddress?.phoneNumber}
              </Text>
            </View>
            <Text>{listShipAddress?.address}</Text>
            <Text>
              {wardName?.WardName}, {distictName?.DistrictName},{' '}
              {provinceName?.ProvinceName}
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
