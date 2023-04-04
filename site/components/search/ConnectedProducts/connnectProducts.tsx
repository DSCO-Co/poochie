import cn from 'clsx'
import type { ProductsPropsType } from '@lib/products-props'
import { useState } from 'react'
import { useRouter } from 'next/router'

import type { Brand } from '@commerce/types/site'
import type { Product } from '@commerce/types/product'

import { ProductCard } from '@components/product'
import { Skeleton } from '@components/ui'

import useSearch from '@framework/product/use-search'
import rangeMap from '@lib/range-map'

import { connectHits } from '@components/common'

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'

import ErrorMessage from '../../ui/ErrorMessage'

interface ProductsProps extends ProductsPropsType {
  hits: any
}

const ProductsComponent = ({
  hits, // Receive hits (products) from Algolia via the connector
  categories,
  brands,
}: ProductsProps) => {


  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query

  const { pathname, category, brand } = useSearchMeta(asPath)

  const activeCategory = categories.find((cat: any) => cat.slug === category)
  const activeBrand = brands.find((b: Brand) => b.slug === brand)

  const { data, error } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.id,
    brandId: activeBrand?.id,
    sort: typeof sort === 'string' ? sort : '',
    locale,
  })

  if (error) {
    return <ErrorMessage error={error} />
  }


  return (
    <div className="col-span-8 order-3 lg:order-none">
      {(q || activeCategory || activeBrand) && (
        <div className="mb-12 transition ease-in duration-75">
          {data ? (
            <>
              <span
                className={cn('animated', {
                  fadeIn: data.found,
                  hidden: !data.found,
                })}
              >
                Showing {hits.length} results{' '}
                {q && (
                  <>
                    for "<strong>{q}</strong>"
                  </>
                )}
              </span>
              <span
                className={cn('animated', {
                  fadeIn: !data.found,
                  hidden: data.found,
                })}
              >
                {q ? (
                  <>
                    There are no products that match "<strong>{q}</strong>"
                  </>
                ) : (
                  <>There are no products that match the selected category.</>
                )}
              </span>
            </>
          ) : q ? (
            <>
              Searching for: "<strong>{q}</strong>"
            </>
          ) : (
            <>Searching...</>
          )}
        </div>
      )}
      {data && hits ? (
        <div
          className="grid grid-cols-1
        gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hits.map((product: Product) => (
            <ProductCard
              variant="algolia-stylized"
              key={product.path}
              className="animated fadeIn"
              product={product}
              imgProps={{
                width: 480,
                height: 480,
                alt: product.name,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rangeMap(12, (i) => (
            <Skeleton key={i}>
              <div className="w-60 h-60" />
            </Skeleton>
          ))}
        </div>
      )}
    </div>
  )
}

const ConnectedProducts = connectHits(ProductsComponent)
export default ConnectedProducts
