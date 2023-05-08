import { getConfig } from '@lib/data-hooks/api'
import getAllPages from '@lib/data-hooks/api/operations/get-all-pages'
import getAllProducts from '@lib/data-hooks/api/operations/get-all-products'
import getSiteInfo from '@lib/data-hooks/api/operations/get-site-info'

import { Layout } from '@components/common'
import { Guarantees, HeroCarousel, ProductCarousel } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import JumpingJackets from '@assets/heroes/Jumping-Jackets-Background.jpg'
import SweetSweaters from '@assets/heroes/Sweet-Sweaters-Background.jpg'
import TotallyToys from '@assets/heroes/Totally-Toys-Background.jpg'
import { normalizePage } from '@lib/bigcommerce/normalizer'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
// import useCart from '@framework/cart/use-cart'
// import useCustomer from '@framework/customer/use-customer'



import { normalizeProduct } from '@lib/bigcommerce/normalizer'
import { useAttributor } from '@lib/hooks'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {

  // const config = { locale, locales }

  const { products } = await getAllProducts({
    variables: { first: 6 },
    config: getConfig({ locale }),
    preview,
  });

  const { categories, brands } = await getSiteInfo({
    config: getConfig({ locale }),
    preview,
  });

  const { pages } = await getAllPages({
    config: getConfig({ locale }),
    preview,
  });


  return {
    props: {
      products: products.map(({ node }) => normalizeProduct(node)),
      // products,
      categories,
      brands,
      pages: pages.map(normalizePage),
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
            alt: 'Spring Cleaning',
            title: 'Spring Cleaning',
            subtitle: 'Shop our Clearance Sale for Spring Cleaning Savings!',
            button: 'Shop Now',
            link: "/collections/clearance"
          },
          {
            id: 3,
            image: TotallyToys,
            alt: 'Totally Toys',
            title: 'Totally Toys',
            subtitle: 'Toys for Terriffic Terriers (and more)!',
            button: 'Shop Now',
            link: "/collections/toys"
          },
          {
            id: 1,
            image: JumpingJackets,
            alt: 'Jumping Jackets',
            title: 'Jumping Jackets',
            subtitle: 'Jack Russels Jumping for Joy in New Jackets!',
            button: 'Shop Now',
            link: "/collections/clothing"
          },
        ]}
      />
      {console.log({ products, test: "asdasd" })}
      <ProductCarousel products={products} />
      <Guarantees />
    </>
  )
}

Home.Layout = Layout
