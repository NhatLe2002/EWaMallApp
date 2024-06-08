import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InterfaceAccountState} from '../../constant/interface';
import accountApi from '../../api/accountApi';
import { Seller } from '../../constant/types';
const initialState: InterfaceAccountState = {
  currentUser: null,
  isLogin: false,
  notification: null,
  role: '',
  username: '',
  userId: '',
  loading: false,
  error: null,
  success: false,
  sellerProfile: null,
};
export const getSellerById = createAsyncThunk(
  'products/getSellerById',
  async (sellerId: number) => {
    try {
      const response = await accountApi.getSellerById(sellerId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getSellerById.fulfilled,
      (state, action: PayloadAction<Seller>) => {
        return {...state, sellerProfile: action.payload, error: ''};
      },
    );
    builder.addCase(getSellerById.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
  },
});

export const {setRole, setIsLogin, setUsername, setUserId} =
  accountSlice.actions;

export default accountSlice.reducer;
