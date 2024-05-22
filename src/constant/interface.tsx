import {Product} from './types';

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
