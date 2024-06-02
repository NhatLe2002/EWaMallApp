import {axiosClient} from './axiosApi';
import { APIURL } from './constant_api';

const accountApi = {
  login(param: { email: string; password: string }) {
    const url = '/api/Account/Login';
    return axiosClient.post(url, param);
  },
};

export default accountApi;
