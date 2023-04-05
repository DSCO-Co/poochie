import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Hero, Marquee, ProductCarousel} from '@components/ui'
import commerce from '@lib/api/commerce'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 12, relevance: 'best_selling'},
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

function HeroSection() {
  return (
    <div className="relative px-6 pt-8 pb-64 sm:py-60 sm:px-12 lg:px-16">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://cdn11.bigcommerce.com/s-6b5ruzs4qu/images/stencil/original/carousel/16/adobestock_322789479__83032.jpeg?c=1"
          alt=""
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="relative flex flex-col items-center max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-8xl">SPRING IS HERE</h1>
        <p className="mt-3 text-xl text-white">Unleash your style with new arrivals</p>
        <a
          href="#"
          className="block px-16 py-4 mt-8 font-medium text-white bg-transparent border-4 hover:bg-black hover:border-transparent sm:w-auto"
        >Shop Now</a>
      </div>
    </div>
  )
}


export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <HeroSection />

      <ProductCarousel products={products}/> 

    </>
  )
}

Home.Layout = Layout