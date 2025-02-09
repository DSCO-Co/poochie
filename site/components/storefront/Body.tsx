import Image from 'next/image'
import Link from 'next/link'

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']

const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt:
            'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt:
            'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt:
            'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
          imageAlt:
            'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}
const categories = [
  {
    name: 'New Arrivals',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg',
  },
  {
    name: 'Productivity',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg',
  },
  {
    name: 'Workspace',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg',
  },
  {
    name: 'Accessories',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg',
  },
  {
    name: 'Sale',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg',
  },
]
const collections = [
  {
    name: 'Handcrafted Collection',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    imageAlt:
      'Brown leather key ring with brass metal loops and rivets on wood table.',
    description:
      'Keep your phone, keys, and wallet together, so you can lose everything at once.',
  },
  {
    name: 'Organized Desk Collection',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg',
    imageAlt:
      'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
    description:
      'The rest of the house will still be a mess, but your desk will look great.',
  },
  {
    name: 'Focus Collection',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg',
    imageAlt:
      'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
    description:
      'Be more productive than enterprise project managers with a single piece of paper.',
  },
]
const footerNavigation = {
  shop: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  account: [
    { name: 'Manage Account', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Redeem a Gift Card', href: '#' },
  ],
  connect: [
    { name: 'Contact Us', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
  ],
}

export default function Body() {
  return (
    <main>
      Category section
      <section
        aria-labelledby="category-heading"
        className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
      >
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Shop by Category
          </h2>
          <Link
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Browse all categories
          </Link>
        </div>

        <div className="flow-root mt-4">
          <div className="-my-2">
            <div className="box-content relative py-2 overflow-x-auto h-80 xl:overflow-visible">
              <div className="absolute flex px-4 space-x-8 min-w-screen-xl sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categories.map((category: any) => (
                  <a
                    key={category.name}
                    href={category.href}
                    className="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <Image
                        src={category.imageSrc}
                        alt=""
                        className="object-cover object-center w-full h-full"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
                    />
                    <span className="relative mt-auto text-xl font-bold text-center text-white">
                      {category.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mt-6 sm:hidden">
          <Link
            href="#"
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all categories
          </Link>
        </div>
      </section>
      {/* Featured section */}
      <section
        aria-labelledby="social-impact-heading"
        className="px-4 pt-24 mx-auto max-w-7xl sm:px-6 sm:pt-32 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <Image
              src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"
              alt=""
              height={640}
              width={1280}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="relative px-6 py-32 bg-gray-900 bg-opacity-75 sm:py-40 sm:px-12 lg:px-16">
            <div className="relative flex flex-col items-center max-w-3xl mx-auto text-center">
              <h2
                id="social-impact-heading"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                <span className="block sm:inline">Level up</span>
                <span className="block sm:inline">your desk</span>
              </h2>
              <p className="mt-3 text-xl text-white">
                Make your desk beautiful and organized. Post a picture to social
                media and watch it get more likes than life-changing
                announcements. Reflect on the shallow nature of existence. At
                least you have a really nice desk setup.
              </p>
              <a
                href="#"
                className="block w-full px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100 sm:w-auto"
              >
                Shop Workspace
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Collection section */}
      <section
        aria-labelledby="collection-heading"
        className="max-w-xl px-4 pt-24 mx-auto sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
      >
        <h2
          id="collection-heading"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Shop by Collection
        </h2>
        <p className="mt-4 text-base text-gray-500">
          Each season, we collaborate with world-class designers to create a
          collection inspired by the natural world.
        </p>

        <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="block group"
            >
              <div
                aria-hidden="true"
                className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2 group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
              >
                <Image
                  src={collection.imageSrc}
                  alt={collection.imageAlt}
                  height={640}
                  width={1280}
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {collection.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {collection.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      {/* Featured section */}
      <section
        aria-labelledby="comfort-heading"
        className="px-4 py-24 mx-auto max-w-7xl sm:py-32 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <Image
              src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg"
              alt=""
              height={640}
              width={1280}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="relative px-6 py-32 bg-gray-900 bg-opacity-75 sm:py-40 sm:px-12 lg:px-16">
            <div className="relative flex flex-col items-center max-w-3xl mx-auto text-center">
              <h2
                id="comfort-heading"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Simple productivity
              </h2>
              <p className="mt-3 text-xl text-white">
                Endless tasks, limited hours, a single piece of paper. Not
                really a haiku, but we're doing our best here. No kanban boards,
                burndown charts, or tangled flowcharts with our Focus system.
                Just the undeniable urge to fill empty circles.
              </p>
              <a
                href="#"
                className="block w-full px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100 sm:w-auto"
              >
                Shop Focus
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
