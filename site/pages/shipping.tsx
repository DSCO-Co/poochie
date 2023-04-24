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
            Please allow 1-2 business days from the day order is placed for
            items to leave warehouse plus shipping time.
          </p>
          <p>
            Business days are Monday-Friday and exclude federal holidays within
            the United States.
          </p>
          <p>
            Orders placed on Friday after 8:00 am PST will ship the following
            Monday.
          </p>
          <p>
            2-day and overnight deliveries can only be delivered Monday-Friday.
          </p>
          <p>Expedited shipping is not eligible for weekend delivery.</p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>
          <p>
            Poochie uses FedEx as our preferred shipping provider. All tracking
            information will be available in the shipping confirmation email
            sent to the email you used at checkout with the subject line ‘Your
            Poochie order is on its way…’ Alternatively, you can visit{' '}
            <a
              href="https://www.fedex.com/apps/fedextrack/"
              className="text-blue-600"
            >
              FedEx tracking page
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
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-2">Type</th>
                <th className="text-left pb-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">Ground</td>
                <td className="py-2">$4.99</td>
              </tr>
              <tr>
                <td className="py-2">Ground</td>
                <td className="py-2">Free Over $65</td>
              </tr>
              <tr>
                <td className="py-2">2-Day</td>
                <td className="py-2">$15.00</td>
              </tr>
              <tr>
                <td className="py-2">Overnight</td>
                <td className="py-2">$25.00</td>
              </tr>
              <tr>
                <td className="py-2">Guam and Puerto Rico</td>
                <td className="py-2">$40.00</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="mt-8">
          <p>
            Any questions please{' '}
            <Link href="/contact">
              <a className="text-blue-600">contact us</a>
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
