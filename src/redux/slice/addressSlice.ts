import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {InterfaceAddressState} from '../../constant/interface';

import {
  District,
  Province,
  ServiceShip,
  FeeShip,
  ShipAddress,
  Ward,
} from '../../constant/types';
import addressApi from '../../api/addressApi';

const initialState: InterfaceAddressState = {
  listShipAddress: [],
  province: [],
  district: [],
  ward: [],
  serviceShip: [],
  feeShip: null,
  updateShipAddress: null,
};
export const shipAddressByUserId = createAsyncThunk(
  'address/ship_address_ByUserId',
  async (userId: string) => {
    try {
      const response = await addressApi.getAllShipAddress(userId);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
export const updateAddressByShipAddressId = createAsyncThunk(
  'address/update_ship_address_ByShipAddressId',
  async (data: ShipAddress) => {
    console.log(',têt', data);
    try {
      const response = await addressApi.updateShipAddress(data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
export const getServiceShip = createAsyncThunk(
  'address/getServiceShip',
  async (data: {from_district: number; to_district: number}) => {
    try {
      const response = await addressApi.getService(
        data.from_district,
        data?.to_district,
      );
      const formattedList = response?.data?.data?.map(
        ({
          service_id,
          short_name,
          service_type_id,
        }: {
          service_id: number;
          short_name: string;
          service_type_id: number;
        }) => ({
          service_id,
          short_name,
          service_type_id,
        }),
      );
      return formattedList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
export const getFeeShip = createAsyncThunk(
  'address/getFeeShip',
  async (data: {
    service_id: number;
    insurance_value: number;
    from_district_id: number;
    to_district_id: number;
    to_ward_code: string;
  }) => {
    try {
      const response = await addressApi.getFee(
        data.service_id,
        data?.insurance_value,
        data?.from_district_id,
        data?.to_district_id,
        data?.to_ward_code,
      );
      const {total, service_fee, insurance_fee} = response.data.data;
      return {total, service_fee, insurance_fee};
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
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
export const fetchWardByDistrictId = createAsyncThunk(
  'address/fetch_WardByDistrictId',
  async (districtId: number) => {
    try {
      const response = await addressApi.getWard(districtId);
      const formattedWard = response?.data?.data?.map(
        ({
          WardCode,
          DistrictID,
          WardName,
        }: {
          WardCode: number;
          DistrictID: number;
          WardName: string;
        }) => ({
          WardCode,
          DistrictID,
          WardName,
        }),
      );
      return formattedWard;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
const addressSlice = createSlice({
  name: 'adress',
  initialState,
  reducers: {
    // //   province: [],
    // // district: [],
    // // ward: [],
    // setProvince: (state, action: PayloadAction<string>) => {
    //   state.province = action.payload;
    // },
  },
  extraReducers: builder => {
    builder.addCase(
      shipAddressByUserId.fulfilled,
      (state, action: PayloadAction<ShipAddress[]>) => {
        return {...state, listShipAddress: action.payload, error: ''};
      },
    );
    builder.addCase(shipAddressByUserId.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      updateAddressByShipAddressId.fulfilled,
      (state, action: PayloadAction<ShipAddress>) => {
        return {...state, updateShipAddress: action.payload, error: ''};
      },
    );
    builder.addCase(updateAddressByShipAddressId.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      getServiceShip.fulfilled,
      (state, action: PayloadAction<ServiceShip[]>) => {
        return {...state, serviceShip: action.payload, error: ''};
      },
    );
    builder.addCase(getServiceShip.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      getFeeShip.fulfilled,
      (state, action: PayloadAction<FeeShip>) => {
        return {...state, feeShip: action.payload, error: ''};
      },
    );
    builder.addCase(getFeeShip.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
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
    builder.addCase(
      fetchWardByDistrictId.fulfilled,
      (state, action: PayloadAction<Ward[]>) => {
        return {...state, ward: action.payload, error: ''};
      },
    );
    builder.addCase(fetchWardByDistrictId.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
  },
});

export default addressSlice.reducer;
