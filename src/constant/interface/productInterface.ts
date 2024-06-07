import { Product, ProductCreate } from "../types/productType";
import { CreateProduct } from "../types";

interface InterfaceProductState {
  productSellerReducer?: any;
  productList: Product[];
  productListRenderRedux: Product[] | null;
  productCreate: ProductCreate ;
  product: Product | null;
  error: string | null;
  loading: boolean
  createProduct?:CreateProduct | null
}



export type { InterfaceProductState };