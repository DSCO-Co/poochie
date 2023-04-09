import type { ProductsPropsType } from '@lib/products-props'

import type { Product as CommerceProduct } from '@commerce/types/product'

import { AlgoliaProductCard } from '@components/product'
import { Skeleton } from '@components/ui'

import rangeMap from '@lib/range-map'

import { useHits } from 'react-instantsearch-hooks-web'

const ConnectedProducts = () => {
  const { hits } = useHits()

  const algoliaHitToProduct = (hit: any): CommerceProduct => {
    return {
      id: hit.ProductID,
      name: hit.productName,
      description: hit.description,
      images: hit.images,
      path: hit.path,
      slug: hit.slug,
      price: hit.price,
      options: hit.options,
      variants: hit.variants,
    }
  }

  return (
    <div className="col-span-8 order-3 lg:order-none">
      {hits ? (
        <div
          className="grid grid-cols-1
        gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hits.map((hit: any) => {
            const product: CommerceProduct = algoliaHitToProduct(hit)

            return (
              <AlgoliaProductCard
                key={product.path}
                className="animated fadeIn"
                product={product}
                imgProps={{
                  width: 480,
                  height: 480,
                  alt: product.name,
                }}
              />
            )
          })}
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
export default ConnectedProducts
