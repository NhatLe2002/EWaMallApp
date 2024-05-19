import axios from 'axios';

import {APIURL} from './constant_api';
import storageService from './storageService';

const accessToken = storageService.getAccessToken() || undefined;

const axiosClient = axios.create({
  baseURL: APIURL,
});
axiosClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
export default axiosClient;
