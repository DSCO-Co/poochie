import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'

export async function getProductsStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { categories, brands } = await siteInfoPromise
  return {
    props: {
      categories,
      brands,
    },
    revalidate: 200,
  }
}

export type ProductsPropsType = InferGetStaticPropsType<
  typeof getProductsStaticProps
>
