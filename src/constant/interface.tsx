import {Industry, Product} from './types';

interface InterfaceAccountState {
  accountReducer?: any;
  currentUser: null | string;
  isLogin: boolean;
  notification: null | string;
  role: string;
  username: string;
  loading: boolean;
  error: string | null;
  success: boolean;
}


interface InterfaceProductState {
  productReducer?: any;
  productList: Product[];
  product: Product | null;
  error: string | null;
}

export type {InterfaceAccountState, InterfaceProductState};




//Phần này lỡ tạo mà lười xóa ko nhớ xóa chỗ nào nên để tạm đây nha 
export interface IIndustry {
  industryName: string;
  isActive: boolean;
  level: number;
  isLeaf: boolean;
  path: string;
  parentNodeId: any;
  parentNode: any;
  industryDetails: any[];
  id: number;
}

// Giao diện cho Seller
export interface ISeller {
  shopName: string;
  address: string;
  phoneNumber: string;
  email: string;
  description: string;
  wallet: any;
  userId: number;
  user: any;
  products: any[];
  id: number;
}

// Giao diện cho Product
export interface IProduct {
  productName: string;
  productDescription: string;
  coverImageId: string;
  imagesId: string;
  videoId: string;
  industryId: number;
  industry: IIndustry;
  productSellDetails: any[];
  productSellerDetails: any[];
  sellerId: number;
  seller: ISeller;
  id: number;
}
interface InterfaceProductState {
  productReducer?: any;
  productList: Product[];
  product: Product | null;
  error: string | null;
}
interface InterfaceIndustryState {
  industryReducer?: any;
  industryList: Industry[];
  error: string | null;
}
export type {InterfaceAccountState,InterfaceIndustryState, InterfaceProductState};
