import type { Product } from '@commerce/types/product'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import cn from 'clsx'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ProductTag from '../ProductTag'
import s from './ProductCard.module.css'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )
  return (
    <Link
      href={`${product.path}`}
      className={rootClassName}
      aria-label={product.name}
    >
      {variant === 'slim' && (
        <>
          <div className="flex justify-center items-center">
            {product?.images && (
              <Image
                quality="85"
                src={product.images[0]?.url || placeholderImg}
                alt={product.name || 'Product Image'}
                height={320}
                width={320}
                {...imgProps}
              />
            )}
            <div className="absolute bottom-0 right-0">
              <h3 className="bg-accent-9 text-accent-0 inline-block p-3 font-bold text-l break-words m-4">
                {product.name}
              </h3>
            </div>
          </div>
        </>
      )}

      {variant === 'simple' && (
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
                className="group bg-white text-sm"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75">
                  <img
                    src={product.images[0]?.url || placeholderImg}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 px-4 py-2 font-medium bg-white text-gray-900 rounded-md">
                  {product.name}
                </h3>
              </a>
            )}
          </div>
        </>
      )}

      {variant === 'default' && (
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
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}
    </Link>
  )
}

export default ProductCard
