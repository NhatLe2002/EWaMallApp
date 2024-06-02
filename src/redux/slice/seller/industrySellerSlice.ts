import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InterfaceIndustryState } from "../../../constant/interface/industryInterface";
import { Industry, IndustryById } from "../../../constant/types/industryType";
import industryApi from "../../../api/industryApi";

const initialState: InterfaceIndustryState = {
  industryListAll: [],
  subIndustryById: [],
  industryById: null,
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
export const getIndustryById = createAsyncThunk(
  'industrys/getIndustryById',
  async (industryId: number) => {
    try {
      const response = await industryApi.getIndustryById(industryId);
      // console.log("getIndustryById response data:", JSON.stringify(response.data, null, 2)); // Log dữ liệu chuỗi hóa
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
    set: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
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
    builder.addCase(
      getIndustryById.pending,
      (state) => {
        state.loading = true;
        state.error = '';
      }
    ).addCase(
      getIndustryById.fulfilled,
      (state, action: PayloadAction<IndustryById>) => {
        // console.log("Action payload in reducer:", JSON.stringify(action.payload, null, 2)); // Log dữ liệu chuỗi hóa
        return { ...state, industryById: action.payload, loading: false, error: '' };
      }
    ).addCase(
      getIndustryById.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );

  }
})


export default industrySellerSlice.reducer