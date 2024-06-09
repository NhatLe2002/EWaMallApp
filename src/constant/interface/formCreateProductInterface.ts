import { Product, ProductCreate } from "../types/productType";

interface IFormProductCreateState {
  formCreateProductReducer?: any;
  product: Product | null;
  classificationRedux: Classification[] | null;
  productCreate: ProductCreate | null | undefined;
  productCreateError: ProductCreateError;
  error: string | null;
  imageProductList:String[] | null
  loading: boolean
}



export type { IFormProductCreateState, Classification };



//Khai bao con
interface ProductCreateError {
  [key: string]: string; // Key là tên của trường, value là thông báo lỗi
}

type Classification = {
  type: string;
  value: string[];
};
