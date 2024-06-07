import axios from 'axios';

import { ADDRESSURL, APIURL, FEEURL } from './constant_api';


 const axiosClient = axios.create({
  baseURL: APIURL,
});

 const axiosAddress = axios.create({
  baseURL: ADDRESSURL,
});
 const axiosFee = axios.create({
  baseURL: FEEURL,
});
axiosAddress.defaults.headers.common['token'] = 'c07940d0-1c39-11ef-a834-92c5c8e2c58a';

// axiosClient.interceptors.request.use(
//   (config) => {
//     const accessToken = /* Lấy access token từ nơi bạn lưu trữ, ví dụ: localStorage.getItem('accessToken') */;
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { axiosAddress,axiosClient,axiosFee };