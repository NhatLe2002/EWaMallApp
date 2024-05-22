import React, { useEffect } from 'react';
import { AppState, AppStateStatus, StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import HeightSpacer from '../../../reusables/height_spacer/HeightSpacer';
import { COLORS, FONTS, SIZES } from '../../../constant/theme';
import accountApi from '../../../api/accountApi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, setRole } from '../../../redux/slice/accountSlice';
import { InterfaceAccountState } from '../../../constant/interface';

type Inputs = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm<Inputs>();
  const { isLogin, role } = useSelector((state: InterfaceAccountState) => state.accountReducer);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await accountApi.login(data);
      if (res) {
        console.log(res.data);
        dispatch(setIsLogin(true));
        dispatch(setRole(res.data.role.roleName));
        if (role === 'User') {
          navigation.navigate('BottomTab' as never);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigation.navigate('HomeGuest' as never);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    console.log('AppState changed to', nextAppState);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Feather name="arrow-left" size={30} color={COLORS.black} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/LogoMain.png')}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.textHeader}>Đăng nhập</Text>
        <HeightSpacer height={SIZES.height / 20} />
        <View>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                placeholder="Email"
                value={value}
                inputStyle={{ fontSize: 15 }}
                onChangeText={onChange}
                onBlur={onBlur}
                leftIcon={<Feather name="mail" size={20} color="#929292" />}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                placeholder="Mật khẩu"
                inputStyle={{ fontSize: 15 }}
                secureTextEntry={true}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                leftIcon={<Feather name="lock" size={20} color="#929292" />}
              />
            )}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textButton}>Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
        <HeightSpacer height={SIZES.height / 25} />
        <View style={styles.containerLoginWith}>
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>Hoặc</Text>
            <View style={styles.orLine} />
          </View>
          <HeightSpacer height={SIZES.height / 50} />
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require('../../../assets/images/google.png')}
            />
            <Image
              style={styles.icon}
              source={require('../../../assets/images/facebook.png')}
            />
          </View>
        </View>
      </View>
      <View style={styles.registrationView}>
        <Text style={styles.registrationText}>Bạn chưa có tài khoản? </Text>
        <Text
          onPress={() => navigation.navigate('Register' as never)}
          style={styles.registrationLink}>
          Đăng ký ngay
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.yellowMain,
  },
  backButton: {
    zIndex: 9999,
    position: 'absolute',
    left: '5%',
    top: '5%',
  },
  imageContainer: {
    flex: 0.3,
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 4,
    resizeMode: 'contain',
  },
  content: {
    flex: 0.69,
    width: SIZES.width,
    height: SIZES.height / 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  textHeader: {
    fontSize: 24,
    fontFamily: FONTS.inter_bold,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 17,
    fontFamily: FONTS.roboto_medium,
  },
  containerLoginWith: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.width / 10,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#929292',
    opacity: 0.4,
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
  },
  icon: {
    width: SIZES.width / 12,
    height: SIZES.height / 12,
    resizeMode: 'contain',
  },
  registrationView: {
    flex: 0.09,
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#Fcfcfd',
    borderTopColor: '#Eaeaea',
    borderTopWidth: 1,
    shadowColor: COLORS.border_product,
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    paddingBottom: '2%',
  },
  registrationText: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    textAlign: 'center',
  },

  registrationLink: {
    fontSize: 14,
    fontFamily: FONTS.inter_bold,
  },
});
