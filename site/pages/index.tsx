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
    variables: { first: 6 },
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
    <div className="relative px-6 py-32 sm:py-60 sm:px-12 lg:px-16">
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
          className="block w-full px-20 py-4 mt-8 font-medium text-white bg-transparent border-4 hover:bg-black hover:border-transparent sm:w-auto"
        >Shop Now</a>
      </div>
    </div>
  )
}


export default function Home({
  products,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {




  return (
    <>
      <HeroSection />
      {/* <Marquee variant="primary"> */}

      {/* <div className="mx-auto mt-4 max-w-8xl"> */}
      {/* {products.slice(0, 6).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))} */}
      {/* </Marquee > */}
      <div className="mx-auto mt-4 max-w-8xl">
        {products.slice(0, 6).map((product: any, i: number) => (
          <div className="float-left max-w-xs mt-4" key={product.id}>
            <ProductCard key={product.id} product={product} variant="slim" />
          </div>
        ))}
      </div>
      {/* <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      /> */}
      {/* <Marquee> */}

      {/* </Marquee> */}
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout