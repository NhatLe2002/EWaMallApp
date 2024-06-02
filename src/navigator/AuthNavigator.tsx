import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import SearchPage from '../screens/guest/search/SearchPage';
import SearchPageResult from '../screens/guest/search/SearchPageResult';
const Stack = createNativeStackNavigator();
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
      />
      <Stack.Screen
        name="Purchase"
        component={PurchaseScreen}
      />


      {/* Seller navigator */}
      <Stack.Screen name="SearchPageResult" component={SearchPageResult}/>
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="SellerHome" component={SellerHome} />
      <Stack.Screen name="ProductSeller" component={ProductSeller} />
      <Stack.Screen name="OrderSeller" component={OrderSeller} />
      <Stack.Screen name="AddProductSeller" component={AddProductSeller} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
