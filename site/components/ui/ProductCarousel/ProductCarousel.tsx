import type { Product } from '@commerce/types/product'
import React, { useEffect, useRef, useState } from 'react'
import ProductCard from '../../product/ProductCard'

interface CarouselProps {
  products: Product[]
}

const getVisibleCards = (windowWidth: number) => {
  if (windowWidth <= 640) return 1 // Change to 1 for larger product cards on mobile
  if (windowWidth > 640 && windowWidth <= 768) return 3
  if (windowWidth > 768 && windowWidth <= 1024) return 4
  if (windowWidth >= 1500) return 8
  return 4
}

const ProductCarousel: React.FC<CarouselProps> = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const [visibleCards, setVisibleCards] = useState<number>()

  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards(window.innerWidth))
    }

    if (typeof window !== 'undefined') {
      setVisibleCards(getVisibleCards(window.innerWidth))
      window.addEventListener('resize', handleResize)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const slideLeft = () => {
    if (visibleCards) {
      setCurrentSlide(
        (prev) => (prev - visibleCards + products.length) % products.length
      )
    }
  }

  const slideRight = () => {
    if (visibleCards) {
      setCurrentSlide((prev) => (prev + visibleCards) % products.length)
    }
  }

  return visibleCards ? (
    <>
      <div className="flex items-center justify-center mt-2 mb-2 md:my-20">
        <div className="flex-grow inline-block h-1 max-w-xs mx-5 bg-black rounded-full"></div>
        <h2 className="mx-5 text-2xl font-bold tracking-wider uppercase">
          Top Sellers
        </h2>
        <div className="flex-grow inline-block h-1 max-w-xs mx-5 bg-black rounded-full"></div>
      </div>
      <div className="relative">
        <button
          onClick={slideLeft}
          className="absolute z-10 px-4 py-2 text-5xl text-black transform -translate-y-1/2 bg-transparent left-5 top-1/2"
        >
          ‹
        </button>
        <div
          ref={sliderRef}
          className="flex mx-auto overflow-hidden transition-transform duration-500 ease-in"
        >
          <div className="relative p-4 bg-primary">
            <div className="flex items-center justify-center w-full mx-4 space-x-2 max-h-100 md:space-x-4">
              {products
                .slice(currentSlide, currentSlide + visibleCards)
                .concat(
                  products.slice(
                    0,
                    (currentSlide + visibleCards) % products.length
                  )
                )
                .slice(0, visibleCards)
                .map((product, index) => (
                  <div
                    key={`${product.path}-${currentSlide}-${visibleCards}`}
                    className="mx-auto max-h-100 max-w-80 md:max-w-xs"
                  >
                    <ProductCard
                      variant="simple-stylized"
                      className={`animated fadeIn transition-transform duration-500 mx-2 -ml-2`}
                      product={product}
                      imgProps={{
                        width: 480,
                        height: 480,
                        alt: product.name,
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <button
          onClick={slideRight}
          className="absolute z-10 px-4 py-2 text-5xl text-black transform -translate-y-1/2 bg-transparent right-5 top-1/2"
        >
          ›
        </button>
      </div>
    </>
  ) : null
}

export default ProductCarousel
