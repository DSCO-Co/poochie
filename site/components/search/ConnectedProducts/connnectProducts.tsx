import type { ProductsPropsType } from '@lib/products-props'

import type { Product as CommerceProduct } from '@commerce/types/product'

import { AlgoliaProductCard } from '@components/product'
import { Skeleton } from '@components/ui'

import rangeMap from '@lib/range-map'

import { useHits } from 'react-instantsearch-hooks-web'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { trackProductListViewed } from '@Segment/segmentAnalytics'


function useStabilize(value, delay) {
  const [stabilizedValue, setStabilizedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setStabilizedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return stabilizedValue;
}

const ConnectedProducts = () => {

  const { hits } = useHits();
  const router = useRouter();
  const collection = router.asPath.split('collections/')[1];

  // Stabilize hits with a 1000ms delay
  const stableProducts = useStabilize(hits, 1000);

  useEffect(() => {
    if (stableProducts) {
      const products: CommerceProduct[] = hits.map((hit: any) =>
        algoliaHitToProduct(hit)
      );

      const category = collection ? collection : "All";
      console.log('Tracking products viewed: ', products, "Category: ", category);
      trackProductListViewed(products, category);
    }
  }, [stableProducts]);

  const algoliaHitToProduct = (hit: any): CommerceProduct => {
    return {
      id: hit.ProductID,
      sku: hit.sku,
      name: hit.productName,
      brand: hit.brandName,
      category: hit.categories,
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
          className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hits.map((hit: any) => {
            const product: CommerceProduct = algoliaHitToProduct(hit)

            return (
              <AlgoliaProductCard
                key={product.path}
                className="animated fadeIn"
                product={product}
              />
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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