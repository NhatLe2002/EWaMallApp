 type ProductTypes = {
    id: number;
    name: string;
    imgUrl: string;
    price: string;
    address: string;
    sold: number;
    sales: number;
  };
  type ProductCartProps = {

    id: number;
    name: string;
    category: string[];
    imgUrl: string;
    price: string; // Kiểu dữ liệu là string
    description: string;
  };
  type ProductProps = {
 
    id: number;
    name: string;
    category: string;
    imgUrl: string;
    price: string; // Kiểu dữ liệu là string
    description: string;
  };
  type CartProductTypes = {
    id: number;
    nameShop: string;
    products: ProductCartProps[];
  };
  type Industry = {
    industryName: string;
    isActive: boolean;
    level: number;
    isLeaf: boolean;
    path: number;
    parentNodeId: number | null;
    parentNode: any | null; 
    industryDetails: any[]; 
    id: number;
  };
  
  type Seller = {
    shopName: string;
    address: string;
    phoneNumber: string;
    email: string;
    description: string;
    wallet: any | null;
    userId: number;
    user: any | null; 
    products: Product[];
    id: number;
  };
  
  type Product = {
    productName: string;
    productDescription: string;
    coverImageId: string;
    imagesId: string;
    videoId: string;
    industryId: number;
    industry: Industry;
    productSellDetails: any[];
    productSellerDetails: any[]; 
    sellerId: number;
    seller: Seller;
    id: number;
  };
 
  export type {ProductTypes,ProductProps,CartProductTypes,ProductCartProps,Product}