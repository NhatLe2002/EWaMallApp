import {AxiosRequestConfig} from 'axios';
import {axiosAddress, axiosClient, axiosFee} from './axiosApi';
import {ShipAddress} from '../constant/types';

const addressApi = {
  getAllShipAddress(userId: string) {
    const url = `/api/User/GetShipAddress/${userId}`;
    return axiosClient.get(url);
  },
  createShipAddress(params: ShipAddress, userId: String) {
    const url = `api/User/CreateShipAddress/${userId}`;
    return axiosClient.post(url, params);
  },
  updateShipAddress(params: ShipAddress) {
    const url = `api/User/UpdateShipAddress/${params.id}`;
    return axiosClient.put(url, params);
  },
  removeShipAddress(shipAddressId: number) {
    const url = `api/User/CreateShipAddress/${shipAddressId}`;
    return axiosClient.delete(url);
  },
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
  getService(from_district: number, to_district: number) {
    const url = `/available-services`;
    const config: AxiosRequestConfig<any> = {
      params: {
        shop_id: 5094771,
        from_district: from_district,
        to_district: to_district,
      },
    };
    return axiosFee.get(url, config);
  },
  getFee(
    service_id: number,
    insurance_value: number,
    from_district_id: number,
    to_district_id: number,
    to_ward_code: string,
  ) {
    const config: AxiosRequestConfig<any> = {
      params: {
        service_id: service_id,
        insurance_value: insurance_value,
        coupon: null,
        from_district_id: from_district_id,
        to_district_id: to_district_id,
        to_ward_code: to_ward_code,
        height: 15,
        length: 15,
        weight: 1000,
        width: 15,
      },
    };
    const url = `/fee`;
    return axiosFee.get(url, config);
  },
};

export default addressApi;
