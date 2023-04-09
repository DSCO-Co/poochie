import WishlistButton from '@components/wishlist/WishlistButton'
import Image from 'next/image'
import ProductTag from '../ProductTag'
const placeholderImg = '/product-img-placeholder.svg'

export const DefaultCard = ({ product, price, s, imgProps }) => {
  return (
    <>
      <>
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <WishlistButton
            className={s.wishlistButton}
            productId={product.id}
            variant={product.variants[0] as any}
          />
        )}
        <ProductTag
          name={product.name}
          price={`${price} ${product.price?.currencyCode}`}
        />
        <div className={s.imageContainer}>
          {product?.images && (
            <Image
              alt={product.name || 'Product Image'}
              className={s.productImage}
              src={product.images[0]?.url || placeholderImg}
              height={500}
              width={500}
              quality="85"
              {...imgProps}
            />
          )}
        </div>
      </>
    </>
  )
}
