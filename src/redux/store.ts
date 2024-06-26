import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice';
import industrySellerReducer from './slice/seller/industrySellerSlice';
import productSellerReducer from './slice/seller/productSellerSlice';
import voucherReducer from './slice/customer/voucherSlice';
import notificationReducer from './slice/notificationSlice'
import formCreateProductReducer from './slice/form/formCreateProductBySellerSlice';
import productReducer from './slice/productSlices';
import industryReducer from './slice/industrySlice';
import cartReducer from './slice/cartSlice';
import addressReducer from './slice/addressSlice';
import orderReducer from './slice/orderSlice';
import sellerReducer from './slice/seller/accountSellerSlice';
import orderStatusReducer from './slice/statusOrderSlice'

const store = configureStore({
  reducer: {
    accountReducer,
    productReducer,
    notificationReducer,
    cartReducer,
    addressReducer,
    productSellerReducer,
    industrySellerReducer,
    industryReducer,
    formCreateProductReducer,
    voucherReducer,
    orderReducer,
    sellerReducer,
    orderStatusReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
//orderStatusReducer
