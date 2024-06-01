import { Detail } from "../types/detailType";





interface IDetailSellerState {
    detailSellerReducer?: any;
    detailList: Detail[] | null;
    loading: boolean;
    error: string | null;
}


export type { IDetailSellerState };