import { trackProductViewed } from '@Segment/segmentAnalytics'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getAllProducts from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import getProduct from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import { ProductView } from '@components/product'
import { normalizeProduct } from '@lib/bigcommerce/normalizer'

import { Layout } from '@components/common'
// import type { GetStaticPathsContext } from 'next'

import type {
  GetStaticPropsContext
} from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'



// export async function getStaticProps({
//   params,
//   locale,
//   locales,
//   preview,
// }: GetStaticPropsContext<{ slug: string }>) {

export async function getServerSideProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {

  console.log(`------------------`);
  console.log({ params, locale, locales, preview });
  console.log(`------------------`);
  const slug = `/products/${params!.slug}`;
  // const { slug } = params!;






  const { product } = await getProduct({
    variables: { path: slug },
    config: getConfig({ locale }),
    preview,
  });


  const { categories } = await getSiteInfo({
    config: getConfig({ locale }),
    preview,
  });

  const { pages } = await getAllPages({
    config: getConfig({ locale }),
    preview,
  });

  const { products: relatedProducts } = await getAllProducts({
    variables: { first: 4 },
    config: getConfig({ locale }),
    preview,
  });






  // if (!product) {
  //   return {
  //     notFound: true,
  //   }
  // }

  return {
    props: {
      pages,
      product: normalizeProduct(product),
      relatedProducts,
      categories,
    },
    // revalidate: 200,
  }
}

// export async function getStaticPaths({ locales }: GetStaticPathsContext) {
//   const { products } = await getAllProductPaths({
//     variables: { first: 4 },
//   })
//   console.log({ products: JSON.stringify(products) });

//   return {

//     paths: products.map((product: any) => `${product.path}`),
//     fallback: 'blocking',
//   }
// }


// export default function Slug({
//   product,
//   relatedProducts,
// }: InferGetStaticPropsType<typeof getStaticProps>) {

//   useEffect(() => {
//     if (product) {
//       trackProductViewed(product);
//       console.log({ product });
//     }
//   }, [product])



//   const router = useRouter()
//   return router.isFallback ? (
//     <h1>Loading...</h1>
//   ) : (
//     <>{JSON.stringify({ product, relatedProducts })}</>
//   )
// }


export default function Slug({
  product,
  relatedProducts,
}) {
  useEffect(() => {
    if (product) {
      trackProductViewed(product);

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
