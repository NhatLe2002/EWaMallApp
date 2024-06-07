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
import Finance from '../screens/sellser/finance/Finance';
import FlashSaleScreen from '../screens/customer/flashsale/FlashSaleScreen';
import SearchPage from '../screens/guest/search/SearchPage';
import SearchPageResult from '../screens/guest/search/SearchPageResult';
import AddressScreen from '../screens/customer/address/AddressScreen';
import AddAddress from '../screens/customer/address/AddAddress';
import SelectAddress from '../components/address/SelectAddress';
import Industry from '../screens/sellser/add_product_seller/Industry';
import ProductComman from '../screens/sellser/add_product_seller/ProductComman';
import ProductCommanDetail from '../screens/sellser/add_product_seller/ProductCommanDetail';
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
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="add_address" component={AddAddress} />
      <Stack.Screen name="SelectProvince" component={SelectAddress} />

      <Stack.Screen name="SearchPageResult" component={SearchPageResult}/>
      <Stack.Screen name="SearchPage" component={SearchPage} />
      
      
      {/* Seller navigator */}
      <Stack.Screen name="SellerHome" component={SellerHome} />
      <Stack.Screen name="ProductSeller" component={ProductSeller} />
      <Stack.Screen name="OrderSeller" component={OrderSeller} />
      <Stack.Screen name="AddProductSeller" component={AddProductSeller} />
      <Stack.Screen name="Industry" component={Industry} />
      <Stack.Screen name="ProductComman" component={ProductComman} />
      <Stack.Screen name="Finance" component={Finance} />
      <Stack.Screen name="ProductCommanDetail" component={ProductCommanDetail} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
