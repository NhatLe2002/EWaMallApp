import { Product, ProductCreate } from "../types/productType";

interface InterfaceProductState {
  productSellerReducer?: any;
  productList: Product[];
  productCreate: ProductCreate ;
  product: Product | null;
  error: string | null;
  loading: boolean
}



export type { InterfaceProductState };