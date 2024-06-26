import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import LoginScreen from '../screens/customer/login/LoginScreen';
import RegisterScreen from '../screens/customer/regisger/RegisterScreen';
import Home from '../screens/customer/home/Home';
import ProductDetail from '../screens/customer/product_detail/ProductDetail';
import {useSelector} from 'react-redux';
import {InterfaceAccountState} from '../constant/interface';
import HomeGuest from '../screens/guest/HomeGuest';
import SearchPage from '../screens/guest/search/SearchPage';
import SearchPageResult from '../screens/guest/search/SearchPageResult';
import FlashSaleScreen from '../screens/customer/flashsale/FlashSaleScreen';

const Stack = createNativeStackNavigator();
const UnAuthNavigator: React.FC = () => {

  return (
    <Stack.Navigator
      initialRouteName="HomeGuest"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchPageResult" component={SearchPageResult} />
      <Stack.Screen name="HomeGuest" component={HomeGuest} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="flashsale" component={FlashSaleScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default UnAuthNavigator;
