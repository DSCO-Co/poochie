import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages, { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getPage from '@bigcommerce/storefront-data-hooks/api/operations/get-page'

import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'

import { Layout } from '@components/common'
import { Text } from '@components/ui'

import getSlug from '@lib/get-slug'
import { missingLocaleInPages } from '@lib/usage-warns'
import type {
  GetStaticPathsContext,
  GetStaticPropsContext
} from 'next'
// import type { Page } from '@commerce/types/page'
import { useRouter } from 'next/router'

export async function getStaticProps({
  preview,
  params,
  locale,
  locales,
}: GetStaticPropsContext<{ pages: string[] }>) {

  const config = getConfig({ locale });

  const { categories, brands } = await getSiteInfo({
    config,
    preview,
  });

  const { pages } = await getAllPages({
    config,
    preview,
  });
  const path = params?.pages.join('/')
  const slug = locale ? `${locale}/${path}` : path
  const pageItem = pages.find((p: Page) =>
    p.url ? getSlug(p.url) === slug : false
  )
  const data =
    pageItem &&
    (await getPage({
      variables: { id: pageItem.id! },
      config,
      preview,
    }))

  const page = data?.page

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: { pages, page, categories },
    revalidate: 60 * 60, // Every hour
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const config = { locales }
  const { pages }: { pages: Page[] } = await getAllPages({ config: getConfig({ locale: "en-US" }), })
  const [invalidPaths, log] = missingLocaleInPages()
  const paths = pages
    .map((page) => page.url)
    .filter((url) => {
      if (!url || !locales) return url
      // If there are locales, only include the pages that include one of the available locales
      if (locales.includes(getSlug(url).split('/')[0])) return url

      invalidPaths.push(url)
    })
  log()

  return {
    paths,
    fallback: 'blocking',
  }
}

export default function Pages({ page }: { page: Page }) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <div className="max-w-2xl py-20 mx-8 sm:mx-auto">
      {page?.body && <Text html={page.body} />}
    </div>
  )
}

Pages.Layout = Layout
