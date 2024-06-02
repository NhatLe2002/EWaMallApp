import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InterfaceIndustryState } from "../../../constant/interface/industryInterface";
import { Industry } from "../../../constant/types/industryType";
import industryApi from "../../../api/industryApi";

const initialState: InterfaceIndustryState = {
  industryListAll: [],
  subIndustryById: [],
  industry: null,
  loading: false,
  error: null
}

export const fetchAllIndustry = createAsyncThunk(
  'industrys/fetchAll',
  async () => {
    try {
      const response = await industryApi.getAllIndustry();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getAllSubIndustryById = createAsyncThunk(
  'industrys/getAllSubIndustryById',
  async (industryId: number) => {
    try {
      const response = await industryApi.getAllSubIndustryById(industryId);
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
        return { ...state, industryListAll: action.payload, error: '' };
      },
    );
    builder.addCase(
      fetchAllIndustry.rejected, (state, action) => {
        return { ...state, error: action.payload as string };
      }
    );
    builder.addCase(
      getAllSubIndustryById.pending,
      (state) => {
        state.loading = true;
        state.error = '';
      }
    );
    builder.addCase(
      getAllSubIndustryById.fulfilled,
      (state, action: PayloadAction<Industry[]>) => {
        return { ...state, subIndustryById: action.payload, loading: false, error: '' };
      }
    );
    builder.addCase(
      getAllSubIndustryById.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
  }
})


export default industrySellerSlice.reducer