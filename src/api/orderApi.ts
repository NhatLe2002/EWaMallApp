
import {axiosClient} from './axiosApi';

const orderApi = {
 
    getOrderById(userId: string) {
      const url = `/api/User/GetOrderByUserId/${userId}`;
      return axiosClient.get(url);
    },
 
  };
  
  export default orderApi;
  