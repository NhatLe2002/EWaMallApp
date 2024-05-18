interface InterfaceAccountState {
  accountReducer?: any;
  currentUser: null | string;
  isLogin: boolean;
  notification: null | string;
  role: string;
  username: string;
  loading: boolean;
  error: null | Error;
  success: boolean;
}

export type {InterfaceAccountState};
