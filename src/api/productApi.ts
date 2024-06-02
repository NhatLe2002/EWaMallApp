import axiosClient from './axiosApi';


const productApi = {
  getAllProduct() {
    const url = `/api/Product/GetAllProducts`;
    return axiosClient.get(url);
  },
  getProductById(productId:number){
    const url =`/api/Product/GetProductById/${productId}`
    return axiosClient.get(url)
  },
  getProductBySearch(searchValue:string){
    const url =`/api/Product/GetAllProductsBySearch`
    return axiosClient.post(url,{
      searchValue : searchValue
    })
  }
};

export default productApi;
