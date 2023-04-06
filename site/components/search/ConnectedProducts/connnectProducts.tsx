import type { ProductsPropsType } from '@lib/products-props'

import type { Product } from '@commerce/types/product'

import { AlgoliaProductCard } from '@components/product'
import { Skeleton } from '@components/ui'

import rangeMap from '@lib/range-map'

import { connectHits } from '@components/common'


interface ProductsProps extends ProductsPropsType {
  hits: any
}

const ProductsComponent = ({
  hits, // Receive hits (products) from Algolia via the connector
}: ProductsProps) => {

  return (
    <div className="col-span-8 order-3 lg:order-none">
      { hits ? (
        <div
          className="grid grid-cols-1
        gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hits.map((product: Product) => (
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
