import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice';
import productReducer from './slice/ProductSlice';
import industryReducer from './slice/industrySlice';
import { IndustryAPI } from './api/IndustryAPI';
import { ProductAPI } from './api/ProductApi';

const store = configureStore({
  reducer: {
    accountReducer,
    productReducer,
    industryReducer,
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

