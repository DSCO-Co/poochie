import { Layout } from '@components/common'
import {
  ConnectedPagination,
  ConnectedRefinementList,
  ConnectedSortBy,
  Container,
  CustomHierarchicalMenu,
} from '@components/ui'
import type { SearchPropsType } from '@lib/search-props'
import { useRouter } from 'next/router'
import React from 'react'
import { SearchBox } from 'react-instantsearch-hooks-web'

import { Button } from '@components/ui'
import { Menu as HeadlessMenu } from '@headlessui/react'
import { Configure } from 'react-instantsearch-hooks-web'
import { ConnectedProducts } from './search/ConnectedProducts'

export default function Search({ }: SearchPropsType) {
  const router = useRouter()
  // TODO: Fix this @callam - this is why we have the error with links flickering

  const initial = router.asPath.split('collections/')[1]

  return (
    <Container>
      <Configure {...({ hitsPerPage: 12 } as any)} />
      <div className="grid grid-cols-1 gap-4 mt-3 mb-20 lg:grid-cols-12">
        {/* Algolia search bar */}

        <div className="py-6 text-center col-span-full">
          <SearchBox />
        </div>

        <div className="top-0 order-1 hidden max-h-screen col-span-8 overflow-auto lg:block lg:sticky lg:top-32 lg:col-span-2 lg:order-none">
          <div>
            <h3 className="mb-2 text-lg font-medium">Categories</h3>
            <CustomHierarchicalMenu
              attributes={['categories.lvl0', 'categories.lvl1']}
              limit={40}
            />

            <div>
              <h3 className="mt-2 mb-2 text-lg font-medium">Brands</h3>
              <ConnectedRefinementList
                attribute="brandName"
                limit={100}
                initial={initial}
              />
            </div>
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
                  />
                  <h3 className="mt-2 mb-2 text-lg font-medium">Brands</h3>
                  <ConnectedRefinementList
                    attribute="brandName"
                    limit={100}
                    initial={initial}
                  />
                </div>
                <div className="col-span-1 col-start-3">
                  <h3 className="mb-2 text-lg font-medium">Sort by</h3>
                  <ConnectedSortBy
                    items={[
                      { value: 'Products', label: 'Trending' },
                      { value: 'Products_latest', label: 'Latest Arrivals' },
                      {
                        value: 'Products_price_asc',
                        label: 'Price: Low to high',
                      },
                      {
                        value: 'Products_price_desc',
                        label: 'Price: High to Low',
                      },
                    ]}
                  />
                </div>
              </div>
            </HeadlessMenu.Items>
          </HeadlessMenu>
        </div>

        {/* Products */}

        <ConnectedProducts />

        {/* Sort */}
        <div className="sticky top-0 order-2 max-h-screen col-span-8 overflow-auto lg:top-32 lg:col-span-2 lg:order-none">
          <div className="hidden mb-6 lg:block">
            <h3 className="mb-2 text-lg font-medium">Sort by</h3>
            <ConnectedSortBy
              items={[
                { value: 'Products', label: 'Trending' },
                { value: 'Products_latest', label: 'Latest Arrivals' },
                { value: 'Products_price_asc', label: 'Price: Low to high' },
                {
                  value: 'Products_price_desc',
                  label: 'Price: High to Low',
                },
              ]}
            />
          </div>
        </div>
      </div>

      <ConnectedPagination />
    </Container>
  )
}

Search.Layout = Layout
