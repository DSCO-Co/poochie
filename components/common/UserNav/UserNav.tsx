import { Avatar } from '@components/common'
import { Bag, Heart, Menu } from '@components/icons'
import { Button } from '@components/ui'
import { useUI } from '@components/ui/context'
import useCart from '@lib/data-hooks/cart/use-cart'

import useCustomer from '@lib/data-hooks/use-customer'
import cn from 'clsx'
import Link from 'next/link'
import React from 'react'
import s from './UserNav.module.css'

import type { LineItem } from '@commerce/types/cart'

const countItems = (count: number, item: LineItem) => count + item.quantity

interface UserNavProps {
  className?: string
  cart?: boolean
  wishlist?: boolean
  userAvatar?: boolean
  mobileMenu?: boolean
  size?: 'small' | 'large'
}

const UserNav: React.FC<UserNavProps> = ({
  className,
  cart = false,
  wishlist = false,
  userAvatar = false,
  mobileMenu = false,
  size = 'small',
}) => {
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()
  const { closeSidebarIfPresent, openModal, setSidebarView, openSidebar } =
    useUI()

  const itemsCount = data?.lineItems?.reduce(countItems, 0) ?? 0

  const handleCartButtonClick = () => {
    setSidebarView('CART_VIEW')
    openSidebar()
    closeSidebarIfPresent()
  }

  const handleMobileMenuButtonClick = () => {
    setSidebarView('MOBILE_MENU_VIEW')
    openSidebar()
    closeSidebarIfPresent()
  }

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        {process.env.COMMERCE_CART_ENABLED && cart && (
          <li className={s.item}>
            <Button
              className={`${s.item} view_cart_button`}
              variant="naked"
              onClick={handleCartButtonClick}
              aria-label={`Cart items: ${itemsCount}`}
            >
              <Bag scale={size === 'large' ? 2 : undefined} />
              {itemsCount > 0 && (
                <span
                  className={size === 'large' ? s.bagCountLarge : s.bagCount}
                >
                  {itemsCount}
                </span>
              )}
            </Button>
          </li>
        )}
        {process.env.COMMERCE_WISHLIST_ENABLED && wishlist && (
          <>
            <li className={s.item}>
              <Link
                href="/wishlist"
                onClick={closeSidebarIfPresent}
                aria-label="Wishlist"
              >
                <Heart scale={size === 'large' ? 2 : undefined} />
                {itemsCount > 0 && (
                  <span
                    className={size === 'large' ? s.bagCountLarge : s.bagCount}
                  >
                    {itemsCount}
                  </span>
                )}
              </Link>
            </li>
            {/* <li className={s.item}>
              {
                // @ts-ignore  
                <Dropdown className={s.dropdown}>
                  <DropdownTrigger>
                    <button aria-label="Wishlist">
                      {size === 'small' ? <Heart /> : <Heart scale={2} />}
                    </button>
                  </DropdownTrigger>
                  <CustomerMenuContent />
                </Dropdown>
              }
            </li> */}
          </>
        )}

        {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && userAvatar && (
          <li className={s.item}>
            {/* <Dropdown>
              <DropdownTrigger> */}
            <button
              aria-label="Menu"
              className={s.avatarButton}
              onClick={() => (isCustomerLoggedIn ? null : openModal())}
            >
              {size === 'small' && <Avatar />}
              {size === 'large' && <Avatar scale={4} />}
            </button>
            {/* </DropdownTrigger> */}
            {/* <CustomerMenuContent /> */}
            {/* // </Dropdown> */}
          </li>
        )}
        {mobileMenu && (
          <li className={s.mobileMenu}>
            <Button
              className={s.item}
              aria-label="Menu"
              variant="naked"
              onClick={() => {
                setSidebarView('MOBILE_MENU_VIEW')
                openSidebar()
                closeSidebarIfPresent()
              }}
            >
              <Menu />
            </Button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default UserNav
