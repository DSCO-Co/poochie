import { Button } from '@components/ui';
import { Card } from 'flowbite-react';
const placeholderImg = '/product-img-placeholder.svg'

import Link from 'next/link';
export const CalloutProductCard = ({
  product,
  price,
  s,
  imgProps,
  addToCart,
  loading,
  item,
}) => {
  return (
    <>
      <div className="max-w-sm">
        <Card imgSrc={product.images?.[0]?.url || placeholderImg}>
          <Link href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {`${price} ${product.price?.currencyCode}`}
            </span>
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
        </Card>
      </div>
    </>
  )
}
