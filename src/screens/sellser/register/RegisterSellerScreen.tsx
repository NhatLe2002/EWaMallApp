import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../../constant/theme';
import RegistrationForm from '../../../components/register_seller/RegisterForm';

const RegisterSellerScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Feather name="arrow-left" size={30} color={COLORS.black} />
      </TouchableOpacity>
      <RegistrationForm />
    </View>
  );
};

export default RegisterSellerScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
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
});
