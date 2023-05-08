import { Layout } from '@components/common'
import type { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { getConfig } from '@lib/data-hooks/api'
import getAllPages from '@lib/data-hooks/api/operations/get-all-pages'
import getSiteInfo from '@lib/data-hooks/api/operations/get-site-info'


export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = getConfig({ locale });
  const pagesPromise = getAllPages({ config, preview })
  const siteInfoPromise = getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}


const ShippingPage = () => {
  return (
    <>
      <Head>
        <title>Shipping & Order Tracking</title>
      </Head>
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold">Shipping & Order Tracking</h1>
        <section>
          <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
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
          <h2 className="mb-4 text-xl font-semibold">Track Your Order</h2>
          <p>
            Poochie uses USPS as our preferred shipping provider. All tracking
            information will be available in the shipping confirmation email
            sent to the email you used at checkout with the subject line ‘Your
            Poochie order is on its way... Alternatively, you can visit{' '}
            <Link
              href="https://tools.usps.com/go/TrackConfirmAction_input"
              className="text-blue"
            >
              USPS tracking page
            </Link>{' '}
            and use your tracking ID to check on its progress.
          </p>
          <ul className="pl-5 mt-4 list-disc">
            <li>We do not offer international shipping at this time</li>
            <li>
              You will receive an email notification once your order ships
            </li>
            <li>Free shipping does not apply for coupon orders</li>
            <li>Free Returns now offered</li>
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Shipping Prices</h2>
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
