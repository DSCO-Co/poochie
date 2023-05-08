import cn from 'clsx'
import s from './ProductTag.module.css'
import { Rating } from '@components/ui'

interface ProductTagProps {
  name: string
  price: number
  basePrice?: number
  currencyCode?: string
  fontSize?: number
  className?: string
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price,
  basePrice,
  currencyCode,
  fontSize = 32,
  className = '',
}) => {
  return (
    <div className={cn(s.root, className)}>
      <h3 className={s.name}>
        <span
          className={cn({ [s.fontsizing]: fontSize < 32 })}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
          }}
        >
          {name}
        </span>
      </h3>
      <div className="flex flex-row justify-start items-center">
        <Rating value={0} />
        <div className="text-accent-6 pr-1 font-medium text-sm">
          &nbsp;&nbsp;&nbsp;No reviews yet
        </div>
      </div>
      <div className={s.price}>
        {basePrice && basePrice > price && (
          <span className="line-through">{`$${basePrice}`}</span>
        )}
        {` $${price} ${currencyCode}`}
      </div>
    </div>
  )
}

export default ProductTag
