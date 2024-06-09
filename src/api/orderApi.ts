import {axiosClient} from './axiosApi';

const orderApi = {
  getAllOrderBySellerId(sellerId: number) {
    const url = `/api/User/GetOrderBySellerId/${sellerId}`;
    return axiosClient.get(url);
  },
  getOrderById(userId: string) {
    const url = `/api/User/GetOrderByUserId/${userId}`;
    return axiosClient.get(url);
  },
  getOrderStatus() {
    const url = `/api/BaseSetup/GetOrderStatus`;
    return axiosClient.get(url);
  },
  updateStatusOrder({
    orderId,
    statusCode,
  }: {
    orderId: number;
    statusCode: string;
  }) {
    const url = `/api/User/AcceptOrder/${orderId}?statusCode=${statusCode}`;
    return axiosClient.post(url);
  },
};

export default orderApi;
