import useAddItem from '@bigcommerce/storefront-data-hooks/cart/use-add-item'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import useRemoveItem from '@bigcommerce/storefront-data-hooks/wishlist/use-remove-item'
import useWishlist from '@bigcommerce/storefront-data-hooks/wishlist/use-wishlist'
import { Heart } from '@components/icons'
import { useUI } from '@components/ui'
import cn from 'clsx'
import React, { FC, useState } from 'react'
import s from './WishlistButton.module.css'
// import type { Product, ProductVariant } from '@bigcommerce/storefront-data-hooks/api/'
import { trackProductAddedToWishlist } from '@lib/Segment/segmentAnalytics'

type Props = {
  productId
  variant
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const WishlistButton: FC<Props> = ({
  productId,
  variant,
  className,
  ...props
}) => {
  const { data } = useWishlist()
  const addItem = useAddItem()
  const removeItem = useRemoveItem()
  const { data: customer } = useCustomer()
  const { openModal, setModalView } = useUI()
  const [loading, setLoading] = useState(false)

  // @ts-ignore Wishlist is not always enabled
  const itemInWishlist = data?.items?.find(
    // @ts-ignore Wishlist is not always enabled
    (item) => item.productId === productId && item.variantId === variant.id
  )

  const handleWishlistChange = async (e: any) => {
    e.preventDefault()

    if (loading) return

    // A login is required before adding an item to the wishlist
    if (!customer) {
      setModalView('LOGIN_VIEW')
      return openModal()
    }

    setLoading(true)

    try {
      if (itemInWishlist) {
        await removeItem({ id: itemInWishlist.id! })
      } else {
        await addItem({
          productId,
          variantId: variant?.id!,
        })
      }

      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <button
      aria-label="Add to wishlist"
      className={cn(s.root, className)}
      onClick={(e) => {
        handleWishlistChange(e)
        trackProductAddedToWishlist()
      }}
      {...props}
    >
      <Heart
        className={cn(s.icon, {
          [s.loading]: loading,
          [s.inWishlist]: itemInWishlist,
        })}
      />
    </button>
  )
}

export default WishlistButton
