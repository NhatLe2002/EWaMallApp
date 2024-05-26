import { Product } from "../types/productType";

interface InterfaceProductState {
    productReducer?: any;
    productList: Product[];
    product: Product | null;
    error: string | null;
  }
  

  
export type {InterfaceProductState};