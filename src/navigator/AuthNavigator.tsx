import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import SellerHome from '../screens/sellser/home/SellerHome';
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
    </Stack.Navigator>
  );
};

export default AuthNavigator;
