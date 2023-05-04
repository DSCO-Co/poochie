import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import {
  // AlgoliaStylizedCard,
  CalloutProductCard,
  DefaultCard,
  ProductCardProps,
  SimpleCard,
  SimpleStylizedCard,
  SlimCard,
  useProductCard,
} from './'

import { trackProductViewed } from '@lib/Segment/segmentAnalytics'
import s from './ProductCard.module.css'

const ProductCard: FC<ProductCardProps> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { addToCart, loading, item, price } = useProductCard(product)

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )
  // console.log('variant:', variant)
  // console.log({ product });
  return (
    <Link
      href={`${product.path}`}
      className={`${rootClassName} rounded-xl`}
      aria-label={product.name}
      onClick={() => {
        trackProductViewed(product)
      }}
    >
      {variant === 'slim' && <SlimCard product={product} imgProps={imgProps} />}

      {variant === 'simple' && (
        <SimpleCard
          product={product}
          noNameTag={noNameTag}
          s={s}
          price={price}
        />
      )}

      {variant === 'default' && (
        <DefaultCard
          product={product}
          price={price}
          s={s}
          imgProps={imgProps}
        />
      )}
      {variant === 'simple-stylized' && (
        <SimpleStylizedCard
          product={product}
          price={price}
          s={s}
          imgProps={imgProps}
          addToCart={addToCart}
          loading={loading}
          item={item}
        />
      )}
      {/* {variant === 'algolia-stylized' && (
        <AlgoliaStylizedCard product={product} imgProps={imgProps} />
      )}
      {variant === 'callout' && (
        <CalloutProductCard
          product={product}
          price={price}
          s={s}
          imgProps={imgProps}
          addToCart={addToCart}
          loading={loading}
          item={item}
        />
      )} */}
    </Link>
  )
}

export default ProductCard
