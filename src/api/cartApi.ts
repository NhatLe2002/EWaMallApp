
import { CreateOrderRequest } from '../constant/types';
import {axiosClient} from './axiosApi';

const cartApi = {
  getAllCart(userId: string) {
    const url = `/api/User/GetAllCart/${userId}`;
    return axiosClient.get(url);
  },
  addToCart(param: {quantity: number; userId: number; sellDetailId: number}) {
    const url = `/api/User/AddToCart`;
    return axiosClient.post(url, param);
  },
  updateQuantityCart(cartId: number, quantity: number) {
    const url = `/api/User/UpdateQuantityCart/${cartId}?quantity=${quantity}`;
    return axiosClient.post(url);
  },
  createOrder(param: CreateOrderRequest){
    const url = `/api/User/CreateOrder/${param.userId}`;
    return axiosClient.post(url, param);
  }
};

export default cartApi;
