import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

// import commerce from '@lib/api/commerce'
import { getConfig } from '@lib/data-hooks/api'
import getAllPages from '@lib/data-hooks/api/operations/get-all-pages'
import getAllProducts from '@lib/data-hooks/api/operations/get-all-products'
import getSiteInfo from '@lib/data-hooks/api/operations/get-site-info'

export async function getSearchStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {

  const config = getConfig({ locale });

  const productsPromise = getAllProducts({
    variables: { first: 50 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })

  const algoliaSearchOnlyKey = process.env.ALGOLIA_SEARCH_ONLY_API_KEY
  const algoliaAppId = process.env.ALGOLIA_APP_ID

  const pagesPromise = getAllPages({ config, preview })
  const siteInfoPromise = getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { products } = await productsPromise
  const { categories, brands } = await siteInfoPromise
  return {
    props: {
      pages,
      products,
      categories,
      brands,
      algoliaSearchOnlyKey,
      algoliaAppId,
    },
    revalidate: 200,
  }
}

export type SearchPropsType = InferGetStaticPropsType<
  typeof getSearchStaticProps
>
