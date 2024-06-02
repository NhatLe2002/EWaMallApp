import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {InterfaceAddressState} from '../../constant/interface';

import {District, Province} from '../../constant/types';
import addressApi from '../../api/addressApi';

const initialState: InterfaceAddressState = {
  province: [],
  district: [],
  ward: [],
};
export const fetchAllProvince = createAsyncThunk(
  'address/fetchProvince',
  async () => {
    try {
      const response = await addressApi.getProvice();
      const provinces = response.data.data;

      const collator = new Intl.Collator('vi', {sensitivity: 'variant'});
      provinces.sort((a: {ProvinceName: string}, b: {ProvinceName: string}) =>
        collator.compare(a.ProvinceName, b.ProvinceName),
      );
      const formattedProvinces = provinces.map(
        ({
          ProvinceID,
          ProvinceName,
        }: {
          ProvinceID: number;
          ProvinceName: string;
        }) => ({
          ProvinceID,
          ProvinceName,
        }),
      );

      return formattedProvinces;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
export const fetchDistrictByProvinceId = createAsyncThunk(
  'address/fetch_DistrictByProvinceId',
  async (provinceId: number) => {
    try {
      const response = await addressApi.getDistrict(provinceId);
      const formattedDistrict = response?.data?.data?.map(
        ({
          DistrictID,
          ProvinceID,
          DistrictName,
        }: {
          DistrictID: number;
          ProvinceID: number;
          DistrictName: string;
        }) => ({
          DistrictID,
          ProvinceID,
          DistrictName,
        }),
      );
      return formattedDistrict;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

const addressSlice = createSlice({
  name: 'adress',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchAllProvince.fulfilled,
      (state, action: PayloadAction<Province[]>) => {
        return {...state, province: action.payload, error: ''};
      },
    );
    builder.addCase(fetchAllProvince.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      fetchDistrictByProvinceId.fulfilled,
      (state, action: PayloadAction<District[]>) => {
        return {...state, district: action.payload, error: ''};
      },
    );
    builder.addCase(fetchDistrictByProvinceId.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
  },
});

export default addressSlice.reducer;
