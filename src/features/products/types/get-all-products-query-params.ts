import { ProductsCategory } from '@/interfaces/product.interface'

export type GetAllProductsQueryParams = {
  term?: string
  category?: ProductsCategory
  limit?: number
  offset?: number
}
