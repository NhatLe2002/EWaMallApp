import {configureStore} from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice';
import productReducer from './slice/productSlice';

const store = configureStore({
  reducer: {
    accountReducer,
    productReducer
  },
});

export default store;
