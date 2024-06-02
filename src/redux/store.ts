import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice';
import industrySellerReducer from './slice/seller/industrySellerSlice';
import productSellerReducer from './slice/seller/productSellerSlice';
import industryDetailSellerReducer from './slice/seller/industryDetailSellerSlice';
import formCreateProductReducer from './slice/form/formCreateProductBySellerSlice';
import productReducer from './slice/productSlice';
import industryReducer from './slice/industrySlice';
import { IndustryAPI } from './api/IndustryAPI';
import { ProductAPI } from './api/ProductApi';

const store = configureStore({
  reducer: {
    accountReducer,
    productReducer,
    productSellerReducer,
    industrySellerReducer,
    industryReducer,
    industryDetailSellerReducer,

    //form
    formCreateProductReducer,

    [IndustryAPI.reducerPath]: IndustryAPI.reducer,
    [ProductAPI.reducerPath]: ProductAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(IndustryAPI.middleware)
      .concat(ProductAPI.middleware),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;

