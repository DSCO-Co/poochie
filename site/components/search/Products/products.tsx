
import cn from 'clsx'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import type { Brand } from '@commerce/types/site'
import type { Product } from '@commerce/types/product'

import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Container, Skeleton } from '@components/ui'

import useSearch from '@framework/product/use-search'
import rangeMap from '@lib/range-map'

const SORT = {
  'trending-desc': 'Trending',
  'latest-desc': 'Latest arrivals',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
}

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
import ErrorMessage from '../../ui/ErrorMessage';



export default function Products({categories, brands}: SearchPropsType) {

  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

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

  const handleClick = (event: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  }

    return(
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
                    Showing {data.products.length} results{' '}
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
                      <>
                        There are no products that match the selected category.
                      </>
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
          {data ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.map((product: Product) => (
                <ProductCard
                  variant="simple"
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
          )}{' '}
        </div>
      //   <div className="bg-white">
      //   <div className="mx-auto max-w-7xl overflow-hidden py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      //     <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
      //       {data ? (
      //         data.products.map((product: Product) => {
      //           console.log(product); // log all attributes of product object to console
      //           return (
      //             <a key={product.id} href={product.slug} className="group text-sm">
      //               <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
      //                 <img
      //                   src={product.images[0].url }
      //                   alt={product.name}
      //                   className="h-full w-full object-cover object-center"
      //                 />
      //               </div>
      //               <h3 className="mt-4 font-medium text-gray-900">{product.name}</h3>
      //               <p className="italic text-gray-500">{product.description}</p>
      //               <p className="mt-2 font-medium text-gray-900">{product.name}</p>
      //             </a>
      //           );
      //         })
      //       ) : (
      //         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      //           {rangeMap(12, (i) => (
      //             <Skeleton key={i}>
      //               <div className="w-60 h-60" />
      //             </Skeleton>
      //           ))}
      //         </div>
      //       )}
      
      //     </div>
      //   </div>
      // </div>
      
  )
}