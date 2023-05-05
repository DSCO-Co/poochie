import type { ProductsPropsType } from '@lib/products-props'

import type { Product, ProductOption } from '@commerce/types/product'

import { AlgoliaProductCard } from '@components/product'
import { Skeleton } from '@components/ui'

import rangeMap from '@lib/range-map'

import { useHits } from 'react-instantsearch-hooks-web'
import { useEffect, useRef, useState } from 'react'


const ConnectedProducts = ({setProducts}) => {

  const { hits } = useHits();

  //Pass the products via the setProducts State Hook. 
  useEffect(() => {
      const products: Product[] = hits.map((hit: any) =>algoliaHitToProduct(hit));
      setProducts(products); 
  }, [hits]);

  const algoliaHitToProduct = (hit: any): Product => {
    return {
      id: hit.objectId,
      sku: hit.sku,
      name: hit.name,
      brand: hit.brand,
      category: hit.categories,
      description: hit.description,
      images: hit.images,
      path: hit.path,
      slug: hit.slug,
      price: hit.price,
      options: variantsToOptions(hit.variants),
      variants: hit.variants,
    }
  }

  const variantsToOptions = (variants: any[]): ProductOption[] => {
    const productOptions: ProductOption[] = [
      {
        __typename: 'MultipleChoiceOption',
        id: '1',
        displayName: 'Option 1 Size',
        values: [],
      },
      {
        __typename: 'MultipleChoiceOption',
        id: '2',
        displayName: 'Option 2 Size',
        values: [],
      },
    ];
  
    variants.forEach((variant) => {
      if (variant.option_1_size && !productOptions[0].values.includes(variant.option_1_size)) {
        productOptions[0].values.push(variant.option_1_size);
      }
  
      if (variant.option_2_size && !productOptions[1].values.includes(variant.option_2_size)) {
        productOptions[1].values.push(variant.option_2_size);
      }
    });
  
    // Filter out product options with empty values
    const filteredProductOptions = productOptions.filter((option) => option.values.length > 0);
  
    return filteredProductOptions;
  };
  

  return (
    <div className="col-span-8 order-3 lg:order-none">
      {hits ? (
        <div
          className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hits.map((hit: any) => {
            const product: Product = algoliaHitToProduct(hit)

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