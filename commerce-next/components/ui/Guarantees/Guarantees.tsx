import Image from 'next/image'
const incentives = [
  {
    name: 'Quick Shipping',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description: 'Get it fast — most items ship in only a few days.',
  },
  {
    name: 'Quality Guarantee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description: 'High Quality guaranteed.',
  },
  {
    name: '30-Day Exchanges',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "If you don't like it, send it back. We're not happy until you're happy.",
  },
]

const Guarantees = () => {
  return (
    <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="px-6 py-16 bg- rounded-2xl bg-primary-accent-0 sm:p-16">
        <div className="max-w-xl mx-auto lg:max-w-none">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customer Satisfaction Guaranteed
            </h2>
          </div>
          <div className="grid max-w-sm grid-cols-1 mx-auto mt-12 gap-x-8 gap-y-10 sm:max-w-none lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div
                key={incentive.name}
                className="text-center sm:flex sm:text-left lg:block lg:text-center"
              >
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <Image
                      className="w-16 h-16 mx-auto"
                      src={incentive.imageSrc}
                      width={64}
                      height={64}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-sm font-medium text-accent-6">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-accent-6">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Guarantees
