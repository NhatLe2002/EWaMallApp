import {axiosClient} from './axiosApi';
import {APIURL} from './constant_api';

const accountApi = {
  login(param: {email: string; password: string}) {
    const url = '/api/Account/Login';
    return axiosClient.post(url, param);
  },
  getSellerById(sellerId: number) {
    const url = `/api/Account/GetSellerById/${sellerId}`;
    return axiosClient.get(url);
  },
};

export default accountApi;
