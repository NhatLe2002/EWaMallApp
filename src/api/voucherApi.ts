import {axiosClient} from './axiosApi';


const voucherApi = {
  getAllVoucher() {
    const url = `/api/Voucher/GetAllVouchers`;
    return axiosClient.get(url);
  }
};

export default voucherApi;
