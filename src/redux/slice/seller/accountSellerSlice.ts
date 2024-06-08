import {ISeller} from './../../../constant/interface';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISellerState} from '../../../constant/interface/sellerInterface';
import sellerApi from '../../../api/sellerApi';

const initialState: ISellerState = {
  seller: {
    shopName: '',
    address: '',
    provinceId: 0,
    districtId: 0,
    wardId: 0,
    phoneNumber: '',
    email: '',
    description: '',
    userId: 0,
  },
  error: '',
  loading: false,
};

// sellerReducer?: any;
// seller : ISeller;
// error: string | null;
// loading: boolean

export const createSeller = createAsyncThunk(
  'seller/createSeller',
  async (seller: ISeller) => {
    try {
        console.log('seller post : ', seller);
      const response = await sellerApi.createSeller(seller);
      
      return response.data;
    } catch (error) {
      console.error('Failed to create seller:', error);
      throw error;
    }
  },
);
//   seller: {
//     shopName: '',
//     address: '',
//     provinceId: 0,
//     districtId: 0,
//     wardId: 0,
//     phoneNumber: '',
//     email: '',
//     description: '',
//     userId: 0,
//   },
//   error: '',
//   loading: false,
const accountSellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setShopName: (state, action) => {
      state.seller.shopName = action.payload;
    },
    setAddress: (state, action) => {
      state.seller.address = action.payload;
    },
    setDistrict: (state, action) => {
      state.seller.districtId = action.payload;
    },
    setProvince: (state, action) => {
      state.seller.provinceId = action.payload;
    },
    setWard: (state, action) => {
      state.seller.wardId = action.payload;
    },
    setPhone: (state, action) => {
      state.seller.phoneNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.seller.email = action.payload;
    },
    setDescription: (state, action) => {
      state.seller.description = action.payload;
    },
    setUserIdForSeller: (state, action) => {
      state.seller.userId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createSeller.fulfilled, (state, action) => {
      return {...state, seller: action.payload, error: ''};
    });
    builder.addCase(createSeller.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
  },
});
export const {
  setShopName,
  setAddress,
  setPhone,
  setEmail,
  setDescription,
  setUserIdForSeller,
  setDistrict,
  setProvince,
  setWard,
} = accountSellerSlice.actions;
export default accountSellerSlice.reducer;
