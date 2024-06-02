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

type Industry = {
  industryName: string;
  isActive: boolean;
  level: number;
  isLeaf: boolean;
  path: number;
  parentNodeId: number | null;
  parentNode: Industry | null;
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
  imageUrl: String;
  industryId: number;
  industry: Industry;
  productSellDetails: any[];
  productSellerDetails: any[];
  sellerId: number;
  seller: Seller;
  minPrice: number;
  sellerAddress: String;
  id: number;
};
// cart
type CartProductTypes = {
  sellerId: number;
  sellerName: string;
  products: Cart[];
};
type Cart = {
  quantity: number;
  name: string;
  cost: number;
  productName: string;
  sellerName?: string;
  coverImageId: string;
  sellerId?: number;
  cartId: number;
  nameProductSellDetail: string;
  productSellDetailId: number;
};
type UpdateCartDetail = {
  quantity: number;
  userId: number;
  user: any | null;
  sellDetailId: number;
  sellDetail: any | null;
  id: number;
};
type ProductAddToCart = {
  quantity: number;
  userId: number;
  sellDetailId: number;
};
type CreateOrderDetailCommand = {
  quantity: number;
  productSellDetailId: number;
};

type CreateOrderRequest = {
  userId: number;
  orderCode: string;
  totalCost: number;
  shipCost: number;
  statusId: number;
  shipAddressId: number;
  voucherId: number;
  paymentId: number;
  createOrderDetailCommands: CreateOrderDetailCommand[];
};
// Address
type Province = {
  ProvinceID: number;
  ProvinceName: string;
  // CountryID: number;
  // Code: string;
  // NameExtension: string[];
  // IsEnable: number;
  // RegionID: number;
  // RegionCPN: number;
  // UpdatedBy: number;
  // CreatedAt: string;
  // UpdatedAt: string;
  // CanUpdateCOD: boolean;
  // Status: number;
};
type District = {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
};
type ProductSellDetail = {
  productId: string;
  detailId: string;
  description: string;
};

type ProductSellCommand = {
  name: string;
  price: string;
  inventoryNumber: string;
  path: string;
  parentNodeId: string;
};

type CreateProduct = {
  productName: string;
  productDescription: string;
  coverImageId: string;
  imagesId: string;
  videoId: string;
  industryId: string;
  sellerId: string;
  productSellDetails: ProductSellDetail[];
  productSellCommand: ProductSellCommand[];
};

export type {
  ProductTypes,
  ProductProps,
  CartProductTypes,
  ProductCartProps,
  Cart,
  Product,
  Industry,
  CreateProduct,
  UpdateCartDetail,
  ProductAddToCart,
  Province,
  District,
  CreateOrderRequest,
};
