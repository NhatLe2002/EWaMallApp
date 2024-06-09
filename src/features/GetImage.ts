import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../config/FirbaseConfig';
import { Product } from '../constant/types';

export const listFilesInProductFolder = async (imagesId: string): Promise<string[]> => {
    const productFolderRef = ref(storage, `products/${imagesId}/`);
  
    try {
      const listResult = await listAll(productFolderRef);
      const urls: string[] = [];
      for (const itemRef of listResult.items) {
        const url = await getDownloadURL(itemRef);
        urls.push(url);
      }
      return urls;
    } catch (error) {
      console.error('Error listing files in product folder:', error);
      return [];
    }
  };
  export const updateProductListWithImages = async (productList: Product[]) => {
    const updatedProductList = await Promise.all(productList.map(async (product) => {
      try {
        const imageUrls = await listFilesInProductFolder(product.imagesId);
        return { ...product, imageUrls };
      } catch (error) {
        console.error(`Error updating product with ID ${product.imagesId}:`, error);
        // Trong trường hợp lỗi, trả về sản phẩm ban đầu không thay đổi
        return product;
      }
    }));
  
    return updatedProductList;
  };
  
  export const updateProductDetailWithImages = async (product: Product) => {
    try {
      const imageUrls = await listFilesInProductFolder(product.imagesId);

      return { ...product, imageUrls };
    } catch (error) {
      console.error(`Error updating product with ID ${product.imagesId}:`, error);
      // Trong trường hợp lỗi, trả về sản phẩm ban đầu không thay đổi
      return product;
    }
  };
