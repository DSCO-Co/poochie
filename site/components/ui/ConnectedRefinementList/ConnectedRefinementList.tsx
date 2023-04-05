import { connectRefinementList } from 'react-instantsearch-dom'
import React, { useState } from 'react'

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

const CustomRefinementList = ({ items, refine, attribute }) => {
  const [dropdown, setDropdown] = useState(null)

  const handleDropdownClick = (index) => {
    setDropdown(dropdown === index ? null : index)
  }

  return (
    <div className="flex flex-col space-y-2">
      {items.map((item, index) => (
        <div key={item.label}>
          <label className="text-sm leading-5 text-left flex items-center">
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => refine(item.value)}
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
            <div className="ml-4 mt-2">
              <ConnectedSubCategoryRefinementList
                attribute="subCategory"
                parentCategory={item.label}
                categoriesData={categoriesData}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const ConnectedRefinementList = connectRefinementList(CustomRefinementList)

const SubCategoryRefinementList = ({ items, refine, parentCategory, categoriesData }) => {
  const subCategories = categoriesData[parentCategory] || []

  console.log("Subcategories: ", categoriesData[parentCategory]); 
  console.log("Items:", items); 

  return (
    <div className="flex flex-col space-y-2">
      {items
        .filter((item) => subCategories.includes(item.label))
        .map((item) => (
          <label
            key={item.label}
            className="text-sm leading-5 text-left flex items-center"
          >
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => refine(item.value)}
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

const ConnectedSubCategoryRefinementList = connectRefinementList(
  SubCategoryRefinementList
)

export default ConnectedRefinementList
