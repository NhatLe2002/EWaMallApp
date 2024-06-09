import { ISeller_2 } from "../interface";

interface ISellerState {
  sellerReducer?: any;
  seller : ISeller_2;
  error: string | null;
  loading: boolean
}



export type { ISellerState };