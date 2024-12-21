import axios from 'axios'
import { Paginator } from '@/interfaces/product.interface'
import {
  Article,
  GetAllArticlesQueryParams,
} from '@/interfaces/article.interface'

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/posts',
  withCredentials: true,
})

export class ArticlesApi {
  static async getAllArticles(queryParams: GetAllArticlesQueryParams) {
    return instance.get<Paginator<Article[]>>('', { params: queryParams })
  }

  // static async addProduct(article: ProductRequestType) {
  //   return instance.post<Article>('', product)
  // }
  //
  // static async updateProduct(id: string, product: ProductRequestType) {
  //   return instance.put<void>(`/${id}`, product)
  // }
  //
  // static async deleteProduct(id: string) {
  //   return instance.delete<void>(`/${id}`)
  // }
}
