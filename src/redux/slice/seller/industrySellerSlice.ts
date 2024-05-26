import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InterfaceIndustryState } from "../../../constant/interface/industryInterface";
import { Industry } from "../../../constant/types/industryType";
import industryApi from "../../../api/industryApi";

const initialState: InterfaceIndustryState = {
  industryList: [],
  industry: null,
  error: null
}

export const fetchAllIndustry = createAsyncThunk(
  'industrys/fetchAll',
  async () => {
    try {
      const response = await industryApi.getAllIndustry();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);


const industrySellerSlice = createSlice({
  name: 'industrySeller',
  initialState,
  reducers: {
    
  },
  extraReducers: builder => {
    builder.addCase(
      fetchAllIndustry.fulfilled,
      (state, action: PayloadAction<Industry[]>) => {
        return { ...state, industryList: action.payload, error: '' };
      },
    );
    builder.addCase(
      fetchAllIndustry.rejected, (state, action) => {
        return { ...state, error: action.payload as string };
      });
  }
})


export default industrySellerSlice.reducer