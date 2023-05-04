import { trackProductAdded } from '@lib/Analytics/tracker'
// import usePrice from '@commerce/product/use-price'
import type { Product } from '@commerce/types/product'
import { ProductOptions } from '@components/product'
import { Button, Collapse, Text, useUI } from '@components/ui'
import ErrorMessage from '@components/ui/ErrorMessage'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import ProductTag from '../ProductTag'
import {
  SelectedOptions,
  getProductVariant,
  selectDefaultOptionFromProduct,
} from '../helpers'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const getSelectedOptionPrice = (
    product: Product,
    selectedOptions: SelectedOptions
  ) => {
    const variant = getProductVariant(product, selectedOptions)
    if (variant) {
      return {
        // @ts-ignore
        actualPrice: variant.prices.price.value,
        // @ts-ignore
        defaultPrice: variant.prices.basePrice.value,
      }
    }
    return { actualPrice: product.price.value, defaultPrice: null }
  }

  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(
    getSelectedOptionPrice(product, selectedOptions)
  )

  useEffect(() => {
    setSelectedOptionPrice(getSelectedOptionPrice(product, selectedOptions))
  }, [selectedOptions, product])

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    setError(null)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      let data = product
      data.sku = variant?.sku
      trackProductAdded(data)
      setSidebarView('CART_VIEW')
      openSidebar()
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
    <div className={className}>
      <ProductTag
        name={product.name}
        basePrice={selectedOptionPrice.defaultPrice}
        price={selectedOptionPrice.actualPrice}
        currencyCode={product.price?.currencyCode}
        fontSize={22}
      />
      <ProductOptions
        options={product.options}
        variants={product.variants}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <div>
        {error && <ErrorMessage error={error} className="my-5" />}
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            className={'bg-black'}
            onClick={() => {
              addToCart()
            }}
            loading={loading}
            // disabled={!variant && true || !variant?.isPurchasable || loading}
            disabled={false}
          >
            {/* {variant && variant.isPurchasable ? "Not Available" : "Add To Cart"} */}
            Add to Cart
          </Button>
        )}
      </div>
      <div className="mt-6">
        <Collapse title="Details" initial={true}>
          <Text
            className="w-full max-w-xl pb-4 break-words"
            html={product.descriptionHtml || product.description}
          />
        </Collapse>
        {/* <Collapse title="Customer Reviews"></Collapse> */}
        <Collapse title="Shipping & Returns">
          <br />
          <h5 className="font-bold">Returns Policy</h5>
          <p>
            You may return most new, unopened items within 30 days of delivery
            for a full refund. We'll also pay the return shipping costs if the
            return is a result of our error (you received an incorrect or
            defective item, etc.).
          </p>
          <p>
            You should expect to receive your refund within four weeks of giving
            your package to the return shipper, however, in many cases you will
            receive a refund more quickly. This time period includes the transit
            time for us to receive your return from the shipper (5 to 10
            business days), the time it takes us to process your return once we
            receive it (3 to 5 business days), and the time it takes your bank
            to process our refund request (5 to 10 business days).
          </p>
          <p>
            If you need to return an item, simply login to your account, view
            the order using the "Complete Orders" link under the My Account menu
            and click the Return Item(s) button. We'll notify you via e-mail of
            your refund once we've received and processed the returned item.
          </p>
          <br />
          <h5 className="font-bold">Shipping</h5>
          <p>
            We can ship to virtually any address in the world. Note that there
            are restrictions on some products, and some products cannot be
            shipped to international destinations.
          </p>
          <p>
            When you place an order, we will estimate shipping and delivery
            dates for you based on the availability of your items and the
            shipping options you choose. Depending on the shipping provider you
            choose, shipping date estimates may appear on the shipping quotes
            page.
          </p>
          <p>
            Please also note that the shipping rates for many items we sell are
            weight-based. The weight of any such item can be found on its detail
            page. To reflect the policies of the shipping companies we use, all
            weights will be rounded up to the next full pound.
          </p>
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
