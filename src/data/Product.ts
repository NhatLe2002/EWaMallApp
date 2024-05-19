type ProductProps = {
  id: number;
  name: string;
  category: string;
  imgUrl: string;
  price: string; // Kiểu dữ liệu là string
  description: string;
};

type ProductTypes = {
  id: number;
  name: string;
  imgUrl: string;
  price: string;
  address: string;
  sold: number;
  sales: number;
};
const formatPriceToVND = (price: string): string => {
  const numberPrice = parseInt(price); // Chuyển đổi giá từ string thành number
  return numberPrice.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }); // Định dạng giá thành tiền tệ VND
};
const productList: ProductTypes[] = [
  {
    id: 1,
    name: 'Sản phẩm 1 Sản phẩm 1 Sản phẩm 1 Sản phẩm 1 Sản phẩm 1',
    imgUrl: 'https://picsum.photos/200/300?random=1',
    price: '100000',
    address: 'TP. Hồ Chí Minh',
    sold: 23,
    sales: 99,
  },
  {
    id: 2,
    name: 'Sản phẩm 2',

    imgUrl: 'https://picsum.photos/200/300?random=2',
    price: '500000',
    address: 'TP. Hồ Chí Minh',
    sold: 23,
    sales: 99,
  },
  {
    id: 3,
    name: 'Sản phẩm 3',

    imgUrl: 'https://picsum.photos/200/300?random=3',
    price: '20000000',
    address: 'Mô tả sản phẩm 3',
    sold: 23,
    sales: 99,
  },
  {
    id: 4,
    name: 'Sản phẩm 4',

    imgUrl: 'https://picsum.photos/200/300?random=2',
    price: '1000000',
    address: 'Mô tả sản phẩm 4',
    sold: 23,
    sales: 99,
  },
  {
    id: 5,
    name: 'Sản phẩm 5',

    imgUrl: 'https://picsum.photos/200/300?random=3',
    price: '30',
    address: 'Mô tả sản phẩm 5',
    sold: 23,
    sales: 99,
  },
  {
    id: 6,
    name: 'Sản phẩm 6',

    imgUrl: 'https://picsum.photos/200/300?random=3',
    price: '30',
    address: 'Mô tả sản phẩm 6',
    sold: 23,
    sales: 99,
  },
];
const products: ProductProps[] = [
  {
    id: 1,
    name: 'Sản phẩm 1',
    category: 'A',
    imgUrl: 'https://picsum.photos/200/300?random=1',
    price: '100000',
    description: 'Mô tả sản phẩm 1',
  },
  {
    id: 2,
    name: 'Sản phẩm 2',
    category: 'B',
    imgUrl: 'https://picsum.photos/200/300?random=2',
    price: '500000',
    description: 'Mô tả sản phẩm 2',
  },
  {
    id: 3,
    name: 'Sản phẩm 3',
    category: 'A',
    imgUrl: 'https://picsum.photos/200/300?random=3',
    price: '20000000',
    description: 'Mô tả sản phẩm 3',
  },
  {
    id: 4,
    name: 'Sản phẩm 4',
    category: 'B',
    imgUrl: 'https://picsum.photos/200/300?random=2',
    price: '1000000',
    description: 'Mô tả sản phẩm 4',
  },
  {
    id: 5,
    name: 'Sản phẩm 5',
    category: 'A',
    imgUrl: 'https://picsum.photos/200/300?random=3',
    price: '30',
    description: 'Mô tả sản phẩm 5',
  },
];

// Tạo một mảng mới với giá sản phẩm đã được định dạng thành tiền tệ VND
export const productsFormatted: ProductProps[] = products.map(product => ({
  ...product,
  price: formatPriceToVND(product.price), // Gọi hàm định dạng giá
}));
export const productsListFormatted: ProductTypes[] = productList.map(
  product => ({
    ...product,
    price: formatPriceToVND(product.price), // Gọi hàm định dạng giá
  }),
);
