import { Layout } from '@components/common';
import { ProductCarousel } from '@components/ui';
import { HeroCarousel } from '@components/ui/HeroCarousel';
import commerce from '@lib/api/commerce';
import Image from 'next/image';
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import JumpingJackets from '@assets/heroes/Jumping-Jackets-Background.jpg';
import SweetSweaters from '@assets/heroes/Sweet-Sweaters-Background.jpg';
import TotallyToys from '@assets/heroes/Totally-Toys-Background.jpg';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 12, relevance: 'best_selling' },
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
      <div className="absolute inset-0">
        <Image
          src={'/Heroes/Jumping-Jackets-Background.jpg'}
          alt=""
          width={1658}
          height={712}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="relative flex flex-col items-center max-w-4xl mx-auto text-center">
        <h2 className="text-2xl tracking-widest text-white font-extralight sm:text-8xl">Jumping Jackets</h2>
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
      <HeroCarousel slides={[
        {
          id: 1,
          image: JumpingJackets,
          alt: 'Jumping Jackets',
          title: 'Jumping Jackets',
          subtitle: 'Jack Russels Jumping for Joy in New Jackets!',
          button: 'Shop Now',
        },
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
        }
      ]} />

      <ProductCarousel products={products} />

    </>
  )
}

Home.Layout = Layout