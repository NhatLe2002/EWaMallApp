import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormProductCreateState } from "../../../constant/interface/formCreateProductInterface";
import { Product, ProductCreate } from "../../../constant/types/productType";
import productApi from "../../../api/productApi";


const initialState: IFormProductCreateState = {
    product: null,
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
    productCreateError: {},
    error: null,
    loading: false,
  }
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

const formCreateProductSlice = createSlice({
    name: 'formCreateProduct',
    initialState,
    reducers: {
      setProductCreateField: (state, action: PayloadAction<Partial<ProductCreate>>) => {
        state.productCreate = { ...state.productCreate, ...action.payload };
      },
      setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      },
      setProductCreateError: (state, action: PayloadAction<{ field: string; error: string }>) => {
        const { field, error } = action.payload;
        state.productCreateError[field] = error;
      },
    },
    extraReducers: builder => {
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
export const {setProductCreateField, setError, setProductCreateError} = formCreateProductSlice.actions;
export default formCreateProductSlice.reducer