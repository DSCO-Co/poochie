import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function ContactUs() {
  return (
    <Container className="pt-16 pb-8">
      <Text variant="pageHeading">Contact Us</Text>
      <br />
      <p>
        Email us at{' '}
        <a
          href="mailto:support@poochie.co?subject=Poochie%20Customer%20Support"
          rel="noopener noreferrer"
        >
          support@poochi.co
        </a>{' '}
        and we will get back to you as soon as possible :)
      </p>
    </Container>
  )
}

ContactUs.Layout = Layout
