import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVoucher, IVoucherState } from "../../../constant/interface/IVoucherState";
import voucherApi from "../../../api/voucherApi";




export const fetchAllVoucher = createAsyncThunk(
    'vouchers/fetchAll',
    async () => {
        try {
            const response = await voucherApi.getAllVoucher();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
);




const initialState: IVoucherState = {
    voucherList: [],
    error: null,
    loading: false,
}


const voucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(
            fetchAllVoucher.fulfilled,
            (state, action: PayloadAction<IVoucher[]>) => {
                return { ...state, voucherList: action.payload, error: '' };
            },
        );
        builder.addCase(
            fetchAllVoucher.rejected, (state, action) => {
                return { ...state, error: action.payload as string };
            }
        );
    }
})

export default voucherSlice.reducer