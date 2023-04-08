
import Image from "next/image";
import { useState } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export function HeroCarousel({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        let newSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

    const handlePrevSlide = () => {
        let newSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
    };

    return (
        <div className="relative">
            <AiOutlineLeft
                onClick={handlePrevSlide}
                className="absolute left-0 z-20 m-auto text-5xl text-gray-400 cursor-pointer inset-y-1/2"
            />
            <div className="w-full min-h-[50vh] sm:min-h-[70vh] flex overflow-hidden relative m-auto">
                <Swipe
                    onSwipeLeft={handleNextSlide}
                    onSwipeRight={handlePrevSlide}
                    className="relative z-10 w-full h-full"
                >
                    {slides.map((slide, index) => {
                        if (index === currentSlide) {
                            return (
                                <div
                                    key={`carousel-${slide.id}`}
                                    className="relative px-6 pt-8 pb-64 sm:py-60 sm:px-12 lg:px-16">
                                    <div className="absolute inset-0">
                                        <Image
                                            key={slide.id}
                                            src={slide.image}
                                            alt={slide.alt}
                                            width={1658}
                                            height={1400}
                                            className="w-full animate-fadeIn min-h-[50vh] sm:min-h-[70vh] object-cover object-center"
                                        />
                                    </div>
                                    <div className="relative flex flex-col items-center max-w-4xl mx-auto text-center">
                                        <h2 className="pt-20 tracking-widest text-white text-8xl sm:pt-0 font-extralight sm:text-8xl">{slide.title}</h2>
                                        <p className="mt-3 text-xl text-white">{slide.subtitle}</p>
                                        <a
                                            href="#"
                                            className="block px-16 py-4 mt-8 font-medium text-white bg-transparent border-4 hover:bg-black hover:border-transparent sm:w-auto"
                                        >{slide.button}</a>
                                    </div>
                                </div>

                            );
                        }
                    })}
                </Swipe>
            </div>
            <AiOutlineRight
                onClick={handleNextSlide}
                className="absolute right-0 z-20 m-auto text-5xl text-gray-400 cursor-pointer inset-y-1/2"
            />

            <div className="relative flex justify-center p-2">
                {slides.map((_, index) => {
                    return (
                        <div
                            className={
                                index === currentSlide
                                    ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                                    : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                            }
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

