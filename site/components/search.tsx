import type { SearchPropsType } from '@lib/search-props'


import { Layout } from '@components/common'
import {
  Container,
  ConnectedSortBy,
  ConnectedPagination,
  ConnectedRefinementList,
} from '@components/ui'

import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Configure,
  SearchBox,
} from 'react-instantsearch-dom'
import { ConnectedProducts } from './search/ConnectedProducts'

export default function Search({
  algoliaAppId,
  algoliaSearchOnlyKey,
}: SearchPropsType) {

  const searchClient = algoliasearch(algoliaAppId!, algoliaSearchOnlyKey!)

  

  return (
    <InstantSearch searchClient={searchClient} indexName="Products">
      <Configure hitsPerPage={12} />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 mb-20">
          {/* Algolia search bar */}

          {/* <div className="col-span-full text-center py-6">
            <SearchBox/>
          </div> */}

          <div className="sticky top-0 lg:top-32 max-h-screen overflow-auto col-span-8 lg:col-span-2 order-1 lg:order-none">
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Categories</h3>
                <ConnectedRefinementList attribute="category"  limit={5}/>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Brands</h3>
                <ConnectedRefinementList attribute="brandName" />
              </div>
            </div>
          </div>

          {/* Products */}

          <ConnectedProducts/>

          {/* Sort */}
          <div className="sticky top-0 lg:top-32 max-h-screen overflow-auto col-span-8 lg:col-span-2 order-2 lg:order-none">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Sort by</h3>
              <ConnectedSortBy
                defaultRefinement="Products"
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
    </InstantSearch>
  )
}

Search.Layout = Layout
