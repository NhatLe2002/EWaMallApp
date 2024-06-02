import {Product, ProductCreate } from "../types/productType";

interface IFormProductCreateState {
  formCreateProductReducer?: any;
  product: Product | null;
  productCreate: ProductCreate ;
  productCreateError: ProductCreateError ;
  error: string | null;
  loading: boolean
}



export type { IFormProductCreateState };



//Khai bao con
interface ProductCreateError {
    [key: string]: string; // Key là tên của trường, value là thông báo lỗi
  }