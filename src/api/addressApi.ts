import {AxiosRequestConfig} from 'axios';
import {axiosAddress} from './axiosApi';

const addressApi = {
  getProvice() {
    const url = `/province`;
    return axiosAddress.get(url);
  },
  getDistrict(province_id: number) {
    const url = `/district`;
    const config: AxiosRequestConfig<any> = {
      params: {
        province_id: province_id,
      },
    };
    return axiosAddress.get(url, config);
  },
  getWard(district_id: number) {
    const url = `/ward`;
    const config: AxiosRequestConfig<any> = {
        params: {
            district_id: district_id,
        },
      };
    return axiosAddress.get(url, config);
  },
  //   getService() {
  //     const url = `/province`;
  //     return axiosClient.get(url);
  //   },
  //   getFee(param: {quantity: number; userId: number; sellDetailId: number}) {
  //     const url = `/api/User/AddToCart`;
  //     return axiosClient.post(url, param);
  //   },
};

export default addressApi;
