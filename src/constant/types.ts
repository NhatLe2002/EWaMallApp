type UserInformation = {
  name: string;
  dateOfBirth: string;
  gender: number;
  address: string;
  imageId: string;
};

type RegisterUser = {
  email: string;
  password: string;
  emailConfirmed: string;
  phoneNumber: string;
  userInformation: UserInformation;
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
  provinceId?: number;
  districtId?: number;
  wardId?: number;
};

type Product = {
  productName: string;
  productDescription: string;
  coverImageId: string;
  imagesId: string;
  videoId: string;
  imageUrls: String[];
  industryId: number;
  industry: Industry;
  productSellDetails: any[];
  productSellerDetails: productSellerDetails[];
  sellerId: number;
  seller: Seller;
  minPrice: number;
  sellerAddress?: String;
  id: number;
};
export type productSellerDetails = {
  name: string
  price: any
  inventory: any
  inventoryNumber: number
  path: string
  parentNodeId: any
  parentNode: any
  localId: number
  productId: number
  feedBacks: any
  carts: any
  id: number
}

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
  userId: number | null;
  totalCost: number | null | undefined;
  shipCost: number | null;
  shipAddressId: number | null;
  createOrderDetailCommands: CreateOrderDetailCommand[] | null;
};
// Address
type ShipAddress = {
  name: string | null;
  address: string | null;
  phoneNumber: string | null;
  isDefault: boolean;
  provinceId: number | null;
  districtId: number | null;
  wardId: number | null;
  id?: number | null;
  userId?: number | null;
  user?: null;
};
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
type Ward = {
  WardCode: number;
  DistrictID: number;
  WardName: string;
};
type ServiceShip = {
  service_id: number;
  short_name: string;
  service_type_id: number;
};
type FeeShip = {
  total: number;
  service_fee: number;
  insurance_fee: number;
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

type OrderAllByUserId = {
  orderCode: string;
  orderDate: string;
  payDate: string;
  shipDate: string;
  totalCost: number;
  shipCost: number;
  cancelDate: any;
  cancelReason: string;
  statusId: number;
  status: Status;
  userId: number;
  user: any;
  shipAddressId: number;
  shipAddress: any;
  voucherId: any;
  voucher: any;
  paymentId: number;
  payment: any;
  orderDetails: OrderDetail[];
  id: number;
};

type Status = {
  name?: string;
  description: string;
  orders?: any[];
  id: number;
};

type OrderDetail = {
  quantity: number;
  productSellDetailId: number;
  productSellDetail: ProductSellDetailOrder;
  id: number;
};
type ProductSellDetailOrder = {
  name: string;
  price: number;
  inventory: any;
  inventoryNumber: number;
  path: string;
  parentNodeId: any;
  parentNode: any;
  localId: number;
  productId: number;
  product: Product;
  feedBacks: any;
  carts: any;
  id: number;
};

type OrderList = {
  orderCode: string;
  totalCost: number;
  shipCost: number;
  statusId: number;
  shipAddressId: number;
  voucherId: number;
  paymentId: number;
  createOrderDetailCommands: [
    {
      quantity: number;
      productSellDetailId: number;
    },
    {
      quantity: number;
      productSellDetailId: number;
    },
  ];
};

export type {
  CreateOrderDetailCommand,
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
  ShipAddress,
  Province,
  District,
  CreateOrderRequest,
  Ward,
  Seller,
  ServiceShip,
  OrderList,
  FeeShip,
  OrderAllByUserId,
  Status,
  RegisterUser,
};
