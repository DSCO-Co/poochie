import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../../product/ProductCard';
import type { Product } from '@commerce/types/product';

interface CarouselProps {
  products: Product[];
}

const getVisibleCards = (windowWidth: number) => {
  if (windowWidth <= 640) return 2;
  if (windowWidth > 640 && windowWidth <= 768) return 3;
  if (windowWidth > 768 && windowWidth <= 1024) return 4;
  return 4;
};

const ProductCarousel: React.FC<CarouselProps> = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [visibleCards, setVisibleCards] = useState<number>();

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards(window.innerWidth));
    };

    if (typeof window !== 'undefined') {
      setVisibleCards(getVisibleCards(window.innerWidth));
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slideLeft = () => {
    setCurrentSlide((prev) => (prev - visibleCards + products.length) % products.length);
  };

  const slideRight = () => {
    setCurrentSlide((prev) => (prev + visibleCards) % products.length);
  };

  return visibleCards ? (
    <div className="relative max-h-180">
      <button
        onClick={slideLeft}
        className="absolute left-5 top-1/2 text-5xl transform -translate-y-1/2 z-10 text-black bg-transparent px-4 py-2"
      >
        ‹
      </button>
      <div
        ref={sliderRef}
        className="flex transition-transform duration-500 ease-in overflow-hidden mx-20"
      >
        <div className="relative bg-white p-4">
          <div className="mx-4 max-h-100 w-full flex justify-center">
            {products
                .slice(currentSlide, currentSlide + visibleCards)
                .concat(products.slice(0, (currentSlide + visibleCards) % products.length))
                .slice(0, visibleCards)
              .map((product, index) => (

                <div className='max-h-100 max-w-80'> 
                <ProductCard
                  variant="simple"
                  key={`${product.path}-${currentSlide}-${visibleCards}`}
                  className={`animated fadeIn transition-transform duration-500 mx-2`}
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
        className="absolute right-5 text-5xl top-1/2 transform -translate-y-1/2 z-10 text-black bg-transparent px-4 py-2"
      >
        ›
      </button>
    </div>
  ) : null;
};

export default ProductCarousel;
