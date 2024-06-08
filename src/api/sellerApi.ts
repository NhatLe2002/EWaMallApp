import {ISeller} from './../constant/interface';
import {axiosClient} from './axiosApi';

const sellerApi = {
  createSeller(params: ISeller) {
    // console.log(params.userId);
    const newSeller = {
      shopName: params.shopName,
      address: params.address,
      provinceId: params.provinceId,
      districtId: params.districtId,
      wardId: params.wardId,
      phoneNumber: params.phoneNumber,
      email: params.email,
      description: params.description,
    };
    const url = `/api/Account/RegisterSeller?userId=${params.userId}`;
    return axiosClient.post(url, newSeller);
  },
  getSellerById(sellerId: number) {
    const url = `/api/Account/GetSellerById/${sellerId}`;
    return axiosClient.get(url);
  },
};

export default sellerApi;
