import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {InterfaceCartState} from '../../constant/interface';
import cartApi from '../../api/cartApi';
import {Cart, CreateOrderRequest, ProductAddToCart, UpdateCartDetail} from '../../constant/types';

const initialState: InterfaceCartState = {
  cartList: [],
  updateCartQuantity: null,
  product_add: null,
  product_purchase: null,
  error: null,
  info_order: null,
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
export const increaseQuantity = createAsyncThunk(
  'cart/increase_uantity',
  async ({cartId, quantity}: {cartId: number; quantity: number}) => {
    try {
      const response = await cartApi.updateQuantityCart(cartId, quantity + 1);

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const decreaseQuantity = createAsyncThunk(
  'cart/decrease_quantity',
  async ({cartId, quantity}: {cartId: number; quantity: number}) => {
    try {
      const response = await cartApi.updateQuantityCart(cartId, quantity - 1);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async ({
    totalCost,
    quantity,
    userId,
    sellDetailId,
    shipCost,
    shipAddressId,
  }: {
    totalCost: number;
    quantity: number;
    userId: number;
    sellDetailId: number;
    shipCost: number;
    shipAddressId: number;
  }) => {
    try {
      const generateOrderCode = (length: number): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length),
          );
        }
        return result;
      };

      const orderCode = generateOrderCode(7);
      const orderRequest = {
        userId: userId,
        orderCode: orderCode,
        totalCost: totalCost,
        shipCost: shipCost,
        statusId: 1,
        shipAddressId: shipAddressId,
        voucherId: 0,
        paymentId: 1,
        createOrderDetailCommands: [
          {
            quantity: quantity,
            productSellDetailId: sellDetailId,
          },
        ],
      };

      // Gọi API để tạo đơn hàng
      const response = await cartApi.createOrder(orderRequest);

      // Trả về dữ liệu từ API
      return response.data;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
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
      increaseQuantity.fulfilled,
      (state, action: PayloadAction<UpdateCartDetail>) => {
        return {...state, updateCartQuantity: action.payload, error: ''};
      },
    );
    builder.addCase(increaseQuantity.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      decreaseQuantity.fulfilled,
      (state, action: PayloadAction<UpdateCartDetail>) => {
        return {...state, updateCartQuantity: action.payload, error: ''};
      },
    );
    builder.addCase(decreaseQuantity.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      createOrder.fulfilled,
      (state, action: PayloadAction<CreateOrderRequest>) => {
        return {...state, info_order: action.payload, error: ''};
      },
    );
    builder.addCase(createOrder.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
  },
});

export const {setProductBuy} = cartSlice.actions;

export default cartSlice.reducer;
