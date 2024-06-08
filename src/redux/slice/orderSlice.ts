import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InterfaceOrderState} from '../../constant/interface';

import {
  CreateOrderDetailCommand,
  CreateOrderRequest,
  OrderAllByUserId,
} from '../../constant/types';
import cartApi from '../../api/cartApi';
import orderApi from '../../api/orderApi';

const initialState: InterfaceOrderState = {
  orderList: null,
  info_order: {
    userId: 0,
    totalCost: 0,
    shipCost: 0,
    shipAddressId: 0,
    createOrderDetailCommands: [],
  },
  orderAllByUser: null,
  pendingOrders: null,
  waitingOrders: null,
  deliveryOrders:null,
  successOrders: null,
  cancelOrders:null,
  refundOrders:null
};
export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async (orderRequest: CreateOrderRequest) => {
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
      const requestWithOrderCode = {
        ...orderRequest,
        orderCode: orderCode,
        statusId: 1,
        voucherId: 0,
        paymentId: 1,
      };

      const response = await cartApi.createOrder(requestWithOrderCode);

      return response.data;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  },
);
export const getOrderByUserId = createAsyncThunk(
  'order/fetchAll',
  async (userId: string) => {
    try {
      const response = await orderApi.getOrderById(userId);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.info_order!.userId = action.payload;
    },
    setTotalCost: (state, action: PayloadAction<number>) => {
      state.info_order!.totalCost = action.payload;
    },
    setShipCostt: (state, action: PayloadAction<number>) => {
      state.info_order!.shipCost = action.payload;
    },
    setShipAddressId: (state, action: PayloadAction<number>) => {
      state.info_order!.shipAddressId = action.payload;
    },
    setCreateOrderDetailCommands: (
      state,
      action: PayloadAction<CreateOrderDetailCommand[]>,
    ) => {
      state.info_order!.createOrderDetailCommands = action.payload;
    },

  },
  extraReducers: builder => {
    builder.addCase(
      createOrder.fulfilled,
      (state, action: PayloadAction<CreateOrderRequest>) => {
        // return {...state, info_order: action.payload, error: ''};
      },
    );
    builder.addCase(createOrder.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
    builder.addCase(
      getOrderByUserId.fulfilled,
      (state, action: PayloadAction<OrderAllByUserId[]>) => {
        state.pendingOrders = action.payload.filter(
          order => order.status.id === 1,
        );
        state.waitingOrders = action.payload.filter(
          order => order.status.id === 2,
        );
        state.deliveryOrders = action.payload.filter(
          order => order.status.id === 3,
        );
        state.successOrders = action.payload.filter(
          order => order.status.id === 4,
        );
        state.cancelOrders = action.payload.filter(
          order => order.status.id === 5,
        );
        state.refundOrders = action.payload.filter(
          order => order.status.id === 6,
        );
        return state;
      },
    );
    builder.addCase(getOrderByUserId.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
  },
});
export const {
  setUserId,
  setTotalCost,
  setShipCostt,
  setShipAddressId,
  setCreateOrderDetailCommands,
} = orderSlice.actions;
export default orderSlice.reducer;
