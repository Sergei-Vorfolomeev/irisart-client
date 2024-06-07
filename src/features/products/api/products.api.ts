import axios from 'axios'
import { AddProductType, Product } from '@/interfaces/product.interface'
import { GetAllProductsQueryParams } from '@/features/products/types/get-all-products-query-params'

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/products',
  withCredentials: true,
})

export class ProductsApi {
  static async getAllProducts(queryParams: GetAllProductsQueryParams) {
    return instance.get<Product[]>('', { params: queryParams })
  }

  static async addProduct(product: AddProductType) {
    return instance.post<Product>('', product)
  }

  static async deleteProduct(id: string) {
    return instance.delete<void>(`/${id}`)
  }
}
