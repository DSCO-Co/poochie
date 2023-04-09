import type { Product } from '@commerce/types/product'
import { ImageProps } from 'next/image'
export interface ProductCardProps {
    className?: string
    product: Product
    noNameTag?: boolean
    imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
    variant?:
    'default' |
    'slim' |
    'simple' |
    'simple-stylized' |
    'algolia-stylized' |
    'callout'
}
