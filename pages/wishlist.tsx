import { Layout } from '@components/common'
import { Heart } from '@components/icons'
import { Container, Skeleton, Text } from '@components/ui'
import type { GetStaticPropsContext } from 'next'
// import useCustomer from '@lib/data-hooks/use-customer'
import { WishlistCard } from '@components/wishlist'
import { getConfig } from '@lib/data-hooks/api'
import getAllPages from '@lib/data-hooks/api/operations/get-all-pages'
import getSiteInfo from '@lib/data-hooks/api/operations/get-site-info'
import useWishlist from '@lib/data-hooks/wishlist/use-wishlist'
import rangeMap from '@lib/range-map'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const pagesPromise = getAllPages({ config, preview })
  const siteInfoPromise = getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function Wishlist() {
  // @ts-ignore Shopify - Fix this types
  const { data, isLoading, isEmpty } = useWishlist({
    includeProducts: true,
  })

  return (
    <Container className="pt-4">
      <div className="mb-20">
        <Text variant="pageHeading">My Wishlist</Text>
        <div className="flex flex-col group">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6">
              {rangeMap(4, (i) => (
                <Skeleton key={i}>
                  <div className="w-full h-[279px]" />
                </Skeleton>
              ))}
            </div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center flex-1 px-12 py-24 ">
              <span className="flex items-center justify-center w-16 h-16 p-12 border border-dashed rounded-lg border-secondary bg-primary text-primary">
                <Heart className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                Your wishlist is empty
              </h2>
              <p className="px-10 pt-2 text-center text-accent-6">
                Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 ">
              {data &&
                // @ts-ignore - Wishlist Item Type
                data.items?.map((item) => (
                  <WishlistCard key={item.id} item={item} />
                ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

Wishlist.Layout = Layout
