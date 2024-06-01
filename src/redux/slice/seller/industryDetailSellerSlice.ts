import { createSlice } from "@reduxjs/toolkit";
import { IIndustryDetailSellerState } from "../../../constant/interface/industryDetailInterface";

const initialState: IIndustryDetailSellerState = {
    
    loading: false,
    error: null
}





const industryDetailSellerSlice = createSlice({
    name: 'industryDetailSeller',
    initialState,
    reducers: {

    },
})

export default industryDetailSellerSlice.reducer