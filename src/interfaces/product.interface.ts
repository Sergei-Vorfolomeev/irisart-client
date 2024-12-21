export interface Product {
  id: string
  category: ProductsCategory
  name: string
  description: string
  price: number
  image?: string
  inStock: boolean
  createdAt: Date
  updatedAt: Date
  // discount: number
}

export enum ProductsCategory {
  all = 'all',
  painting = 'painting',
  ceramics = 'ceramics',
}

export type ProductRequestType = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>

export type Paginator<T> = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: T
}

export type GetAllProductsQueryParams = {
  term?: string
  category?: ProductsCategory
  limit?: number
  offset?: number
}
