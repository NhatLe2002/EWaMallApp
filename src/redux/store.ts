import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice';
import industrySellerReducer from './slice/seller/industrySellerSlice';
import productSellerReducer from './slice/seller/productSellerSlice';
import industryDetailSellerReducer from './slice/seller/industryDetailSellerSlice';
import formCreateProductReducer from './slice/form/formCreateProductBySellerSlice';
import productReducer from './slice/productSlice';
import industryReducer from './slice/industrySlice';
import cartReducer from './slice/cartSlice';
import addressReducer from './slice/addressSlice';

const store = configureStore({
  reducer: {
    accountReducer,
    productReducer,
    cartReducer,
    addressReducer,
    productSellerReducer,
    industrySellerReducer,
    industryReducer,

  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;

