import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import ProductDetail from '../screens/customer/product_detail/ProductDetail';
import Cart from '../screens/customer/cart/Cart';
import PurchaseScreen from '../screens/customer/purchase/PurchaseScreen';
import SellerHome from '../screens/sellser/home/SellerHome';
import ProductSeller from '../screens/sellser/product_seller/ProductSeller';
import AuthGuard from './Auth';
import OrderSeller from '../screens/sellser/order_seller/OrderSeller';
import AddProductSeller from '../screens/sellser/add_product_seller/AddProductSeller';
import Industry from '../screens/sellser/add_product_seller/Industry';
import Finance from '../screens/sellser/finance/Finance';
import FlashSaleScreen from '../screens/customer/flashsale/FlashSaleScreen';
import RegistrationScreen1 from '../components/register_seller/RegistrationScreen1';
import RegisterForm from '../components/register_seller/RegisterForm';
const Stack = createNativeStackNavigator();
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Purchase" component={PurchaseScreen} />
      <Stack.Screen name="flashsale" component={FlashSaleScreen} />

      {/* Seller navigator */}
      <Stack.Screen name="SellerHome" component={SellerHome} />
      <Stack.Screen name="ProductSeller" component={ProductSeller} />
      <Stack.Screen name="OrderSeller" component={OrderSeller} />
      <Stack.Screen name="AddProductSeller" component={AddProductSeller} />
      <Stack.Screen name="Industry" component={Industry} />
      <Stack.Screen name="Finance" component={Finance} />
      <Stack.Screen name="RegistrationSellerScreen" component={RegistrationScreen1} />
      <Stack.Screen name="RegisterSellerScreen" component={RegisterForm} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
