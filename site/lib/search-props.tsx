import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'

export async function getSearchStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 50 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })

  const algoliaSearchOnlyKey = process.env.ALGOLIA_SEARCH_ONLY_API_KEY
  const algoliaAppId = process.env.ALGOLIA_APP_ID

  console.log({ algoliaAppId })

  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
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
