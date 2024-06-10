import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {InterfaceProductState} from '../../../constant/interface/productInterface';
import productApi from '../../../api/productApi';
import {Product, ProductCreate} from '../../../constant/types/productType';
import sellerApi from '../../../api/sellerApi';
import {CreateProduct} from '../../../constant/types';

const initialState: InterfaceProductState = {
  productList: [],
  productListRenderRedux: null,
  productCreate: {
    productName: '',
    productDescription: '',
    coverImageId: '',
    imagesId: '',
    videoId: '',
    industryId: '',
    sellerId: '',
    productSellDetails: [],
    productSellCommand: [],
  },
  productListFilter : null,
  product: null,
  error: null,
  loading: false,
  createProduct: null,
};
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
export const updateProductOfSeller = createAsyncThunk(
  'products/updateProductStatus',
  async ({productId, status}: {productId: number; status: number}) => {
    try {
      const response = await sellerApi.updateProductOfSeller(productId, status);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const createProduct = createAsyncThunk(
  'products/create_product',
  async (data: CreateProduct) => {
    const {
      productName,
      productDescription,
      coverImageId,
      imagesId,
      videoId,
      industryId,
      sellerId,
      productSellDetails,
      productSellCommand,
    } = data;
    // console.log("data", data);
    const product_create = {
      productName: productName,
      productDescription: productDescription,
      coverImageId: coverImageId,
      imagesId: imagesId,
      videoId: videoId,
      industryId: industryId,
      sellerId: sellerId,
      productSellDetails: productSellDetails,
      productSellCommand: productSellCommand,
    };
    try {
      const response = await productApi.createProduct(product_create);
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
    setProductListRenderRedux: (
      state,
      action: PayloadAction<Product[] | null>,
    ) => {
      state.productListRenderRedux = action.payload;
    },
    setProductListFilterRedux: (
      state,
      action: PayloadAction<Product[] | null>,
    ) => {
      state.productListFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getProductsBySellerId.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        return {...state, productList: action.payload, error: ''};
      },
    );
    builder.addCase(getProductsBySellerId.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      createProduct.fulfilled,
      (state, action: PayloadAction<CreateProduct>) => {
        return {...state, createProduct: action.payload, error: ''};
      },
    );
    builder.addCase(createProduct.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(updateProductOfSeller.fulfilled, (state, action) => {
      return {...state, productList: action.payload, error: ''};
    });
    builder.addCase(updateProductOfSeller.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
  },
});
export const {setProductListRenderRedux,setProductListFilterRedux} = productSellerSlice.actions;
export default productSellerSlice.reducer;
