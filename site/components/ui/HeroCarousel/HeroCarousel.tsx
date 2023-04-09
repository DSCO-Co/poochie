import { Carousel } from 'flowbite-react'
import Image from 'next/image'

const HeroCarousel = ({ slides, useTimer = false, time = 5000 }) => {
  return (
    <Carousel slideInterval={time}>
      {slides.map((slide, index) => {
        return (
          <div
            key={`carousel-${slide.id}`}
            className="relative min-h-[80vh] px-6 pt-8 pb-64 sm:py-60 sm:px-12 lg:px-16"
          >
            <div className="absolute inset-0">
              <Image
                key={slide.id}
                src={slide.image}
                alt={slide.alt}
                width={1658}
                height={1400}
                className="w-full animate-fadeIn min-h-[80vh] sm:min-h-[70vh] object-cover object-center"
              />
            </div>
            <div className="relative flex flex-col items-center max-w-5xl mx-auto text-center">
              <h2 className="pt-20 tracking-widest text-black uppercase text-8xl sm:pt-0 font-extralight sm:text-8xl">
                {slide.title}
              </h2>
              <a
                href="#"
                className="block px-16 py-4 mt-8 font-medium text-black bg-transparent border-4 border-black hover:bg-black hover:text-white hover:border-transparent sm:w-auto"
              >
                {slide.button}
              </a>
            </div>
          </div>
        )
      })}
    </Carousel>
  )
}

export default HeroCarousel
