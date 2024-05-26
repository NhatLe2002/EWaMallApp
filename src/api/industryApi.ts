
import axiosClient from './axiosApi';


const industryApi =  {
    getAllIndustry() {
        const url = `/api/Industry/GetAllIndustry`;
        return axiosClient.get(url);
    }
}

export default industryApi;




// const productApi = {
//   getAllProduct() {
//     const url = `/api/Product/GetAllProducts`;
//     return axiosClient.get(url);
//   },
//   getProductById(productId:number){
//     const url =`/api/Product/GetProductById/${productId}`
//     return axiosClient.get(url)
//   },
//   getProductBySellerId(sellerId:number){
//     const url =`/api/Product/GetProductBySellerId/${sellerId}`
//     return axiosClient.get(url)
//   }
// };

// export default productApi;
