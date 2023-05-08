import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { getConfig } from '@lib/data-hooks/api'
import getAllPages from '@lib/data-hooks/api/operations/get-all-pages'
import getSiteInfo from '@lib/data-hooks/api/operations/get-site-info'
import type { GetStaticPropsContext } from 'next'
import Image from 'next/image'

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

export default function About() {
  return (
    <Container className="pt-16 pb-8">
      <Text className="flex justify-center" variant="sectionHeading">
        About Us
      </Text>
      <br />
      {/* Image: A group of dogs and cats enjoying Poochie products */}
      {/* <!-- Image Description: A group of dogs and cats enjoying Poochie products --> */}
      <div className="flex justify-center mb-2">
        <Image
          src="/wholesome_family.png"
          alt="A group of dogs enjoying Poochie products"
          width={500}
          height={300}
          quality={90}
        />
      </div>
      <Text>
        At Poochie, we understand that pets are not just animals, but cherished
        family members. Our mission is to enhance the bond between pets and
        their owners by offering a unique collection of luxury pet products that
        cater to your pets' needs while also reflecting your refined taste and
        style.
      </Text>
      <br />

      {/* Image: A luxurious dog bed */}
      {/* <!-- Image Description: A luxurious dog bed --> */}
      <div className="flex justify-center mb-8">
        <Image
          src="/Cute_puppies_playing_in_luxury_dog.png"
          alt="A luxurious dog bed"
          width={500}
          height={300}
          quality={90}
        />
      </div>
      <Text>
        Our team of pet lovers and experts carefully select and test each
        product to ensure that they meet our high standards of quality,
        durability, and style. We offer a wide range of products from plush dog
        beds and cozy cat condos to stylish pet apparel and durable toys that
        will keep your furry friends entertained for hours.
      </Text>
      <br />

      {/* Image: A stylish dog wearing Poochie apparel */}
      {/* <!-- Image Description: A stylish dog wearing Poochie apparel --> */}

      <div className="flex justify-center mb-8">
        <Image
          src="/small_terrier_model_dog_wearing_a_North_Face_puffer.png"
          alt="A stylish dog wearing Poochie apparel"
          width={500}
          height={300}
          quality={90}
        />
      </div>
      <Text>
        We believe that shopping for your pets should be a pleasurable
        experience, which is why we strive to provide exceptional customer
        service and an easy-to-navigate website. Our knowledgeable customer
        support team is always available to help you find the perfect products
        for your pets' needs, preferences, and personality.
      </Text>
      <br />

      <Text>
        Thank you for choosing Poochie as your go-to destination for luxury pet
        products. We look forward to being a part of your pets' lives and making
        them feel pampered and loved.
      </Text>
      <br />
    </Container>
  )
}

About.Layout = Layout
