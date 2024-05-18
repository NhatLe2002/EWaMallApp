import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constant/theme';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.yellowMain,
  },
});
