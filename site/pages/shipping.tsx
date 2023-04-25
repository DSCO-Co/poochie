import Head from 'next/head'
import type { GetStaticPropsContext, NextPage } from 'next'
import { Layout } from '@components/common'
import commerce from '@lib/api/commerce'
import Link from 'next/link'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const { pages } = await commerce.getAllPages({ config, preview })
  const { categories, brands } = await commerce.getSiteInfo({ config, preview })
  return {
    props: {
      pages,
      categories,
      brands,
    },
    revalidate: 200,
  }
}

const ShippingPage = () => {
  return (
    <>
      <Head>
        <title>Shipping & Order Tracking</title>
      </Head>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-6">Shipping & Order Tracking</h1>
        <section>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <p>
            Most items generally ship within 3-5 business days, and you will
            receive a confirmation email with tracking as soon as your items
            ship. Please note, some items are on backorder and may take longer
            to ship. Allow up to 8 weeks for beds & blankets. Your order may
            also ship in multiple deliveries.
          </p>
          <p>
            Business days are Monday-Friday and exclude federal holidays within
            the United States.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>
          <p>
            Poochie uses USPS as our preferred shipping provider. All tracking
            information will be available in the shipping confirmation email
            sent to the email you used at checkout with the subject line ‘Your
            Poochie order is on its way…’ Alternatively, you can visit{' '}
            <a
              href="https://tools.usps.com/go/TrackConfirmAction_input"
              className="text-blue"
            >
              USPS tracking page
            </a>{' '}
            and use your tracking ID to check on its progress.
          </p>
          <ul className="list-disc pl-5 mt-4">
            <li>We do not offer international shipping at this time</li>
            <li>
              You will receive an email notification once your order ships
            </li>
            <li>
              You will not be billed for items purchased with a credit card
              until your order has shipped
            </li>
            <li>Free shipping does not apply for coupon orders</li>
            <li>Free Returns now offered</li>
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Prices</h2>
          <p>
            Shipping is calculated based on package weight and destination.
            Expedited speeds are available for an additional charge.
          </p>
        </section>
        <section className="mt-8">
          <p>
            Any questions please{' '}
            <Link href="/contact">
              <span className="text-blue">contact us</span>
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  )
}

export default ShippingPage

ShippingPage.Layout = Layout
