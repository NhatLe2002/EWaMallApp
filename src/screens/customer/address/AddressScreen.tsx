import React, {useState} from 'react';
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

const AddressScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const handlePress = (index: number) => {
    setSelectedAddress(index);
  };

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
        <AddressDetail
          checked={selectedAddress === 0}
          onPress={() => handlePress(0)}
        />
        <AddressDetail
          checked={selectedAddress === 1}
          onPress={() => handlePress(1)}
        />
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
