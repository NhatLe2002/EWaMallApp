import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InterfaceIndustryState} from '../../constant/interface';
import industryApi from '../../api/industryApi';
import {Industry} from '../../constant/types';

const initialState: InterfaceIndustryState = {
  industryList: [],
  error: null,
};
export const getAllIndustry = createAsyncThunk(
  'industry/fetchAll',
  async () => {
    try {
      const response = await industryApi.getAllIndustry();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
const industrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getAllIndustry.fulfilled,
      (state, action: PayloadAction<Industry[]>) => {
        return {...state, industryList: action.payload, error: ''};
      },
    );
    builder.addCase(
        getAllIndustry.rejected,
        (state, action) => {
          return {...state, error: action.payload as string};
        },
      );
  },
});
export default industrySlice.reducer