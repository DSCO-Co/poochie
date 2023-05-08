import type { ProductOption, ProductVariant } from '@commerce/types/product'
import { Swatch } from '@components/product'
import { memo } from 'react'
import { SelectedOptions } from '../helpers'

interface ProductOptionsProps {
  options: ProductOption[]
  variants: ProductVariant[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

// keeping this in for demo purposes
// const variants = [
//   {id: '1009', options: [{displayName: 'Size', values: [{ label: 'XS' }]}, {displayName: 'Color', values: [{ label: 'Black' }]}], defaultImage: null, isPurchasable: true,},
//   {id: '1010', options: [{displayName: 'Size', values: [{ label: 'S' }]}, {displayName: 'Color', values: [{ label: 'Black' }]}], defaultImage: null, isPurchasable: true,},
//   {id: '1011', options: [{displayName: 'Size', values: [{ label: 'M' }]}, {displayName: 'Color', values: [{ label: 'Black' }]}], defaultImage: null, isPurchasable: true,},
//   {id: '1012', options: [{displayName: 'Size', values: [{ label: 'L' }]}, {displayName: 'Color', values: [{ label: 'white' }]}], defaultImage: null, isPurchasable: true,},
//   {id: '1013', options: [{displayName: 'Size', values: [{ label: 'XL' }]}, {displayName: 'Color', values: [{ label: 'white' }]}], defaultImage: null, isPurchasable: true,},
//   {id: '1014', options: [{displayName: 'Size', values: [{ label: 'XXL' }]}, {displayName: 'Color', values: [{ label: 'white' }]}], defaultImage: null, isPurchasable: true,},
// ]

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  variants,
  selectedOptions,
  setSelectedOptions,
}) => {
  const getAvailableOptions = (option: ProductOption) => {
    const availableOptions = new Set()
    variants.forEach((variant) => {
      if (variant.isPurchasable) {
        let flag = true
        for (const opt in selectedOptions) {
          const label = variant.options
            .find((o) => o.displayName.toLowerCase() === opt)
            ?.values[0].label.toLowerCase()
          if (
            selectedOptions[opt] === label ||
            opt === option.displayName.toLowerCase()
          ) {
            continue
          }
          flag = false
        }
        if (flag) {
          const label = variant.options
            .find(
              (opt) =>
                opt.displayName.toLowerCase() ===
                option.displayName.toLowerCase()
            )
            ?.values[0].label.toLowerCase()
          availableOptions.add(label)
        }
      }
    })
    return availableOptions
  }

  const getSelect = (opt: ProductOption) => {
    const available = getAvailableOptions(opt)
    console.log(`
    ---
      ${JSON.stringify(opt)}
    --++
    `)
    return opt.values.map((v, i: number) => {
      const active =
        selectedOptions[opt.displayName.toLowerCase()] === v.label.toLowerCase()
      console.log(`
          Product Options:
          -----------
          v: ${JSON.stringify(v)}
          option: ${JSON.stringify(opt)}
          active: ${JSON.stringify(active)}
          available: ${JSON.stringify(available)}
        `)
      return (
        <Swatch
          key={`${opt.id}-${i}`}
          active={active}
          variant={opt.displayName}
          inStock={available.has(v.label.toLowerCase())}
          color={v.hexColors ? v.hexColors[0] : ''}
          label={v.label}
          onClick={() => {
            if (active) {
              const newOptions = { ...selectedOptions }
              delete newOptions[opt.displayName.toLowerCase()]
              setSelectedOptions(newOptions)
              return
            } else {
              setSelectedOptions((selectedOptions) => {
                return {
                  ...selectedOptions,
                  [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                }
              })
            }
          }}
        />
      )
    })
  }

  return (
    <div>
      <>
        {console.log(`YO ====> ${JSON.stringify(options)}`)}
      </>
      {options.map((opt) => (
        <div className="pb-4" key={opt.displayName}>
          <h2 className="text-sm font-medium tracking-wide uppercase">
            {opt.displayName}
          </h2>
          <div role="listbox" className="flex flex-row py-4">
            {getSelect(opt)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(ProductOptions)
