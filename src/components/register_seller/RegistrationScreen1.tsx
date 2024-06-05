import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constant/theme';

const RegistrationScreen1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chào mừng đến với EWAMall!</Text>
      </View>
      {/* <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/LogoMain.png')} style={styles.image} />
      </View> */}
      <Text style={styles.description}>
        Vui lòng cung cấp thông tin để thành lập tài khoản người bán trên EWAMall
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterSellerScreen' as never)}>
        <Text style={styles.buttonText}>Bắt đầu đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10, 
    paddingBottom: 10,
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', 
  },
  backButton: {
    position: 'absolute',
    left: 10, 
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    flex: 1,
    marginLeft: 40, 
  },
  imageContainer: {
    marginTop: 80, 
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
