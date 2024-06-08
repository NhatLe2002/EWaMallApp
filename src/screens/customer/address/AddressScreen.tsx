import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderCommonSub from '../../../reusables/header/HeaderCommonSub';
import {COLORS, FONTS, SIZES} from '../../../constant/theme';
import AddressDetail from '../../../components/address/AddressDetail';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  InterfaceAccountState,
  InterfaceAddressState,
} from '../../../constant/interface';
import {
  shipAddressByUserId,
} from '../../../redux/slice/addressSlice';
import { ShipAddress } from '../../../constant/types';

const AddressScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {userId} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  const {listShipAddress} = useSelector(
    (state: InterfaceAddressState) => state.addressReducer,
  );
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const handlePress = (index: number) => {
    setSelectedAddress(index);
  };

  useEffect(() => {
    dispatch(shipAddressByUserId(userId));

  }, [dispatch]);

  return (
    <View style={styles.container}>
      <HeaderCommonSub
        title="Chọn địa chỉ nhận hàng"
        colorTitle={COLORS.black}
        backgroundColor={COLORS.white}
        colorBack={COLORS.yellowMain}
      />
      <ScrollView>
        <Text style={{paddingVertical: '3%', paddingLeft: '5%', fontSize: 16}}>
          Địa chỉ
        </Text>
        {listShipAddress.map((address: ShipAddress,index: number) => (
          <AddressDetail
            addressDetail={address}
            key={address.id}
            checked={address.isDefault} 
            onPress={() => handlePress(index)}
          />
        ))}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            justifyContent: 'center',
            paddingVertical: '4%',
            gap: 10,
          }}
          onPress={() => navigation.navigate('add_address')}>
          <AntDesign name="pluscircleo" size={20} color={COLORS.yellowMain} />
          <Text
            style={{
              fontSize: 16,
              color: COLORS.yellowMain,
              fontFamily: FONTS.inter_medium,
            }}>
            Thêm địa chỉ mới
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
  },
});
