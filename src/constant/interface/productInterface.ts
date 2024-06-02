import { CreateProduct } from "../types";
import { Product } from "../types/productType";

interface InterfaceProductState {
    productReducer?: any;
    productList: Product[];
    product: Product | null;
    error: string | null;
    createProduct?:CreateProduct | null
  }
  

  
export type {InterfaceProductState};