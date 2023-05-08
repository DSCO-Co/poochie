// import type { Product } from '@commerce/types/product'
import { SEO } from '@components/common'
import { AlgoliaProductCard, ProductSlider } from '@components/product'
import { Container, Text } from '@components/ui'
import { WishlistButton } from '@components/wishlist'
import algoliasearch from 'algoliasearch/lite'
import cn from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import ProductSidebar from '../ProductSidebar'
import s from './ProductView.module.css'

interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!
)
const index = searchClient.initIndex('Products')

const ProductView: FC<ProductViewProps> = ({ product }) => {
  const [algoliaRelatedProducts, setAlgoliaRelatedProducts] = useState<
    Product[]
  >([])

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const keywords = product.name.split(' ')
        const { hits } = await index.search<Product>(keywords[0], {
          hitsPerPage: 4,
        })
        const relatedProducts = hits.filter(
          (hit) => hit.objectID !== product.id
        )
        setAlgoliaRelatedProducts(relatedProducts)
      } catch (error) {
        console.error('Error fetching related products from Algolia:', error)
      }
    }

    fetchRelatedProducts()

    console.log({ product })
  }, [product])

  return (
    <>
      <Container className="w-full max-w-none" clean>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
            <div className={s.sliderContainer}>
              <ProductSlider key={product.id}>
                {console.log({ product })}
                {product.images.map((image, i) => (
                  <div key={image.url} className={s.imageContainer}>
                    <Image
                      className={s.img}
                      src={image.url!}
                      alt={image.alt || 'Product Image'}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"
                    />
                  </div>
                ))}
              </ProductSlider>
            </div>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
          </div>

          <ProductSidebar
            key={product.id}
            product={product}
            className={s.sidebar}
          />
        </div>
        <hr className="mt-7 border-accent-2" />
        <section className="px-6 py-12 mb-10">
          <Text variant="sectionHeading">Related Products </Text>
          <div className={s.relatedProductsGrid}>
            {algoliaRelatedProducts.map((p) => (
              <div key={p.path} className="border bg-accent-0 border-accent-2">
                <AlgoliaProductCard
                  product={p}
                  key={p.path}
                  className="animated fadeIn"
                />
              </div>
            ))}
          </div>
        </section>
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
