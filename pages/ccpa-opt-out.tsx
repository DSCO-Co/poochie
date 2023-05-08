import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { getConfig } from '@lib/data-hooks/api'
import getAllPages from '@lib/data-hooks/api/operations/get-all-pages'
import getSiteInfo from '@lib/data-hooks/api/operations/get-site-info'
import type { GetStaticPropsContext } from 'next'

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

export default function OptOut() {
  return (
    <Container className="pt-16 pb-8">
      <Text variant="pageHeading">Do Not Sell My Personal Information</Text>
      <h2 className="pt-6 text-xl font-bold tracking-wide">
        Your rights under the California Consumer Privacy Act
      </h2>
      <br />
      <p>
        The California Consumer Privacy Act (CCPA) provides you with rights
        regarding how your data or personal information is treated. Under the
        legislation, California residents can choose to opt out of the “sale” of
        their personal information to third parties. Based on the CCPA
        definition, “sale” refers to data collection for the purpose of creating
        advertising and other communications.{' '}
        <a
          href="https://oag.ca.gov/privacy/ccpa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about CCPA and your privacy rights
        </a>
        .
      </p>
      <br />
      <p>
        <strong>How to opt out</strong>
      </p>
      <p>
        Email us at support@poochi.co and we will no longer collect or sell your
        personal information. This applies to both third-parties and the data we
        collect to help personalize your experience on our website or through
        other communications. For more information, view our privacy policy.
      </p>
    </Container>
  )
}

OptOut.Layout = Layout
