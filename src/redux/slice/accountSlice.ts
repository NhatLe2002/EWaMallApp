import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InterfaceAccountState} from '../../constant/interface';
import accountApi from '../../api/accountApi';
import {RegisterUser, Seller} from '../../constant/types';
import {Alert} from 'react-native';
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
  registerUsser: false,
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
export const registerUser = createAsyncThunk(
  'account/register',
  async (data: RegisterUser) => {
    try {
      const response = await accountApi.register(data);
      return response.data; // Trả về dữ liệu từ phản hồi thành công của API
    } catch (error) {
    console.log(error) // Trả về lỗi từ phản hồi không thành công của API
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
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<RegisterUser>) => {
        Alert.alert('Thông báo!', 'Bạn đã đăng ký  thành công!');
        return {...state, registerUsser: true, error: ''};
      },
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      Alert.alert('Thông báo!', 'Đăng ký thất bại!');
      return {...state, error: action.payload as string};
    });
  },
});

export const {setRole, setIsLogin, setUsername, setUserId} =
  accountSlice.actions;

export default accountSlice.reducer;
