import { trackProductViewed } from '@Segment/segmentAnalytics'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import commerce from '@lib/api/commerce'
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const slug = `/products/${params!.slug}`

  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const productPromise = commerce.getProduct({
    variables: { slug },
    config,
    preview,
  })

  const allProductsPromise = commerce.getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  })

  const algoliaSearchOnlyKey = process.env.ALGOLIA_SEARCH_ONLY_API_KEY
  const algoliaAppId = process.env.ALGOLIA_APP_ID

  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const { product } = await productPromise

  const { products: relatedProducts } = await allProductsPromise


  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pages,
      product,
      relatedProducts,
      categories,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProductPaths()


  return {
    //
    // disabled because we're not using locales
    // keep for now maybe?
    //
    // locales
    // ? locales.reduce<string[]>((arr, locale) => {
    //   // Add a product path for every locale
    //   products.forEach((product: any) => {
    //     arr.push(`/${locale}${product.path}`)
    //   })
    //   return arr
    // }, [])
    //   :
    paths: products.map((product: any) => `${product.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
  relatedProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  useEffect(() => {
    if (product) {
      trackProductViewed(product);
      console.log({ product });
    }
  }, [product])



  const router = useRouter()
  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <ProductView product={product} relatedProducts={relatedProducts} />
  )
}

Slug.Layout = Layout
