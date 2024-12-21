export interface Article {
  id: string
  theme?: string
  title: string
  description: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface GetAllArticlesQueryParams {
  title?: string
  theme?: string
  pageNumber?: number
  pageSize?: number
}
