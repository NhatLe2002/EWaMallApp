import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InterfaceProductState } from '../../../constant/interface/productInterface'
import productApi from '../../../api/productApi';
import { Product, ProductCreate } from '../../../constant/types/productType';


const initialState: InterfaceProductState = {
  productList: [],
  productCreate: {
    productName: '',
    productDescription: '',
    coverImageId: '',
    imagesId: '',
    videoId: '',
    industryId: '',
    sellerId: '',
    productSellDetails: [],
    productSellCommand: []
  } ,
  product: null,
  error: null,
  loading: false,
}
export const getProductsBySellerId = createAsyncThunk(
  'products/getProductsBySellerId',
  async (sellerId: number) => {
    try {
      const response = await productApi.getProductBySellerId(sellerId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const productSellerSlice = createSlice({
  name: 'productSeller',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(
      getProductsBySellerId.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        return { ...state, productList: action.payload, error: '' };
      },
    );
    builder.addCase(
      getProductsBySellerId.rejected, (state, action) => {
        return { ...state, error: action.payload as string };
      }
    );
  }
})

export const {} = productSellerSlice.actions;
export default productSellerSlice.reducer