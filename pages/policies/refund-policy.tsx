import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import type { GetStaticPropsContext } from 'next'

import { getConfig } from '@lib/data-hooks/api'
import getAllPages from '@lib/data-hooks/api/operations/get-all-pages'
import getSiteInfo from '@lib/data-hooks/api/operations/get-site-info'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const pagesPromise = getAllPages({ config, preview })
  const siteInfoPromise = getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function Refund() {
  return (
    <Container className="pt-16 pb-8">
      <Text variant="pageHeading">Refund Policy</Text>
      <h2 className="pt-6 text-xl font-bold tracking-wide">Returns Policy</h2>
      <br />
      <p>
        You may return most new, unopened items within 30 days of delivery for a
        full refund. We'll also pay the return shipping costs if the return is a
        result of our error (you received an incorrect or defective item, etc.).
      </p>
      <br />
      <p>
        You should expect to receive your refund within four weeks of giving
        your package to the return shipper, however, in many cases you will
        receive a refund more quickly. This time period includes the transit
        time for us to receive your return from the shipper (5 to 10 business
        days), the time it takes us to process your return once we receive it (3
        to 5 business days), and the time it takes your bank to process our
        refund request (5 to 10 business days).
      </p>
      <br />
      <p>
        If you need to return an item, please Contact Us with your order number
        and details about the product you would like to return. We will respond
        quickly with instructions for how to return items from your order.
      </p>
      <br />
      <h2 className="pt-6 text-xl font-bold tracking-wide">Shipping</h2>
      <br />
      <p>
        We can ship to virtually any address in the world. Note that there are
        restrictions on some products, and some products cannot be shipped to
        international destinations.
      </p>
      <br />
      <p>
        When you place an order, we will estimate shipping and delivery dates
        for you based on the availability of your items and the shipping options
        you choose. Depending on the shipping provider you choose, shipping date
        estimates may appear on the shipping quotes page.
      </p>
      <br />
      <p>
        Please also note that the shipping rates for many items we sell are
        weight-based. The weight of any such item can be found on its detail
        page. To reflect the policies of the shipping companies we use, all
        weights will be rounded up to the next full pound.
      </p>
    </Container>
  )
}

Refund.Layout = Layout
