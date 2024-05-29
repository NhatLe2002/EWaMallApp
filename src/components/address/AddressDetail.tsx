import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {COLORS, FONTS, SIZES} from '../../constant/theme';

interface AddressDetailProps {
  checked: boolean;
  onPress: () => void;
}

const AddressDetail: React.FC<AddressDetailProps> = ({checked, onPress}) => {
  return (
    <View style={styles.container}>
      <CheckBox
        containerStyle={{
          margin: 0,
          padding: 0,
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checkedColor={COLORS.yellowMain}
        checked={checked}
        onPress={onPress}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border_product,
          paddingBottom: '5%',
        }}>
        <View style={styles.content}>
          <View style={styles.infoAddress}>
            <Text
              numberOfLines={1}
              style={styles.addressText}
              ellipsizeMode="tail">
              Quang Vinh
            </Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.phone}>(+84) 888385759</Text>
          </View>
          <Text style={styles.addressDetail}>Thôn Xuân dục 1</Text>
          <Text style={styles.addressDetail}>
            Xã Xuân Ninh, Huyện Quảng Ninh, Quảng Bình 
          </Text>
        </View>
        <Text style={{fontSize: 16, color: COLORS.yellowMain,paddingHorizontal:'5%'}}>Sửa</Text>
      </View>
    </View>
  );
};

export default AddressDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    width: SIZES.width,
    paddingLeft:'3%',
    backgroundColor: COLORS.white,
    paddingTop: '3%',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: '5%',
  },
  infoAddress: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    marginBottom: '3%',
  },
  addressText: {
    flexShrink: 1,
    textAlign: 'left',
    fontFamily: FONTS.inter_SemiBold,
    fontSize: 15,
  },
  separator: {
    marginHorizontal: '3%',
    color: COLORS.gray_2,
  },
  phone: {
    color: COLORS.gray_2,
    fontSize: 15,
  },
  addressDetail: {
    color: COLORS.gray_2,
    fontSize: 13,
  },
});
