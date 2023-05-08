import { Layout } from '@components/common'
import { Text } from '@components/ui'
import { getConfig } from '@lib/data-hooks/api'
import getAllPages from '@lib/data-hooks/api/operations/get-all-pages'
import getSiteInfo from '@lib/data-hooks/api/operations/get-site-info'
import type { GetStaticPropsContext } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = getConfig({ locale });

  const { pages } = await getAllPages({ config, preview })
  const { categories, brands } = await getSiteInfo({ config, preview })
  return {
    props: {
      pages,
      categories,
      brands,
    },
    revalidate: 200,
  }
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl py-20 mx-8 sm:mx-auto fit">
      <Text variant="heading">Not Found</Text>
      <Text className="">
        The requested page doesn't exist or you don't have access to it.
      </Text>
    </div>
  )
}

NotFound.Layout = Layout
