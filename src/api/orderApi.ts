import { axiosClient } from "./axiosApi";

const orderApi = {
    getAllOrderBySellerId(sellerId: number) {
        const url = `/api/User/GetOrderBySellerId/${sellerId}`;
        return axiosClient.get(url);
    },
};

export default orderApi;
