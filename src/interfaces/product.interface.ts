export interface Product {
  id: string
  category: ProductsCategory
  name: string
  description: string
  price: number
  image?: string
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
  // discountPercentage: number
}

export enum ProductsCategory {
  painting = 'painting',
  ceramics = 'ceramics',
}

export type ProductRequestType = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
