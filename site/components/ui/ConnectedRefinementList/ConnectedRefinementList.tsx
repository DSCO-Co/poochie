import { useEffect, useMemo, useState } from 'react'
import { useRefinementList } from 'react-instantsearch-hooks-web'

const categoriesData = {
  Apparel: [
    'Dog Sweaters',
    'Dog Coats & Jackets',
    'Dog Tops & Tees',
    'Accessories',
  ],
  Toys: ['Birthday Toys', 'Food & Drink Toys', 'Fashion Toys', 'Toy Sets'],
  'Collars & Leashes': [
    'Dog Leashes & Harnesses',
    'Dog Collar & Leash Sets',
    'Dog Collars',
  ],
  Home: ['Dog Blankets', 'Dog Bowls', 'Dog Beds'],
  Cat: ['Cat Beds & Blankets', 'Cat Clothing', 'Leashes & Harnesses'],
  Collections: [
    'Fast Shipping',
    'New Arrivals',
    'Best Sellers',
    'Poochie',
    'Pawda',
    'Dogior',
    'Chewy Vuiton',
  ],
}

const routeMapping = {
  apparel: 'Apparel',
  'dog-sweaters': 'Dog Sweaters',
  'dog-coats-jackets': 'Dog Coats & Jackets',
  'dog-tops-tees': 'Dog Tops & Tees',
  accessories: 'Accessories',
  toys: 'Toys',
  'birthday-toys': 'Birthday Toys',
  'food-drink-toys': 'Food & Drink Toys',
  'fashion-toys': 'Fashion Toys',
  'toy-sets': 'Toy Sets',
  'collars-leashes': 'Collars & Leashes',
  'dog-leashes-harnesses': 'Dog Leashes & Harnesses',
  'dog-collar-leash-sets': 'Dog Collar & Leash Sets',
  'dog-collars': 'Dog Collars',
  home: 'Home',
  'dog-blankets': 'Dog Blankets',
  'dog-bowls': 'Dog Bowls',
  'dog-beds': 'Dog Beds',
  cat: 'Cat',
  'cat-beds-blankets': 'Cat Beds & Blankets',
  'cat-clothing': 'Cat Clothing',
  'leashes-harnesses': 'Leashes & Harnesses',
  collections: 'Collections',
  'fast-shipping': 'Fast Shipping',
  'new-arrivals': 'New Arrivals',
  'best-sellers': 'Best Sellers',
  poochie: 'Poochie',
  pawda: 'Pawda',
  dogior: 'Dogior',
  'chewy-vuiton': 'Chewy Vuiton',
}

const CustomRefinementList = ({ attribute, limit, initial }) => {
  const [dropdown, setDropdown] = useState(-1)
  const [initialDropdownSet, setInitialDropdownSet] = useState(false)

  const { items, refine } = useRefinementList({ attribute, limit })

  const handleDropdownClick = (index) => {
    setDropdown(dropdown === index ? -1 : index)
  }

  useEffect(() => {
    if (routeMapping[initial]) {
      const initialValue = routeMapping[initial]
      const isCategory = Object.values(categoriesData).some((subcategories) =>
        subcategories.includes(initialValue)
      )
      if (!isCategory && attribute === 'category') {
        refine(initialValue)
      }
    }
  }, [initial, attribute, refine])

  useEffect(() => {
    if (routeMapping[initial] && !initialDropdownSet) {
      const initialValue = routeMapping[initial]
      const parentIndex = items.findIndex((item) =>
        categoriesData[item.label]?.includes(initialValue)
      )
      if (parentIndex !== -1) {
        setDropdown(parentIndex)
        setInitialDropdownSet(true)
      }
    }
  }, [items, initial, initialDropdownSet])

  return (
    <div className="flex flex-col space-y-2">
      {items.map((item, index) => (
        <div key={item.label}>
          <label className="flex items-center text-sm leading-5 text-left">
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => {
                refine(item.value)
                console.log(item, typeof item.value)
              }}
              className="mr-2 focus:ring-0 focus:outline-none"
            />
            <button
              onClick={() => handleDropdownClick(index)}
              className={`${
                item.isRefined ? 'text-accent-8 underline' : 'text-accent-4'
              } hover:text-accent-5 focus:outline-none focus:text-accent-5`}
            >
              {item.label}
            </button>
          </label>
          {dropdown === index && attribute === 'category' && (
            <div className="mt-2 ml-4">
              <ConnectedSubCategoryRefinementList
                attribute="subCategory"
                parentCategory={item.label}
                categoriesData={categoriesData}
                limit={limit}
                initial={initial}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const ConnectedRefinementList = CustomRefinementList
const SubCategoryRefinementList = ({
  attribute,
  parentCategory,
  categoriesData,
  limit,
  initial,
}) => {
  const { items, refine, canRefine } = useRefinementList({ attribute, limit })

  const subCategories = useMemo(() => {
    return categoriesData[parentCategory] || []
  }, [categoriesData, parentCategory])

  useEffect(() => {
    if (routeMapping[initial]) {
      const initialValue = routeMapping[initial]
      if (subCategories.includes(initialValue)) {
        refine(initialValue)
      }
    }
  }, [initial, refine, subCategories])

  return (
    <div className="flex flex-col space-y-2">
      {items
        .filter((item) => subCategories.includes(item.label))
        .map((item) => (
          <label
            key={item.label}
            className="flex items-center text-sm leading-5 text-left"
          >
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => {
                console.log(item, typeof item.value)
                refine(item.value)
                console.log(item.isRefined)
              }}
              className="mr-2 focus:ring-0 focus:outline-none"
            />
            <span className="text-accent-4 hover:text-accent-5 focus:text-accent-5">
              {item.label}
            </span>
          </label>
        ))}
    </div>
  )
}

const ConnectedSubCategoryRefinementList = SubCategoryRefinementList

export default ConnectedRefinementList
