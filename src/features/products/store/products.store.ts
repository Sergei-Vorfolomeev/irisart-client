import { createStore } from 'zustand/vanilla'
import { devtools, persist } from 'zustand/middleware'
import { useAppStore } from '@/store/app.store'
import { ProductRequestType, Product } from '@/interfaces/product.interface'
import { Code, InterLayerObject } from '@/utils/inter-layer-object'
import { GetAllProductsQueryParams } from '@/features/products/types/get-all-products-query-params'
import { ProductsApi } from '@/features/products/api/products.api'
import { handleServerError } from '@/utils/handle-server-error'

export type ProductsState = {
  products: Product[]
  isLoading: boolean
}

export type ProductsActions = {
  getAllProducts: (
    queryParams: GetAllProductsQueryParams,
  ) => Promise<InterLayerObject>
  addProduct: (product: ProductRequestType) => Promise<InterLayerObject>
  updateProduct: (
    id: string,
    product: ProductRequestType,
  ) => Promise<InterLayerObject>
  deleteProduct: (productId: string) => Promise<InterLayerObject>
}

export type ProductsStore = ProductsState & ProductsActions

const defaultInitState: ProductsState = {
  products: [],
  isLoading: false,
}

export const createProductsStore = (
  initState: ProductsState = defaultInitState,
) => {
  const setError = useAppStore.getState().setError
  return createStore<ProductsStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          getAllProducts: async (
            queryParams: GetAllProductsQueryParams = {},
          ): Promise<InterLayerObject> => {
            set({ isLoading: true })
            try {
              const res = await ProductsApi.getAllProducts(queryParams)
              set({ products: res.data })
              return new InterLayerObject(Code.ok, null)
            } catch (e) {
              return handleServerError(setError, e)
            } finally {
              set({ isLoading: false })
            }
          },
          addProduct: async (product: ProductRequestType) => {
            set({ isLoading: true })
            try {
              await ProductsApi.addProduct(product)
              // const res = await ProductsApi.getAllProducts({})
              // set({ products: res.data })
              return new InterLayerObject(Code.ok)
            } catch (e) {
              return handleServerError(setError, e)
            } finally {
              set({ isLoading: false })
            }
          },
          updateProduct: async (
            id: string,
            product: ProductRequestType,
          ): Promise<InterLayerObject> => {
            set({ isLoading: true })
            try {
              await ProductsApi.updateProduct(id, product)
              const res = await ProductsApi.getAllProducts({})
              set({ products: res.data })
              return new InterLayerObject(Code.ok)
            } catch (e) {
              return handleServerError(setError, e)
            } finally {
              set({ isLoading: false })
            }
          },
          deleteProduct: async (productId: string) => {
            set({ isLoading: true })
            try {
              await ProductsApi.deleteProduct(productId)
              const res = await ProductsApi.getAllProducts({})
              set({ products: res.data })
              return new InterLayerObject(Code.ok)
            } catch (e) {
              return handleServerError(setError, e)
            } finally {
              set({ isLoading: false })
            }
          },
        }),
        { name: 'productsStorage' },
      ),
    ),
  )
}
