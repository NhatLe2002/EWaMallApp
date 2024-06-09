import { ProductSellCommand } from "./productSellCommand"
import { ProductSellDetail } from "./productSellDetail"

type Product = {
  productName: string
  productDescription: string
  imageUrls: string[];
  coverImageId: string
  imagesId: string
  videoId: string
  industryId: number
  industry: any
  productSellDetails: any[]
  productSellerDetails: any[]
  productStatus: number
  minPrice: number
  sellerId: number
  seller: any
  id: number
}

type ProductCreate = {
  productName: string
  productDescription: string
  coverImageId: string
  imagesId: string
  videoId: string
  industryId: string
  sellerId: string
  productSellDetails: ProductSellDetail[]
  productSellCommand: ProductSellCommand[]
}


export type { Product, ProductCreate }