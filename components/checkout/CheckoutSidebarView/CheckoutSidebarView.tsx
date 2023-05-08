import useCart from '@lib/data-hooks/cart/use-cart'
// import useCheckout from '@lib/data-hooks/checkout/'
import CartItem from '@components/cart/CartItem'
import SidebarLayout from '@components/common/SidebarLayout'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import usePrice from '@lib/data-hooks/use-price'
import Link from 'next/link'
import { FC, useState } from 'react'
import PaymentWidget from '../PaymentWidget'
import ShippingWidget from '../ShippingWidget'
import { useCheckoutContext } from '../context'
import s from './CheckoutSidebarView.module.css'

const CheckoutSidebarView: FC = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const { setSidebarView, closeSidebar } = useUI()
  const { data: cartData, mutate: refreshCart } = useCart()
  // const { data: checkoutData, submit: onCheckout } = useCheckout()
  const { clearCheckoutFields } = useCheckoutContext()

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    try {
      setLoadingSubmit(true)
      event.preventDefault()

      // await onCheckout()
      clearCheckoutFields()
      setLoadingSubmit(false)
      refreshCart()
      closeSidebar()
    } catch {
      // TODO - handle error UI here.
      setLoadingSubmit(false)
    }
  }

  const { price: subTotal } = usePrice(
    cartData && {
      amount: Number(cartData.subtotalPrice),
      currencyCode: cartData.currency.code,
    }
  )
  const { price: total } = usePrice(
    cartData && {
      amount: Number(cartData.totalPrice),
      currencyCode: cartData.currency.code,
    }
  )

  return (
    <SidebarLayout
      className={s.root}
      handleBack={() => setSidebarView('CART_VIEW')}
    >
      <div className="flex-1 px-4 sm:px-6">
        <Link href="/cart">
          <Text variant="sectionHeading">Checkout</Text>
        </Link>

        <PaymentWidget
          isValid={checkoutData?.hasPayment}
          onClick={() => setSidebarView('PAYMENT_VIEW')}
        />
        <ShippingWidget
          isValid={checkoutData?.hasShipping}
          onClick={() => setSidebarView('SHIPPING_VIEW')}
        />

        <ul className={s.lineItemsList}>
          {cartData!.lineItems.map((item: any) => (
            <CartItem
              key={item.id}
              item={item}
              currencyCode={cartData!.currency.code}
              variant="display"
            />
          ))}
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 left-0 right-0 z-20 flex-shrink-0 w-full px-6 py-6 text-sm border-t sm:px-6 bg-accent-0"
      >
        <ul className="pb-2">
          <li className="flex justify-between py-1">
            <span>Subtotal</span>
            <span>{subTotal}</span>
          </li>
          <li className="flex justify-between py-1">
            <span>Taxes</span>
            <span>Calculated at checkout</span>
          </li>
          <li className="flex justify-between py-1">
            <span>Shipping</span>
            <span className="font-bold tracking-wide">FREE</span>
          </li>
        </ul>
        <div className="flex justify-between py-3 mb-2 font-bold border-t border-accent-2">
          <span>Total</span>
          <span>{total}</span>
        </div>
        <div>
          {/* Once data is correctly filled */}
          <Button
            type="submit"
            width="100%"
            disabled={!checkoutData?.hasPayment || !checkoutData?.hasShipping}
            loading={loadingSubmit}
          >
            Confirm Purchase
          </Button>
        </div>
      </form>
    </SidebarLayout>
  )
}

export default CheckoutSidebarView
