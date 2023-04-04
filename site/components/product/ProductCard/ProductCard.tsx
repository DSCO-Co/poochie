import type { Product } from '@commerce/types/product'
import WishlistButton from '@components/wishlist/WishlistButton'
import { Button } from '@components/ui'
import usePrice from '@framework/product/use-price'
import cn from 'clsx'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import ProductTag from '../ProductTag'
import s from './ProductCard.module.css'
import { useAddItem } from '@framework/cart'

import {
  SelectedOptions,
  getProductVariant,
  selectDefaultOptionFromProduct,
} from '../helpers'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple' | 'simple-stylized' | 'algolia-stylized'
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

  const addItem = useAddItem()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const item = getProductVariant(product, selectedOptions)

  const addToCart = async () => {
    setLoading(true)
    setError(null)

    try {

      console.log("Add Item, product.id: ", product.id, item ? "item.id: ": "product.variants[0]?.id: ", product.variants[0]?.id)
      await addItem({
        productId: String(product.id),
        variantId: String(item ? item.id : product.variants[0]?.id),
      })

      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err instanceof Error) {
        console.error(err)
        setError({
          ...err,
          message: 'Could not add item to cart. Please try again.',
        })
      }
    }
  }

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
      {variant === 'simple-stylized' && (
        <>
          <div className=" h-full relative group bg-white text-sm flex flex-col">
            <div className="p-1 flex-grow">
              <Image
                alt={product.name || 'Product Image'}
                className="rounded-lg object-cover object-center"
                src={product.images[0]?.url  || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            </div>
            <div className="bg-white rounded-b-lg py-3">
              <h3 className="text-center font-medium text-gray-900">
                {product.name}
              </h3>
              <div className="text-center">{`${price} ${product.price?.currencyCode}`}</div>
            </div>
            <WishlistButton
              className="absolute top-2 right-2"
              productId={product.id}
              variant={product.variants[0]}
            />
            <div className="absolute top-2 left-2">
              <div>
                <div
                  className="bg-white mx-1 my-3 text-orange-500 font-bold text-xs uppercase tracking-wide"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid var(--on-sale-orange)',
                    boxShadow: '4px 4px 0px 0px var(--on-sale-orange)',
                    padding: '4px',
                  }}
                >
                  Sale
                </div>
              </div>
              {/* <div className="bg-orange-500 absolute top-1 left-1 p-1" /> */}
            </div>
            <Button
              aria-label="Add to Cart"
              className="opacity-0 group-hover:opacity-100 absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1 py-0.5 bg-black text-white font-semibold rounded-md whitespace-nowrap"
              onClick={(e) => {
                e.preventDefault()
                addToCart()
              }}
              type="button"
              loading={loading}
              disabled={item?.availableForSale === false}
            >
              {item?.availableForSale === false
                ? 'Not Available'
                : 'Add To Cart'}
            </Button>
          </div>
        </>
      )}
      {variant === 'algolia-stylized' && (
        <>
          <div className=" h-full relative group bg-white text-sm flex flex-col">
            <div className="p-1 flex-grow">
              <Image
                alt={product.productName?.toString() || 'Product Image'}
                className="rounded-lg object-cover object-center"
                src={product.images[0]?.url  || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            </div>
            <div className="bg-white rounded-b-lg py-3">
              <h3 className="text-center font-medium text-gray-900">
                {product.productName?.toString()}
              </h3>
              <div className="text-center font-bold">{`$${product.price}`}</div>
            </div>
            <WishlistButton
              className="absolute top-2 right-2"
              productId={product.productID?.toString() || "missing id"}
              variant={product.variants[0]}
            />
            <div className="absolute top-2 left-2">
              <div>
                <div
                  className="bg-white mx-1 my-3 text-orange-500 font-bold text-xs uppercase tracking-wide"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid var(--on-sale-orange)',
                    boxShadow: '4px 4px 0px 0px var(--on-sale-orange)',
                    padding: '4px',
                  }}
                >
                  Sale
                </div>
              </div>
              {/* <div className="bg-orange-500 absolute top-1 left-1 p-1" /> */}
            </div>
            <Button
              aria-label="Add to Cart"
              className="opacity-0 group-hover:opacity-100 absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1 py-0.5 bg-black text-white font-semibold rounded-md whitespace-nowrap"
              onClick={(e) => {
                e.preventDefault()
                addToCart()
              }}
              type="button"
              loading={loading}
              disabled={item?.availableForSale === false}
            >
              {item?.availableForSale === false
                ? 'Not Available'
                : 'Add To Cart'}
            </Button>
          </div>
        </>
      )}
    </Link>
  )
}

export default ProductCard
