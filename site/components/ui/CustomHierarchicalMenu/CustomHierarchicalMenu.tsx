import { useHierarchicalMenu } from 'react-instantsearch-hooks-web'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import path from 'path'

type HierarchicalMenuItem = {
  /**
   * Value of the menu item.
   */
  value: string
  /**
   * Human-readable value of the menu item.
   */
  label: string
  /**
   * Number of matched results after refinement is applied.
   */
  count: number
  /**
   * Indicates if the refinement is applied.
   */
  isRefined: boolean
  /**
   * n+1 level of items
   */
  data: HierarchicalMenuItem[] | null
}

function routeFormatter(str) {
  return str
    .replace(/&/g, '') // Remove '&'
    .replace(/\s+/g, '-') // Replace spaces with '-'
    .toLowerCase() // Convert to lower case
}

const getCategoryItemFromRouteName = (
  routeName: string,
  items: HierarchicalMenuItem[]
) => {
  for (const i in items) {
    if (routeName === routeFormatter(items[i].value)) {
      return items[i]
    }
  }
  return null
}

const CustomHierarchicalMenu = ({ attributes, limit }) => {
  const { items, refine } = useHierarchicalMenu({ attributes, limit })
  const router = useRouter()
  const [initialCategoryItem, setInitialCategoryItem] = useState(null)

  useEffect(() => {
    if (items && items.length > 0) {
      const categoryItem = getCategoryItemFromRouteName(
        router.asPath.split('collections/')[1],
        items
      )
      //@ts-ignore
      if (categoryItem && categoryItem.value !== initialCategoryItem?.value) {
        //@ts-ignore
        setInitialCategoryItem(categoryItem)
        refine(categoryItem.value)
      }
    }
  }, [
    router.asPath.split('collections/')[1],
    initialCategoryItem,
  ])

  const handleItemClick = (item) => {

    const formattedCategory = routeFormatter(item.value)
    router.push(`/collections/${formattedCategory}`, undefined, {
      shallow: true,
    })
  }

  return (
    <div className="flex flex-col space-y-2">
      {items.map((item) => (
        <div key={item.label}>
          <label className="flex items-center text-sm leading-5 text-left">
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => handleItemClick(item)}
              className="mr-2 focus:ring-0 focus:outline-none"
            />
            <span
              className={`${
                item.isRefined ? 'text-accent-8 underline' : 'text-accent-4'
              } hover:text-accent-5 focus:outline-none focus:text-accent-5`}
            >
              {item.label}
            </span>
          </label>
          {item.data && (
            <div className="mt-2 ml-4">
              {item.data.map((subItem) => (
                <label
                  className="flex items-center text-sm leading-5 text-left mt-1"
                  key={subItem.label}
                >
                  <input
                    type="checkbox"
                    checked={subItem.isRefined}
                    onChange={() => handleItemClick(subItem)}
                    className="mr-2 focus:ring-0 focus:outline-none"
                  />
                  <span
                    className={`${
                      subItem.isRefined
                        ? 'text-accent-8 underline'
                        : 'text-accent-4'
                    } hover:text-accent-5 focus:outline-none focus:text-accent-5`}
                  >
                    {subItem.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CustomHierarchicalMenu
