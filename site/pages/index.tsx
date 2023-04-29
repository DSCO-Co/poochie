import { Layout } from '@components/common'
import { Guarantees, HeroCarousel, ProductCarousel } from '@components/ui'
import commerce from '@lib/api/commerce'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import JumpingJackets from '@assets/heroes/Jumping-Jackets-Background.jpg'
import SweetSweaters from '@assets/heroes/Sweet-Sweaters-Background.jpg'
import TotallyToys from '@assets/heroes/Totally-Toys-Background.jpg'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

// import useCart from '@framework/cart/use-cart'
// import useCustomer from '@framework/customer/use-customer'

import { useAttributor } from '@lib/hooks'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 12 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const attributor = useAttributor()
  console.log({ attributor });
  console.log({ products });

  // const cart = useCart();
  // const customer = useCustomer();

  // console.log({ cart, customer });

  return (
    <>
      <HeroCarousel
        useTimer
        slides={[
          {
            id: 2,
            image: SweetSweaters,
            alt: 'Spring Sweaters',
            title: 'Spring Sweaters',
            subtitle: 'Shibas Seen Sporting Sweet Spring Sweaters!',
            button: 'Shop Now',
          },
          {
            id: 3,
            image: TotallyToys,
            alt: 'Totally Toys',
            title: 'Totally Toys',
            subtitle: 'Toys for Terriffic Terriers (and more)!',
            button: 'Shop Now',
          },
          {
            id: 1,
            image: JumpingJackets,
            alt: 'Jumping Jackets',
            title: 'Jumping Jackets',
            subtitle: 'Jack Russels Jumping for Joy in New Jackets!',
            button: 'Shop Now',
          },
        ]}
      />

      <ProductCarousel products={products} />
      <Guarantees />
    </>
  )
}

Home.Layout = Layout
