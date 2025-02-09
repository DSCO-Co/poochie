import WishlistButton from '@components/wishlist/WishlistButton'
import { useAddItem } from '@framework/cart'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import s from './AlgoliaProductCard.module.css'

import {
  SelectedOptions,
  getProductVariant,
  selectDefaultOptionFromProduct,
} from '../helpers'

// Define a type for the price object
type PriceObject = {
  value: number;
};

// Define a type that can be either a number or a PriceObject
type PriceInput = number | PriceObject;

function getPrice(price: PriceInput): number {
  if (typeof price === 'number') {
    return price;
  } else if (typeof price === 'object' && price !== null && 'value' in price) {
    return price.value;
  } else {
    throw new Error('Invalid price input');
  }
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard = ({ product, className }) => {
  const rootClassName = cn(s.root, className)

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
      <div className="relative flex flex-col h-full text-sm bg-white group">
        <div className="flex-grow p-1">
          <div className="relative w-full h-0 overflow-hidden pb-[80%]">
            <Image
              alt={product.name?.toString() || 'Product Image'}
              className={`rounded-lg absolute top-0 left-0 w-full h-full ${s.productImage}`}
              src={product.images[0]?.url || placeholderImg}
              width={400} 
              height={400}
              sizes="100%"
            />
          </div>
        </div>
        <div className="py-3 bg-white rounded-b-lg">
          <h3 className="font-medium text-center text-gray-900">
            {product.name?.toString()}
          </h3>
          {product.sale_price && product.sale_price !== product.price ? (
            <div className="flex justify-center items-center">
              <span className="font-bold line-through text-red mr-2">
                {`$${product.price}`}
              </span>
              <span className="font-bold text-red-600">{`$${product.sale_price}`}</span>
            </div>
          ) : (
            <div className="font-bold text-center">{`$${getPrice(product.price)}`}</div>
          )}
        </div>
        <WishlistButton
          className="absolute top-2 right-2"
          productId={product.id?.toString() || 'missing id'}
          variant={product.variants[0]}
        />
        <div className="absolute top-2 left-2">
          {product.onSale && ''}
          {product?.sale_price && (
            <div>
              <div
                className="mx-1 my-3 text-xs font-bold tracking-wide text-orange-500 uppercase bg-white"
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
          )}
        </div>
        {/* <Button
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
          {item?.availableForSale === false ? 'Not Available' : 'Add To Cart'}
        </Button> */}
      </div>
    </Link>
  )
}

export default ProductCard
