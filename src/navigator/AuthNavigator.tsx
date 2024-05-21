import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import SellerHome from '../screens/sellser/home/SellerHome';
import ProductSeller from '../screens/sellser/product_seller/ProductSeller';
const Stack = createNativeStackNavigator();
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />


      {/* Seller navigator */}
      <Stack.Screen name="SellerHome" component={SellerHome} />
      <Stack.Screen name="ProductSeller" component={ProductSeller} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
