import { createStore } from 'zustand/vanilla'
import { devtools, persist } from 'zustand/middleware'
import { useAppStore } from '@/store/app.store'
import { Code, InterLayerObject } from '@/utils/inter-layer-object'
import { handleServerError } from '@/utils/handle-server-error'
import {
  Article,
  GetAllArticlesQueryParams,
} from '@/interfaces/article.interface'
import { ArticlesApi } from '@/features/articles/api/articles.api'

export type ArticlesState = {
  articles: Article[]
  page: number
  pageSize: number
  totalCount: number
  isLoading: boolean
}

export type ArticlesActions = {
  getAllArticles: (
    queryParams?: GetAllArticlesQueryParams,
  ) => Promise<InterLayerObject>
  // addProduct: (article: ArticleRequestType) => Promise<InterLayerObject>
  // updateProduct: (
  //   id: string,
  //   product: ProductRequestType,
  // ) => Promise<InterLayerObject>
  // deleteProduct: (productId: string) => Promise<InterLayerObject>
}

export type ArticlesStore = ArticlesState & ArticlesActions

const defaultInitState: ArticlesState = {
  articles: [],
  page: 1,
  pageSize: 10,
  totalCount: 0,
  isLoading: false,
}

export const createArticlesStore = (
  initState: ArticlesState = defaultInitState,
) => {
  const setError = useAppStore.getState().setError
  return createStore<ArticlesStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          getAllArticles: async (
            queryParams: GetAllArticlesQueryParams = {},
          ): Promise<InterLayerObject> => {
            set({ isLoading: true })
            try {
              const res = await ArticlesApi.getAllArticles(queryParams)
              set({
                articles: res.data.items,
                page: res.data.page,
                pageSize: res.data.pageSize,
                totalCount: res.data.totalCount,
              })
              return new InterLayerObject(Code.ok, null)
            } catch (e) {
              return handleServerError(setError, e)
            } finally {
              set({ isLoading: false })
            }
          },
          //   addProduct: async (product: ProductRequestType) => {
          //     set({ isLoading: true })
          //     try {
          //       await ProductsApi.addProduct(product)
          //       // const res = await ProductsApi.getAllProducts({})
          //       // set({
          //       //   products: res.data.items,
          //       //   page: res.data.page,
          //       //   pageSize: res.data.pageSize,
          //       //   totalCount: res.data.totalCount,
          //       // })
          //       return new InterLayerObject(Code.ok)
          //     } catch (e) {
          //       return handleServerError(setError, e)
          //     } finally {
          //       set({ isLoading: false })
          //     }
          //   },
          //   updateProduct: async (
          //     id: string,
          //     product: ProductRequestType,
          //   ): Promise<InterLayerObject> => {
          //     set({ isLoading: true })
          //     try {
          //       await ProductsApi.updateProduct(id, product)
          //       const res = await ProductsApi.getAllProducts({})
          //       // set({
          //       //   products: res.data.items,
          //       //   page: res.data.page,
          //       //   pageSize: res.data.pageSize,
          //       //   totalCount: res.data.totalCount,
          //       // })
          //       return new InterLayerObject(Code.ok)
          //     } catch (e) {
          //       return handleServerError(setError, e)
          //     } finally {
          //       set({ isLoading: false })
          //     }
          //   },
          //   deleteProduct: async (productId: string) => {
          //     set({ isLoading: true })
          //     try {
          //       await ProductsApi.deleteProduct(productId)
          //       // const res = await ProductsApi.getAllProducts({})
          //       // set({
          //       //   products: res.data.items,
          //       //   page: res.data.page,
          //       //   pageSize: res.data.pageSize,
          //       //   totalCount: res.data.totalCount,
          //       // })
          //       return new InterLayerObject(Code.ok)
          //     } catch (e) {
          //       return handleServerError(setError, e)
          //     } finally {
          //       set({ isLoading: false })
          //     }
          //   },
        }),
        { name: 'productsStorage' },
      ),
    ),
  )
}
