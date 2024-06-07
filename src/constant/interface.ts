import {
  Cart,
  CreateOrderRequest,
  CreateProduct,
  District,
  Industry,
  Product,
  ProductAddToCart,
  Province,
  UpdateCartDetail,
} from './types';

interface InterfaceAccountState {
  accountReducer?: any;
  currentUser: null | string;
  isLogin: boolean;
  notification: null | string;
  role: string | null;
  username: string | null;
  userId: String | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
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
  productSearchList: Product[];
  productFilterList: Product[];
  product: Product | null;
  error: string | null;
}

interface InterfaceIndustryState {
  industryReducer?: any;
  industryList: Industry[];
  error: string | null;
}

interface InterfaceCartState {
  cartReducer?: any;
  cartList: Cart[];
  updateCartQuantity: UpdateCartDetail | null;
  product_add: ProductAddToCart | null;
  product_purchase: number[] | null;
  info_order: CreateOrderRequest | null;
  error: string | null;
}
interface InterfaceAddressState {
  addressReducer?: any;
  province: Province[];
  district: District[];
  ward: [];
}
export type {
  InterfaceAccountState,
  InterfaceIndustryState,
  InterfaceProductState,
  InterfaceCartState,
  InterfaceAddressState,
};
