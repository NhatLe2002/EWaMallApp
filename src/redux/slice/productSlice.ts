import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import productApi from '../../api/productApi';
import {InterfaceProductState} from '../../constant/interface';
import {Product} from '../../constant/types';
const initialState: InterfaceProductState = {
  productList: [],
  productSearchList: [],
  product: null,
  error: null,
};
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    try {
      const response = await productApi.getAllProduct();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const clearSearch = createAsyncThunk(
  'products/clearSearch',
  async () => {
    try {
      const response: Product[] = [];
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (productId: number) => {
    try {
      const response = await productApi.getProductById(productId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getProductBySearch = createAsyncThunk(
  'product/getProductBySearch',
  async (searchValue: string) => {
    try {
      const response = await productApi.getProductBySearch(searchValue);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setClearSearchProduct: (state) => {
      state.productSearchList = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchAllProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        return {...state, productList: action.payload, error: ''};
      },
    );
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      getProductById.fulfilled,
      (state, action: PayloadAction<Product>) => {
        return {...state, product: action.payload, error: ''};
      },
    );
    builder.addCase(getProductById.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      getProductBySearch.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        return {...state, productSearchList: action.payload, error: ''};
      },
    );
    builder.addCase(getProductBySearch.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
  },
});
export const {setClearSearchProduct} = productSlice.actions;
export default productSlice.reducer;
