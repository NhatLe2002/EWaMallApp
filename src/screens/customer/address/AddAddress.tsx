import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import HeaderCommonSub from '../../../reusables/header/HeaderCommonSub';
import { COLORS, FONTS, SIZES } from '../../../constant/theme';
import { useForm, Controller } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const AddAddress: React.FC = () => {
  const navigation = useNavigation<any>();
  const { control, handleSubmit } = useForm();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const handleProvincePress = () => {
    navigation.navigate('SelectProvince');
  };

  const handleInputChange = (value: string, fieldName: string) => {
    if (fieldName === 'name') {
      setName(value);
    } else if (fieldName === 'phoneNumber') {
      setPhoneNumber(value);
    }

    setIsFormFilled(value.trim().length > 0 && phoneNumber.trim().length > 0);
  };

  return (
    <View style={styles.container}>
      <HeaderCommonSub
        title="Địa chỉ mới"
        colorTitle={COLORS.black}
        backgroundColor={COLORS.white}
        colorBack={COLORS.yellowMain}
      />
      <ScrollView>
        <Text style={{ paddingVertical: '3%', paddingLeft: '5%', fontSize: 16 }}>
          Liên hệ
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={text => {
                onChange(text);
                handleInputChange(text, 'name');
              }}
              value={value}
              placeholder="Họ và tên"
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={text => {
                onChange(text);
                handleInputChange(text, 'phoneNumber');
              }}
              value={value}
              placeholder="Số điện thoại"
              keyboardType="numeric"
            />
          )}
          name="phoneNumber"
        />
        <Text style={{ paddingVertical: '3%', paddingLeft: '5%', fontSize: 16 }}>
          Địa chỉ
        </Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TouchableOpacity onPress={() => handleProvincePress()}>
              <View pointerEvents='none'>
                <TextInput
                  editable={false}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={text => {
                    onChange(text);
                    handleInputChange(text, 'phoneNumber');
                  }}
                  value={value}
                  placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                />
              </View>
            </TouchableOpacity>
          )}
          name="address"
        />
        <TouchableOpacity
          style={{
            paddingVertical: '3%',
            alignItems: 'center',
            backgroundColor: isFormFilled ? COLORS.yellowMain : 'gray',
            marginTop: '5%',
            marginHorizontal: '2%',
            borderRadius: 5,
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormFilled}>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.inter_medium,
              fontSize: 18,
            }}>
            HOÀN THÀNH
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
  },
  input: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    backgroundColor: COLORS.white,
    fontSize: 16,
    borderBottomColor: COLORS.border_header,
    borderBottomWidth: 1,
  },
});
