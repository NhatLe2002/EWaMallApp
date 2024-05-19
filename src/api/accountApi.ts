import axiosClient from './axiosApi';

const accountApi = {
  login(param: String) {
    const url = 'linkapi';
    return axiosClient.post(url, param);
  },
};

export default accountApi;
