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
} from '../../redux/slice/addressSlice'; // Import action to fetch provinces
import {InterfaceAddressState} from '../../constant/interface';
import Header from './Header';
import {COLORS, FONTS} from '../../constant/theme';
import {lightGreen100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const SelectAddress: React.FC = () => {
  const {province, district} = useSelector(
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
  }>({provinceId: null, districtId: null, provinceName: null});
  const [showDistricts, setShowDistricts] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchAllProvince());
  }, []);

  const handleProvinceSelect = (province: any) => {
    setSelectedAddress({
      provinceId: province.ProvinceID,
      districtId: null,
      provinceName: province.ProvinceName, 
    });
    setShowDistricts(true);
    dispatch(fetchDistrictByProvinceId(province.ProvinceID));
  };

  const handleDistrictSelect = (district: any) => {
    setSelectedAddress({...selectedAddress, districtId: district.DistrictID});
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
console.log(selectedAddress)
  return (
    <>
      <Header />
      <View style={{paddingVertical: '4%', backgroundColor: 'white'}}>
        {selectedAddress.provinceId && showDistricts && (
          <View style={{padding: 20}}>
            <Text style={{fontWeight: 'bold'}}>Địa chỉ đã chọn:</Text>
            <Text>{selectedAddress.provinceName}</Text>
            <Text>{selectedAddress.districtId}</Text>
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
        {showDistricts
          ? district.map((item: any) => (
              <TouchableOpacity
                key={item.DistrictID}
                style={{
                  paddingVertical: '3%',
                  borderBottomWidth: 1,
                  borderColor: COLORS.border_gray,
                }}
                onPress={() => handleDistrictSelect(item)}>
                <Text>{item.DistrictName}</Text>
              </TouchableOpacity>
            ))
          : Object.entries(groupedProvinces).map(([firstLetter, provinces]) => (
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
      </ScrollView>
    </>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({});
