import { Layout } from '@components/common'
import {
  ConnectedPagination,
  ConnectedSortBy,
  Container,
  CustomHierarchicalMenu,
} from '@components/ui'
import type { SearchPropsType } from '@lib/search-props'
import React, {useState}  from 'react'
import { SearchBox, Configure } from 'react-instantsearch-hooks-web'

import { Button } from '@components/ui'
import { Menu as HeadlessMenu } from '@headlessui/react'
import { ConnectedProducts } from './search/ConnectedProducts'

export default function Search({}: SearchPropsType) {

  const [useProducts, setProducts] = useState(null);

  const sortByItems = [
    { value: 'DEVELOPMENT_Products', label: 'Trending' }, 
    { value: 'DEVELOPMENT_Products_price_asc', label: 'Price: Low to high' },
    { value: 'DEVELOPMENT_Products_price_desc', label: 'Price: High to Low',},
  ]
  return (
    <Container>
      <Configure {...({ hitsPerPage: 12 } as any)} />
      <div className="grid grid-cols-1 gap-4 mt-3 mb-20 lg:grid-cols-12">
        {/* Algolia search bar */}

        {/* <div className="py-6 text-center col-span-full">
          <SearchBox />
        </div> */}

        <div className="top-0 order-1 hidden max-h-screen col-span-8 overflow-auto lg:block lg:sticky lg:top-32 lg:col-span-2 lg:order-none">
          <div>
            <h3 className="mb-2 text-lg font-medium">Categories</h3>
            <CustomHierarchicalMenu
              attributes={['categories.lvl0', 'categories.lvl1']}
              limit={40}
              products={useProducts}
            />

            <h3 className="mt-2 mb-2 text-lg font-medium">Brands</h3>
            <CustomHierarchicalMenu attributes={['brand']} 
            limit={40} 
            products={useProducts}
            />
          </div>
        </div>
        {/* Mobile Filter */}
        <div className="block lg:hidden">
          <HeadlessMenu>
            <HeadlessMenu.Button as={React.Fragment}>
              <Button>Filter</Button>
            </HeadlessMenu.Button>
            <HeadlessMenu.Items className="w-full bg-white">
              <div className="grid grid-cols-2 gap-4 p-4">
                <div className="col-span-1">
                  <h3 className="mb-2 text-lg font-medium">Categories</h3>
                  <CustomHierarchicalMenu
                    attributes={['categories.lvl0', 'categories.lvl1']}
                    limit={40}
                    products={useProducts}
                  />
                  <h3 className="mt-2 mb-2 text-lg font-medium">Brands</h3>
                  <CustomHierarchicalMenu
                    attributes={['brand']}
                    limit={100}
                    products={useProducts}
                  />
                </div>
                <div className="col-span-1 col-start-3">
                  <h3 className="mb-2 text-lg font-medium">Sort by</h3>
                  <ConnectedSortBy
                    items={sortByItems}
                  />
                </div>
              </div>
            </HeadlessMenu.Items>
          </HeadlessMenu>
        </div>

        {/* Products */}

        <ConnectedProducts setProducts={setProducts} />

        {/* Sort */}
        <div className="sticky top-0 order-2 max-h-screen col-span-8 overflow-auto lg:top-32 lg:col-span-2 lg:order-none">
          <div className="hidden mb-6 lg:block">
            <h3 className="mb-2 text-lg font-medium">Sort by</h3>
            <ConnectedSortBy
              items={sortByItems}
            />
          </div>
        </div>
      </div>

      <ConnectedPagination />
    </Container>
  )
}

Search.Layout = Layout
