import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../config/FirbaseConfig';
import { Product } from '../constant/types';

export const listFilesInProductFolder = async (productId: number): Promise<string[]> => {
    const productFolderRef = ref(storage, `products/${productId}/`);
  
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
        const imageUrls = await listFilesInProductFolder(product.id);
        // Lấy URL đầu tiên trong danh sách URL hình ảnh
        const imageUrl = imageUrls.length > 0 ? imageUrls[0] : 'defaultImageUrl';
        return { ...product, imageUrl };
      } catch (error) {
        console.error(`Error updating product with ID ${product.id}:`, error);
        // Trong trường hợp lỗi, trả về sản phẩm ban đầu không thay đổi
        return product;
      }
    }));
  
    return updatedProductList;
  };
  
listFilesInProductFolder(5);
