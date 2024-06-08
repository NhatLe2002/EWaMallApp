import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllProvince,
  fetchDistrictByProvinceId,
  fetchWardByDistrictId,
} from '../../redux/slice/addressSlice'; // Import action to fetch provinces
import {InterfaceAddressState} from '../../constant/interface';
import Header from './Header';
import {COLORS, FONTS} from '../../constant/theme';
import {lightGreen100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { setDistrict, setProvince, setWard } from '../../redux/slice/seller/accountSellerSlice';

const SelectAddress: React.FC = () => {
  const {province, district, ward} = useSelector(
    (state: InterfaceAddressState) => state.addressReducer,
  );
  const dispatch = useDispatch<any>();
  type GroupedProvinces = {
    [key: string]: any[];
  };

  const [groupedProvinces, setGroupedProvinces] = useState<GroupedProvinces>(
    {},
  );
  const [selectedAddress, setSelectedAddress] = useState<{
    provinceId: string | null;
    districtId: string | null;
    provinceName: string | null;
    districtName: string | null;
    wardCode: string | null;
    wardName: string | null;
  }>({
    provinceId: null,
    districtId: null,
    wardCode: null,
    provinceName: null,
    districtName: null,
    wardName: null,
  });
  const [showDistricts, setShowDistricts] = useState<boolean>(false);
  const [showWard, setShowWard] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchAllProvince());
  }, []);

  const [selectedArea, setSelectedArea] = useState<
    'province' | 'district' | 'ward' | null
  >('province');

  // Thay đổi hàm handleProvinceSelect để hiển thị danh sách quận/huyện khi chọn tỉnh/thành phố
  const handleProvinceSelect = (province: any) => {
    setSelectedAddress({
      provinceId: province.ProvinceID,
      districtId: null,
      wardCode: null,
      provinceName: province.ProvinceName,
      districtName: null,
      wardName: null,
    });
    setShowDistricts(true);
    setShowWard(false); // Ẩn danh sách phường/xã
    setSelectedArea('district'); // Chọn vùng quận/huyện
    dispatch(fetchDistrictByProvinceId(province.ProvinceID));
    dispatch(setProvince(province.ProvinceID))
  };

  // Thay đổi hàm handleDistrictSelect để hiển thị danh sách phường/xã khi chọn quận/huyện
  const handleDistrictSelect = (district: any) => {
    setSelectedAddress({
      ...selectedAddress,
      districtId: district.DistrictID,
      districtName: district.DistrictName,
    });
    setShowWard(true); // Hiển thị danh sách phường/xã
    setSelectedArea('ward'); // Chọn vùng phường/xã
    dispatch(fetchWardByDistrictId(district.DistrictID));
    dispatch(setDistrict(district.DistrictID))
  };

  // Thay đổi hàm handleWardSelect để lưu thông tin phường/xã khi được chọn
  const handleWardSelect = (ward: any) => {
    setSelectedAddress({
      ...selectedAddress,
      wardCode: ward.WardCode,
      wardName: ward.WardName,
    });
    dispatch(setWard(ward.WardCode))
  };

  const groupProvincesByFirstLetter = (provinces: any[]) => {
    const grouped: {[key: string]: any[]} = {};
    provinces?.forEach(province => {
      const firstLetter = province.ProvinceName.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(province);
    });
    return grouped;
  };

  useEffect(() => {
    const grouped = groupProvincesByFirstLetter(province);
    setGroupedProvinces(grouped);
  }, [province]);
  // console.log(selectedAddress);
  return (
    <>
      <Header />
      <View style={{paddingVertical: '4%', backgroundColor: 'white'}}>
        {selectedAddress.provinceId && (
          <View>
            <Text style={{fontWeight: 'bold'}}>Địa chỉ đã chọn:</Text>
            <Text>{selectedAddress.provinceName}</Text>
            {selectedAddress.districtName && (
              <Text>{selectedAddress.districtName}</Text>
            )}
            {selectedAddress.wardName && (
              <Text>{selectedAddress.wardName}</Text>
            )}
          </View>
        )}
      </View>
      <ScrollView>
        <Text
          style={{
            paddingLeft: '4%',
          }}>
          {showDistricts ? 'Quận/Huyện' : 'Tỉnh/Thành phố'}
        </Text>
        {selectedArea === 'province' &&
          Object.entries(groupedProvinces).map(([firstLetter, provinces]) => (
            <View
              key={firstLetter}
              style={{
                backgroundColor: 'white',
                paddingVertical: '2%',
                paddingLeft: '4%',
              }}>
              <Text
                style={{
                  fontFamily: FONTS.inter_medium,
                  color: COLORS.gray_2,
                }}>
                {firstLetter}
              </Text>
              {provinces.map((province: any) => (
                <TouchableOpacity
                  key={province.ProvinceID}
                  style={{
                    paddingVertical: '3%',
                    borderBottomWidth: 1,
                    borderColor: COLORS.border_gray,
                  }}
                  onPress={() => handleProvinceSelect(province)}>
                  <Text>{province.ProvinceName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        {selectedArea === 'district' &&
          showDistricts &&
          district.map((item: any) => (
            <View
              key={item.DistrictID}
              style={{
                backgroundColor: 'white',
                paddingVertical: '2%',
                paddingLeft: '4%',
              }}>
              <TouchableOpacity
                style={{
                  paddingVertical: '3%',
                  borderBottomWidth: 1,
                  borderColor: COLORS.border_gray,
                }}
                onPress={() => handleDistrictSelect(item)}>
                <Text>{item.DistrictName}</Text>
              </TouchableOpacity>
            </View>
          ))}
        {selectedArea === 'ward' &&
          showWard &&
          ward.map((item: any) => (
            <View
              key={item.WardCode}
              style={{
                backgroundColor: 'white',
                paddingVertical: '2%',
                paddingLeft: '4%',
              }}>
              <TouchableOpacity
                style={{
                  paddingVertical: '3%',
                  borderBottomWidth: 1,
                  borderColor: COLORS.border_gray,
                }}
                onPress={() => handleWardSelect(item)}>
                <Text>{item.WardName}</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({});
