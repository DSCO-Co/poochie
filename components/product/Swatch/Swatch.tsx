import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
import cn from 'clsx'
import React from 'react'
import s from './Swatch.module.css'

interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  inStock?: boolean
  variant?: 'size' | 'color' | string
  color?: string
  label?: string | null
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = ({
  active,
  className,
  color = '',
  inStock = true,
  label = null,
  variant = 'size',
  ...props
}) => {
  variant = variant?.toLowerCase()

  console.log('variant: ', variant)

  if (label) {
    label = label?.toLowerCase()
  }

  const swatchClassName = cn(
    s.swatch,
    {
      [s.color]: color,
      [s.active]: active,
      [s.size]: variant === 'size',
      [s.dark]: color ? isDark(color) : false,
      [s.textLabel]: !color && label && label.length > 3,
      [s.dimmed]: !inStock,
    },
    className
  )

  return (
    <Button
      role="option"
      aria-selected={active}
      aria-label={variant && label ? `${variant} ${label}` : 'Variant Swatch'}
      className={swatchClassName}
      {...(label && color && { title: label })}
      style={
        color
          ? { backgroundColor: color }
          : {
              backgroundColor: inStock ? '#ccc' : '#000',
            }
      }
      disabled={!inStock}
      {...props}
    >
      {active && (
        <div className="flex">
          <div className="flex-1 pr-2">
            <Check />
          </div>
          <div>{label}</div>
        </div>
      )}
      {!active ? label : null}
    </Button>
  )
}

export default React.memo(Swatch)
