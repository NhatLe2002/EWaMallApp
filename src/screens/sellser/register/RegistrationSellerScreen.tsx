import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import RegistrationScreen1 from '../../../components/register_seller/RegistrationScreen1';

const RegistrationSellerScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RegistrationScreen1 />
    </ScrollView>
  );
};

export default RegistrationSellerScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});