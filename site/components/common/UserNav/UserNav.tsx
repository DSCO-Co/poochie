import { Avatar } from '@components/common'
import { Bag, Heart, Menu } from '@components/icons'
import {
  Button,
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
} from '@components/ui'
import { useUI } from '@components/ui/context'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/customer/use-customer'
import cn from 'clsx'
import Link from 'next/link'
import React from 'react'
import CustomerMenuContent from './CustomerMenuContent'
import s from './UserNav.module.css'

import type { LineItem } from '@commerce/types/cart'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: React.FC<{
  className?: string
  cart?: Boolean
  wishlist?: Boolean
  userAvatar?: Boolean
  mobileMenu?: Boolean
  size?: 'small' | 'large'
}> = ({
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

    const itemsCount = data?.lineItems?.reduce(countItem, 0) ?? 0
    const DropdownTrigger = isCustomerLoggedIn
      ? DropdownTriggerInst
      : React.Fragment

    return (
      <nav className={cn(s.root, className)}>
        <ul className={s.list}>
          {process.env.COMMERCE_CART_ENABLED && cart && (
            <li className={s.item}>
              <Button
                className={s.item}
                variant="naked"
                onClick={() => {
                  setSidebarView('CART_VIEW');
                  openSidebar();
                  closeSidebarIfPresent();
                }}
                aria-label={`Cart items: ${itemsCount}`}
              >
                {size === 'small' && (
                  <>
                    <Bag />
                    {itemsCount > 0 && (
                      <span className={s.bagCount}>{itemsCount}</span>
                    )}
                  </>
                )}

                {size === 'large' && (
                  <>
                    <Bag scale={2} />
                    {itemsCount > 0 && (
                      <span className={s.bagCountLarge}>{itemsCount}</span>
                    )}
                  </>
                )}
              </Button>
            </li>
          )}
          {process.env.COMMERCE_WISHLIST_ENABLED && wishlist && (
            <li className={s.item}>
              <Link className="pb-0 mb-0" href="/wishlist">
                <button
                  className="pt-1 "
                  onClick={closeSidebarIfPresent}
                  aria-label="Wishlist"
                >
                  {size === 'small' && <Heart />}
                  {size === 'large' && <Heart scale={2} />}
                </button>
              </Link>
            </li>
          )}
          {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && userAvatar && (
            <li className={s.item}>
              <Dropdown>
                <DropdownTrigger>
                  <button
                    aria-label="Menu"
                    className={s.avatarButton}
                    onClick={() => (isCustomerLoggedIn ? null : openModal())}
                  >
                    {size === 'small' && <Avatar />}
                    {size === 'large' && <Avatar scale={4} />}
                  </button>
                </DropdownTrigger>
                <CustomerMenuContent />
              </Dropdown>
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
                  closeSidebarIfPresent();
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
