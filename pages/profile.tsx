import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import type { GetStaticPropsContext } from 'next'


export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = getConfig({ locale });
  const pagesPromise = getAllPages({ config, preview })
  const siteInfoPromise = getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}


export default function Profile() {
  const { data } = useCustomer()
  return (
    <Container className="pt-4">
      <Text variant="pageHeading">My Profile</Text>
      <div className="grid grid-cols-4">
        {data && (
          <div className="flex flex-col divide-y divide-accent-2">
            <div className="flex flex-row items-center py-4 space-x-4">
              <span className="flex-1 text-lg font-medium text-accent-600">
                Full Name
              </span>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
            <div className="flex flex-row items-center py-4 space-x-4">
              <span className="flex-1 text-lg font-medium text-accent-600">
                Email
              </span>
              <span>{data.email}</span>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

Profile.Layout = Layout
