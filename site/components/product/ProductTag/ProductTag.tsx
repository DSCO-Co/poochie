import cn from 'clsx'
import s from './ProductTag.module.css'
import { Rating } from '@components/ui'

interface ProductTagProps {
  className?: string
  name: string
  price: string
  fontSize?: number
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price,
  className = '',
  fontSize = 32,
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
      <div className={s.price}>{price}</div>
    </div>
  )
}

export default ProductTag
