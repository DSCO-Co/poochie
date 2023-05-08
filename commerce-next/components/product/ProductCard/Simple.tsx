import WishlistButton from '@components/wishlist/WishlistButton'
import Image from 'next/image'
const placeholderImg = '/product-img-placeholder.svg'
export const SimpleCard = ({ product, noNameTag, s, price }) => {
  return (
    <>
      {process.env.COMMERCE_WISHLIST_ENABLED && (
        <WishlistButton
          className={s.wishlistButton}
          productId={product.id}
          variant={product.variants[0]}
        />
      )}
      {!noNameTag && (
        <div className={s.header}>
          <div className={s.price}>
            {`${price} ${product.price?.currencyCode}`}
          </div>
        </div>
      )}
      <div className={s.imageContainer}>
        {product?.images && (
          <a
            key={product.id}
            href={product.slug}
            className="text-sm group bg-secondary-2"
          >
            <div className="w-full overflow-hidden rounded-lg bg-secondary-2 aspect-w-1 aspect-h-1 group-hover:opacity-75">
              <Image
                src={product.images[0]?.url || placeholderImg}
                alt={product.name}
                height={product.images[0]?.height || 100}
                width={product.images[0]?.width || 100}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <h3 className="px-4 py-2 mt-4 font-medium text-gray-900 rounded-md bg-secondary-2">
              {product.name}
            </h3>
          </a>
        )}
      </div>
    </>
  )
}
