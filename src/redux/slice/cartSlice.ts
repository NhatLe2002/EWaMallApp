
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {InterfaceCartState} from '../../constant/interface';
import cartApi from '../../api/cartApi';
import {
  Cart,
  CreateOrderRequest,
  ProductAddToCart,
  UpdateCartDetail,
} from '../../constant/types';

const initialState: InterfaceCartState = {
  cartList: [],
  updateCartQuantity: null,
  product_add: null,
  product_purchase: null,
  error: null,

};
export const fetchAllCart = createAsyncThunk(
  'cart/fetchAll',
  async (userId: string) => {
    try {
      const response = await cartApi.getAllCart(userId);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({
    quantity,
    userId,
    sellDetailId,
  }: {
    quantity: number;
    userId: number;
    sellDetailId: number;
  }) => {
    try {
      const add_product = {
        quantity: quantity,
        userId: userId,
        sellDetailId: sellDetailId,
      };
      console.log('test', add_product);
      const response = await cartApi.addToCart(add_product);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const updateCartQuantity = createAsyncThunk(
  'cart/update_CartQuantity',
  async ({cartId, quantity}: {cartId: number; quantity: number}) => {
    try {
      const response = await cartApi.updateQuantityCart(cartId, quantity);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProductBuy: (state, action: PayloadAction<number[]>) => {
      state.product_purchase = action.payload;
    },
    increaseQuantity: (state, action: PayloadAction<{ cartId: number, quantity: number }>) => {
      const { cartId, quantity } = action.payload;
    
      const product = state.cartList.find(product => product.cartId === cartId);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<{ cartId: number, quantity: number }>) => {
      const { cartId, quantity } = action.payload;
 
      const product = state.cartList.find(product => product.cartId === cartId);
      if (product) {
      
        product.quantity -= 1;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchAllCart.fulfilled,
      (state, action: PayloadAction<Cart[]>) => {
        return {...state, cartList: action.payload, error: ''};
      },
    );
    builder.addCase(fetchAllCart.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<ProductAddToCart>) => {
        return {...state, product_add: action.payload, error: ''};
      },
    );
    builder.addCase(addToCart.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      updateCartQuantity.fulfilled,
      (state, action: PayloadAction<UpdateCartDetail>) => {
        return {...state, updateCartQuantity: action.payload, error: ''};
      },
    );
    builder.addCase(updateCartQuantity.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });

  },
});

export const {setProductBuy,increaseQuantity,decreaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;
