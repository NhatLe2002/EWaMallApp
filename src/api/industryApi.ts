import {axiosClient} from './axiosApi';


const industryApi = {
  getAllIndustry() {
    const url = `/api/Industry/GetAllIndustry`;
    return axiosClient.get(url);
  },

};

export default industryApi;
