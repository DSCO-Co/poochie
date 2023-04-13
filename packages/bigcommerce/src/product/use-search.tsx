import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import type {
  SearchProductsBody,
  Product,
} from '@vercel/commerce/types/product'

export interface ExtendedSearchProductsBody extends SearchProductsBody {
  /**
   * The page number to fetch.
   */
  page?: number
  /**
   * The number of items per page.
   */
  itemsPerPage?: number
}

/**
 * Fetches a list of products based on the given search criteria.
 */
export type SearchProductsHook = {
  data: {
    /**
     * List of products matching the query.
     */
    products: Product[]
    /**
     * Indicates if there are any products matching the query.
     */
    found: boolean
  }
  body: ExtendedSearchProductsBody
  input: ExtendedSearchProductsBody
  fetcherInput: ExtendedSearchProductsBody
}

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: string
  brandId?: string
  sort?: string
  locale?: string
  page?: number
  itemsPerPage?: number
}

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    url: '/api/commerce/catalog/products',
    method: 'GET',
  },
  fetcher({
    input: { search, categoryId, brandId, sort, page, itemsPerPage },
    options,
    fetch,
  }) {
    // Use a dummy base as we only care about the relative path
    const url = new URL(options.url!, 'http://a')

    if (search) url.searchParams.set('search', search)
    if (Number.isInteger(Number(categoryId)))
      url.searchParams.set('categoryId', String(categoryId))
    if (Number.isInteger(Number(brandId)))
      url.searchParams.set('brandId', String(brandId))
    if (sort) url.searchParams.set('sort', sort)
    if (page) url.searchParams.set('page', String(page))
    if (itemsPerPage) url.searchParams.set('itemsPerPage', String(itemsPerPage))

    return fetch({
      url: url.pathname + url.search,
      method: options.method,
    })
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
          ['page', input.page],
          ['itemsPerPage', input.itemsPerPage],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
