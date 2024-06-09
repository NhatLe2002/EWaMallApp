import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Input} from 'react-native-elements';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {
  InterfaceAccountState,
  InterfaceAddressState,
} from '../../constant/interface';
import {useDispatch, useSelector} from 'react-redux';
import {ISellerState} from '../../constant/interface/sellerInterface';
import {
  createSeller,
  getAccount,
  setAddress,
  setDescription,
  setEmail,
  setPhone,
  setShopName,
  setUserIdForSeller,
} from '../../redux/slice/seller/accountSellerSlice';

type Inputs = {
  shopName: string;
  address_detail: string;
  address: string;
  email: string;
  phone: string;
  emailOtp: string;
  phoneOtp: string;
  description: string;
  provinceId: number;
  districtId: number;
  wardId: number;
};
// "shopName": "<string>",
// "address": "<string>",
// "provinceId": "<integer>",
// "districtId": "<integer>",
// "wardId": "<integer>",
// "phoneNumber": "<string>",
// "email": "<string>",
// "description": "<string>"

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<Inputs>();
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const {userId} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
 
  const {seller} = useSelector((state: ISellerState) => state.sellerReducer);
  // const onSubmit: SubmitHandler<Inputs> = data => {
  //   // Add OTP verification logic here
  //   // if (data.emailOtp !== "123456" || data.phoneOtp !== "654321") {
  //   //   Alert.alert("OTP không hợp lệ", "Vui lòng nhập đúng mã OTP");
  //   // } else {
  //   //   console.log('Form submitted:', data);
  //   // }
  //   // console.log(userId);
  //   // console.log(JSON.stringify(seller));
  //   // dispatch(createSeller(seller));
  //   navigation.navigate('SellerHome');
    
  // };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true); // Set loading to true before dispatch
    // Introduce a delay using setTimeout
    setTimeout(async () => {
      await dispatch(createSeller(seller)); // Wait for the dispatch to finish
      await dispatch(getAccount(userId));
      setIsLoading(false); // Set loading to false after dispatch
      navigation.navigate('SellerHome');
    }, 3000); // Delay in milliseconds
  };
  const handleProvincePress = () => {
    navigation.navigate('SelectProvince');
  };

  const handleInputChange = (value: string, fieldName: string) => {
    if (fieldName === 'shopName') {
      dispatch(setUserIdForSeller(userId));
      dispatch(setShopName(value));
    } else if (fieldName === 'phone') {
      dispatch(setPhone(value));
    } else if (fieldName === 'address_detail') {
      dispatch(setAddress(value));
    } else if (fieldName === 'email') {
      dispatch(setEmail(value));
    } else if (fieldName === 'description') {
      dispatch(setDescription(value));
    }
  };
  const sendEmailOtp = () => {
    // Logic to send OTP to email
    setEmailOtpSent(true);
    Alert.alert('OTP đã gửi', 'Mã OTP đã được gửi đến email của bạn');
  };

  const sendPhoneOtp = () => {
    // Logic to send OTP to phone
    setPhoneOtpSent(true);
    Alert.alert('OTP đã gửi', 'Mã OTP đã được gửi đến số điện thoại của bạn');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Feather name="arrow-left" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thông tin Shop</Text>
      </View>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="shopName"
          rules={{required: 'Vui lòng nhập tên Shop'}}
          render={({field: {value, onChange, onBlur}}) => (
            <Input
              placeholder="Tên Shop"
              value={value}
              inputStyle={{fontSize: 15}}
              onChangeText={text => {
                onChange(text);
                handleInputChange(text, 'shopName');
              }}
              onBlur={onBlur}
              errorMessage={errors.shopName ? errors.shopName.message : ''}
            />
          )}
        />
        <Controller
          control={control}
          name="address_detail"
          rules={{required: 'Vui lòng nhập địa chỉ Shop hợp lệ'}}
          render={({field: {value, onChange, onBlur}}) => (
            <Input
              placeholder="Địa chỉ lấy hàng"
              value={value}
              inputStyle={{fontSize: 15}}
              onChangeText={text => {
                onChange(text);
                handleInputChange(text, 'address_detail');
              }}
              onBlur={onBlur}
              errorMessage={errors.address_detail ? errors.address_detail.message : ''}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Vui lòng nhập đúng định dạng email',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Vui lòng nhập đúng định dạng email',
            },
          }}
          render={({field: {value, onChange, onBlur}}) => (
            <Input
              placeholder="Email"
              value={value}
              inputStyle={{fontSize: 15}}
              onChangeText={text => {
                onChange(text);
                handleInputChange(text, 'email');
              }}
              onBlur={onBlur}
              errorMessage={errors.email ? errors.email.message : ''}
              leftIcon={<Feather name="mail" size={20} color="#929292" />}
              rightIcon={
                <TouchableOpacity onPress={sendEmailOtp}>
                  <Text style={styles.sendOtpText}>Gửi OTP</Text>
                </TouchableOpacity>
              }
            />
          )}
        />
        {emailOtpSent && (
          <Controller
            control={control}
            name="emailOtp"
            rules={{required: 'Vui lòng nhập mã OTP'}}
            render={({field: {value, onChange, onBlur}}) => (
              <Input
                placeholder="Nhập mã OTP email"
                value={value}
                inputStyle={{fontSize: 15}}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.emailOtp ? errors.emailOtp.message : ''}
              />
            )}
          />
        )}
        <Controller
          control={control}
          name="phone"
          rules={{
            required: 'Vui lòng nhập số điện thoại hợp lệ',
            pattern: {
              value: /^[0-9]{10}$/, // Regex pattern for exactly 10 digits
              message: 'Số điện thoại phải có đúng 10 chữ số',
            },
          }}
          render={({field: {value, onChange, onBlur}}) => (
            <Input
              placeholder="Số điện thoại"
              value={value}
              inputStyle={{fontSize: 15}}
              onChangeText={text => {
                onChange(text);
                handleInputChange(text, 'phone');
              }}
              onBlur={onBlur}
              errorMessage={errors.phone ? errors.phone.message : ''}
              leftIcon={<Feather name="phone" size={20} color="#929292" />}
              rightIcon={
                <TouchableOpacity onPress={sendPhoneOtp}>
                  <Text style={styles.sendOtpText}>Gửi OTP</Text>
                </TouchableOpacity>
              }
            />
          )}
        />
        {phoneOtpSent && (
          <Controller
            control={control}
            name="phoneOtp"
            rules={{required: 'Vui lòng nhập mã OTP'}}
            render={({field: {value, onChange, onBlur}}) => (
              <Input
                placeholder="Nhập mã OTP điện thoại"
                value={value}
                inputStyle={{fontSize: 15}}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.phoneOtp ? errors.phoneOtp.message : ''}
              />
            )}
          />
        )}
        <Text style={{paddingVertical: '3%', paddingLeft: '5%', fontSize: 16}}>
          Địa chỉ
        </Text>

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TouchableOpacity onPress={() => handleProvincePress()}>
              <View pointerEvents="none">
                <TextInput
                  editable={false}
                  style={styles.input}
                  onBlur={onBlur}
                  value={value}
                  // value={province[province.length - 1].ProvinceName}
                  placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                />
              </View>
            </TouchableOpacity>
          )}
          name="address"
        />
        <Controller
          control={control}
          name="description"
          rules={{required: 'Vui lòng nhập mô tả Shop hợp lệ'}}
          render={({field: {value, onChange, onBlur}}) => (
            <Input
              placeholder="Mô tả về shop"
              value={value}
              inputStyle={{fontSize: 15}}
              onChangeText={text => {
                onChange(text);
                handleInputChange(text, 'description');
              }}
              onBlur={onBlur}
              errorMessage={
                errors.description ? errors.description.message : ''
              }
            />
          )}
        />
        {isLoading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.textButton}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    backgroundColor: COLORS.white,
    fontSize: 16,
    borderBottomColor: COLORS.border_header,
    borderBottomWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.yellowMain,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    flex: 1,
    marginRight: 35, // Đảm bảo rằng tiêu đề được căn giữa
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 17,
    fontFamily: FONTS.roboto_medium,
  },
  sendOtpText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: FONTS.roboto_medium,
  },
});
