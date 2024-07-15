import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import ProductDetail from '../screens/customer/product_detail/ProductDetail';

import PurchaseScreen from '../screens/customer/purchase/PurchaseScreen';
import SellerHome from '../screens/sellser/home/SellerHome';
import ProductSeller from '../screens/sellser/product_seller/ProductSeller';

import OrderSeller from '../screens/sellser/order_seller/OrderSeller';
import AddProductSeller from '../screens/sellser/add_product_seller/AddProductSeller';
import Finance from '../screens/sellser/finance/Finance';
import FlashSaleScreen from '../screens/customer/flashsale/FlashSaleScreen';
import SearchPage from '../screens/guest/search/SearchPage';
import SearchPageResult from '../screens/guest/search/SearchPageResult';
import AddressScreen from '../screens/customer/address/AddressScreen';
import AddAddress from '../screens/customer/address/AddAddress';
import SelectAddress from '../components/address/SelectAddress';
import Industry from '../screens/sellser/add_product_seller/Industry';
import ProductComman from '../screens/sellser/add_product_seller/ProductComman';

import Category from '../screens/customer/categories/Category';

import ProductCommanDetail from '../screens/sellser/add_product_seller/ProductCommanDetail';
import RegistrationScreen1 from '../components/register_seller/RegistrationScreen1';
import RegisterForm from '../components/register_seller/RegisterForm';
import CartScreen from '../screens/customer/cart/Cart';
import DeliveryScreen from '../screens/customer/delivery/DeliveryScreen';
import PurchaseSuccesful from '../screens/customer/purchase/PurchaseSuccesful';
import ShopHome from '../screens/customer/shop_home/ShopHome';
import OrderScreen from '../screens/customer/order/OrderScreen';
import ChatHomeScreen from '../screens/customer/chat/ChatHomeScreen';
import ChatBox from '../screens/customer/chat/ChatBox';
import QrScreen from '../components/purchase/QrScreen';
const Stack = createNativeStackNavigator();
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Purchase" component={PurchaseScreen} />
      <Stack.Screen name="PaymentSuccesful" component={PurchaseSuccesful} />
      <Stack.Screen name="flashsale" component={FlashSaleScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="add_address" component={AddAddress} />
      <Stack.Screen name="SelectProvince" component={SelectAddress} />

      <Stack.Screen name="methodDeliveryList" component={DeliveryScreen} />
      <Stack.Screen name="SearchPageResult" component={SearchPageResult} />
      <Stack.Screen name="ChatHomeScreen" component={ChatHomeScreen} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="ShopHome" component={ShopHome} />
      
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="QR" component={QrScreen} />
      <Stack.Screen name="ChatBox" component={ChatBox} />
      
      {/* Seller navigator */}
      <Stack.Screen name="SellerHome" component={SellerHome} />
      <Stack.Screen name="ProductSeller" component={ProductSeller} />
      <Stack.Screen name="OrderSeller" component={OrderSeller} />
      <Stack.Screen name="AddProductSeller" component={AddProductSeller} />
      <Stack.Screen name="Industry" component={Industry} />
      <Stack.Screen name="ProductComman" component={ProductComman} />
      <Stack.Screen name="Finance" component={Finance} />
      <Stack.Screen
        name="ProductCommanDetail"
        component={ProductCommanDetail}
      />
      <Stack.Screen
        name="RegistrationSellerScreen"
        component={RegistrationScreen1}
      />
      <Stack.Screen name="RegisterSellerScreen" component={RegisterForm} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
