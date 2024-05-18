import {configureStore} from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice';

const store = configureStore({
  reducer: {
    accountReducer,
  },
});

export default store;
