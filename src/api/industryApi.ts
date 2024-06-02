import axiosClient from './axiosApi';


const industryApi = {
  getAllIndustry() {
    const url = `/api/Industry/GetAllIndustry`;
    return axiosClient.get(url);
  },
  getAllSubIndustryById(industryId:number){
    const url =`/api/Industry/GetAllSubIndustry/${industryId}`
    return axiosClient.get(url)
  },
  getIndustryById(industryId:number){
    const url =`/api/Industry/GetIndustryById/${industryId}`
    return axiosClient.get(url)
  },
};

export default industryApi;
