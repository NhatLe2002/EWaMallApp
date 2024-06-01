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
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: ProductCreate) => {
    try {
      const response = await productApi.createProductBySeller(productData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSellerSlice = createSlice({
  name: 'productSeller',
  initialState,
  reducers: {
    setProductCreateField: (state, action: PayloadAction<Partial<ProductCreate>>) => {
      state.productCreate = { ...state.productCreate, ...action.payload };
    },
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
    builder
      .addCase(createProduct.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          return { ...state, product: action.payload, error: '', loading: false };
        })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
      );

  }
})

export const {setProductCreateField} = productSellerSlice.actions;
export default productSellerSlice.reducer