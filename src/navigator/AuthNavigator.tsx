import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import ProductDetail from '../screens/customer/product_detail/ProductDetail';
import Cart from '../screens/customer/cart/Cart';
import PurchaseScreen from '../screens/customer/purchase/PurchaseScreen';
const Stack = createNativeStackNavigator();
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen
    
        name="Cart"
        component={Cart}
      />
            <Stack.Screen
    
    name="Purchase"
    component={PurchaseScreen}
  />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
