import {
  Cart,
  CreateOrderRequest,
  CreateProduct,
  District,
  FeeShip,
  Industry,
  OrderAllByUserId,
  OrderList,
  Product,
  ProductAddToCart,
  Province,
  Seller,
  ServiceShip,
  ShipAddress,
  UpdateCartDetail,
  Ward,
} from './types';
import { OrderGetBySellerId } from './types/orderType';

interface InterfaceAccountState {
  accountReducer?: any;
  currentUser: null | string;
  isLogin: boolean;
  notification: null | string;
  role: string | null;
  username: string | null;
  userId: String | null;
  sellerProfile: Seller | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface InterfaceNotification {
  notificationReducer?: any;
  newNotificationReceived: boolean | undefined;
}

interface InterfaceOrderState {
  orderReducer?: any;
  orderList: OrderList | null;
  orderListBySellerIdRenderRedux: OrderGetBySellerId[] | null;
  orderListBySellerId: OrderGetBySellerId [] | null;
  info_order: CreateOrderRequest | null;
  orderAllByUser: OrderAllByUserId[] | null;
  pendingOrders: OrderAllByUserId[] | null;
  waitingOrders: OrderAllByUserId[]| null;
  deliveryOrders: OrderAllByUserId[] | null;
  successOrders: OrderAllByUserId[] | null;
  cancelOrders: OrderAllByUserId[] | null;
  refundOrders: OrderAllByUserId[] | null;
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
  provinceId: number;
  districtId: number;
  wardId: number;
  phoneNumber: string;
  email: string;
  description: string;
  wallet: any;
  userId: number;
  user: any;
  products: any[];
  id: number;
}
export interface ISeller_2 {
  shopName: string;
  address: string;
  provinceId: number;
  districtId: number;
  wardId: number;
  phoneNumber: string;
  email: string;
  description: string;
  userId: number;
  
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

  error: string | null;
}
interface InterfaceAddressState {
  addressReducer?: any;
  listShipAddress: ShipAddress[];
  province: Province[];
  district: District[];
  ward: Ward[];
  serviceShip: ServiceShip[];
  feeShip: FeeShip | null;
  updateShipAddress: ShipAddress | null;
}
export type {
  InterfaceAccountState,
  InterfaceIndustryState,
  InterfaceProductState,
  InterfaceCartState,
  InterfaceAddressState,
  InterfaceOrderState,
};
