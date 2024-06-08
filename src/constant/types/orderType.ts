



export type OrderGetBySellerId = {
    orderCode: string
    orderDate: string
    payDate: string
    shipDate: string
    totalCost: number
    shipCost: number
    cancelDate: any
    cancelReason: string
    statusId: number
    status: Status
    userId: number
    user: any
    shipAddressId: number
    shipAddress: any
    voucherId: any
    voucher: any
    paymentId: number
    payment: any
    orderDetails: OrderDetail[]
    id: number
}


type Status = {
    name: string
    description: string
    orders: any[]
    id: number
}

type OrderDetail = {
    quantity: number
    productSellDetailId: number
    productSellDetail: ProductSellDetail
    id: number
}

type ProductSellDetail = {
    name: string
    price: number
    inventory: any
    inventoryNumber: number
    path: string
    parentNodeId: any
    parentNode: any
    localId: number
    productId: number
    product: Product
    feedBacks: any
    carts: any
    id: number
}

type Product = {
    productName: string
    productDescription: string
    coverImageId: string
    imagesId: string
    videoId: string
    industryId: number
    industry: any
    productSellDetails: any[]
    productSellerDetails: any[]
    sellerId: number
    seller: any
    productStatus: number
    id: number
}
