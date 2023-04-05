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
} from 'react-instantsearch-dom'
import { ConnectedProducts } from './search/ConnectedProducts'

export default function Search({
  categories,
  brands,
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
                <ConnectedRefinementList attribute="category" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Brands</h3>
                <ConnectedRefinementList attribute="brandName" />
              </div>
            </div>
          </div>

          {/* Products */}

          <ConnectedProducts
            categories={categories}
            brands={brands}
          />

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

/* <div className="sticky top-0 lg:top-32 max-h-screen overflow-auto col-span-8 lg:col-span-2 order-1 lg:order-none">


            <div className="relative inline-block w-full">
              <div className="lg:hidden">
                <span className="rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={(e) => handleClick(e, 'categories')}
                    className="flex justify-between w-full rounded-sm border border-accent-3 px-4 py-3 bg-accent-0 text-sm leading-5 font-medium text-accent-4 hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8 transition ease-in-out duration-150"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {activeCategory?.name
                      ? `Category: ${activeCategory?.name}`
                      : 'All Categories'}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div
                className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${
                  activeFilter !== 'categories' || toggleFilter !== true
                    ? 'hidden'
                    : ''
                }`}
              >
                <div className="rounded-sm bg-accent-0 shadow-xs lg:bg-none lg:shadow-none">
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <ul>
                      <li
                        className={cn(
                          'block text-sm leading-5 text-accent-4 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                          {
                            underline: !activeCategory?.name,
                          }
                        )}
                      >
                        <Link
                          href={{ pathname: getCategoryPath('', brand), query }}
                          legacyBehavior
                        >
                          <a
                            onClick={(e) => handleClick(e, 'categories')}
                            className={
                              'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                            }
                          >
                            All Categories
                          </a>
                        </Link>
                      </li>
                      {categories.map((cat: any) => (
                        <li
                          key={cat.path}
                          className={cn(
                            'block text-sm leading-5 text-accent-4 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                            {
                              underline: activeCategory?.id === cat.id,
                            }
                          )}
                        >
                          <Link
                            href={{
                              pathname: getCategoryPath(cat.path, brand),
                              query,
                            }}
                            legacyBehavior
                          >
                            <a
                              onClick={(e) => handleClick(e, 'categories')}
                              className={
                                'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                              }
                            >
                              {cat.name}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>


            <div className="relative inline-block w-full">

              <div className="lg:hidden mt-3">
                <span className="rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={(e) => handleClick(e, 'brands')}
                    className="flex justify-between w-full rounded-sm border border-accent-3 px-4 py-3 bg-accent-0 text-sm leading-5 font-medium text-accent-8 hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8 transition ease-in-out duration-150"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {activeBrand?.name
                      ? `Design: ${activeBrand?.name}`
                      : 'All Designs'}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div
                className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${
                  activeFilter !== 'brands' || toggleFilter !== true
                    ? 'hidden'
                    : ''
                }`}
              >
                <div className="rounded-sm bg-accent-0 shadow-xs lg:bg-none lg:shadow-none">
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <ul>
                      <li
                        className={cn(
                          'block text-sm leading-5 text-accent-4 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                          {
                            underline: !activeBrand?.name,
                          }
                        )}
                      >
                        <Link
                          href={{
                            pathname: getDesignerPath('', category),
                            query,
                          }}
                          legacyBehavior
                        >
                          <a
                            onClick={(e) => handleClick(e, 'brands')}
                            className={
                              'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                            }
                          >
                            All Designers
                          </a>
                        </Link>
                      </li>
                      {brands.map(({ path, name, id }: Brand) => (
                        <li
                          key={path}
                          className={cn(
                            'block text-sm leading-5 text-accent-4 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                            {
                              underline: activeBrand?.id === id,
                            }
                          )}
                        >
                          <Link
                            href={{
                              pathname: getDesignerPath(path, category),
                              query,
                            }}
                            legacyBehavior
                          >
                            <a
                              onClick={(e) => handleClick(e, 'brands')}
                              className={
                                'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                              }
                            >
                              {name}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */
