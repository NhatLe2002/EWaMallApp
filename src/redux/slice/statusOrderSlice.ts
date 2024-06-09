import {FA5Style} from './../../../node_modules/@types/react-native-vector-icons/FontAwesome5.d';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import orderApi from '../../api/orderApi';
import {IOrderStatusState} from '../../constant/interface/IStatusOrder';

const initialState: IOrderStatusState = {
  statusList: [],
  error: '',
  loading: false,
};
export const fetchAllStatus = createAsyncThunk(
  'orderStatus/fetchStatus',
  async () => {
    try {
      const response = await orderApi.getOrderStatus();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const statusOrderSlice = createSlice({
  name: 'orderStatus',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchAllStatus.fulfilled,
      (state, action) => {
        return {...state, statusList: action.payload, error: ''};
      },
    );
    builder.addCase(fetchAllStatus.rejected, (state, action) => {
      return {...state, error: action.payload as string};
    });
  },
});
export default statusOrderSlice.reducer;
