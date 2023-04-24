import type { SearchPropsType } from '@lib/search-props'
import { useRouter } from 'next/router'

import { Layout } from '@components/common'
import {
  ConnectedPagination,
  ConnectedRefinementList,
  ConnectedSortBy,
  Container,
  CustomHierarchicalMenu,
} from '@components/ui'

import { Button } from '@components/ui'
import { Menu as HeadlessMenu } from '@headlessui/react'
import { Configure } from 'react-instantsearch-hooks-web'
import { ConnectedProducts } from './search/ConnectedProducts'

export default function Search({}: SearchPropsType) {
  const router = useRouter()
  const initial = router.asPath.split('collections/')[1]

  return (
    <Container>
      <Configure hitsPerPage={12} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 mb-20">
        {/* Algolia search bar */}

        {/* <div className="col-span-full text-center py-6">
            <SearchBox/>
          </div> */}

        <div className="hidden lg:block lg:sticky top-0 lg:top-32 max-h-screen overflow-auto col-span-8 lg:col-span-2 order-1 lg:order-none">
          <div>
            {/* <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Categories</h3>
              <ConnectedRefinementList
                attribute="category"
                limit={100}
                initial={initial}
              />
            </div> */}

            <h3 className="text-lg font-medium mb-2">Categories</h3>
            <CustomHierarchicalMenu
              attributes={['categories.lvl0', 'categories.lvl1']}
              limit={40}
            />

            <div>
              <h3 className="text-lg font-medium mb-2 mt-2">Brands</h3>
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
    <HeadlessMenu.Button>
      <Button>Filter</Button>
    </HeadlessMenu.Button>
    <HeadlessMenu.Items className="bg-white w-full">
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="col-span-1">
          <h3 className="text-lg font-medium mb-2">Categories</h3>
          <CustomHierarchicalMenu
            attributes={['categories.lvl0', 'categories.lvl1']}
            limit={40}
          />
          <h3 className="text-lg font-medium mb-2 mt-2">Brands</h3>
          <ConnectedRefinementList
            attribute="brandName"
            limit={100}
            initial={initial}
          />
        </div>
        <div className="col-span-1 col-start-3">
          <h3 className="text-lg font-medium mb-2">Sort by</h3>
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
        <div className="sticky top-0 lg:top-32 max-h-screen overflow-auto col-span-8 lg:col-span-2 order-2 lg:order-none">
          <div className="mb-6 hidden lg:block">
            <h3 className="text-lg font-medium mb-2">Sort by</h3>
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
