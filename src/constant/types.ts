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
  
  export type {ProductTypes,ProductProps,CartProductTypes,ProductCartProps}