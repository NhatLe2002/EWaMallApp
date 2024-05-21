import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import LoginScreen from '../screens/customer/login/LoginScreen';
import RegisterScreen from '../screens/customer/regisger/RegisterScreen';
import Home from '../screens/customer/home/Home';
import ProductDetail from '../screens/customer/product_detail/ProductDetail';

const Stack = createNativeStackNavigator();
const UnAuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default UnAuthNavigator;
