import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { heroSlides } from '../../data/HomePageData.js';
import { IoIosArrowForward } from "react-icons/io";
import heroBg from "/HomePageImages/Home-Hero-Section-Cover-Image.png";
import { Link } from "react-router-dom";
import Button from "../Button.jsx";
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? heroSlides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === heroSlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section
      className="relative w-full overflow-hidden pt-[9rem] lg:px-24 lg:pt-[250px] xl:pt-[194px] md:pt-[140px] pb-11 lg:pb-[130px] md:pb-[20px] xl:pb-[80px] 2xl:pb-[30px]
                 bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >

      <div className="max-w-6xl lg:max-w-[1400px] mx-auto px-6 lg:px-4 xl:max-w-[1650px]">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-16 lg:gap-24">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-8 lg:space-y-12 text-left">
            <h1 className="text-4xl sm:text-5xl lg:mt-[5.5rem] md:text-6xl lg:text-6xl xl:text-[80px]  font-bold tracking-tight leading-none">
              <span className="text-secondary block mb-3 lg:mb-9">Innovative Tech</span>
              <span className="text-primary block">Solution</span>
            </h1>

            <p className="text-[#666666] text-base md:text-lg lg:text-base leading-relaxed max-w-xl">
              Founded in 2009, NextTech is a private company dedicated to providing innovative technological solutions in the world.
            </p>

            <div className="pt-4 lg:pt-1 lg:ml-5">
              <Button
                as={Link}
                to="/contacts"
                variant="primary"
                size="lg"
                iconAfter={IoIosArrowForward}>
                Get Started
              </Button>
            </div>
          </div>








          {/* RIGHT IMAGE SLIDER */}
          <div className="w-[90%] lg:w-[28%] xl:w-[30%] 2xl:w-[30%] relative mt-4 lg:mt-0 flex flex-col items-center pr-8 lg:pr-0 lg:mr-11">

            <div className="relative z-10 w-full aspect-[5/5] md:aspect-[4/5] rounded-[11px] lg:rounded-[35px] overflow-hidden">
              <img
                key={currentIndex}
                src={heroSlides[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>

            <div
              className="
                absolute 
                bottom-0 lg:bottom-[0%] 
                left-0 right-8 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 
                w-auto lg:w-[120%]
                bg-primary/80 lg:bg-primary/80 backdrop-blur-sm lg:backdrop-blur-none
                py-3 px-4 sm:px-6 lg:py-5 lg:px-4 xl:py-6
                rounded-b-[11px] lg:rounded-[25px]  
                flex items-center justify-between 
                z-20
              "
            >
              <div className="text-white flex flex-col lg:ml-7">
                <p className="text-[18px] sm:text-[14px] lg:text-[20px] font-medium leading-none mb-1 sm:mb-[20px]">
                  We have
                </p>

                <p className="text-[20px] sm:text-[32px] lg:text-[37px] font-bold text-[#0B2A4A] leading-none mb-1.5 sm:mb-[20px]">
                  25k+
                </p>

                <p className="text-[11px] sm:text-[13px] lg:text-[14px] font-normal leading-none">
                  World Wide Customer
                </p>
              </div>

              <div className="flex -space-x-2 sm:-space-x-3 lg:-space-x-5 lg:px-8 items-center">
                {heroSlides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide}
                    className={`w-10 h-10 sm:w-14 sm:h-14 lg:w-14 lg:h-14 rounded-full border-2 border-white object-cover ${index === 3 ? 'hidden lg:block' : ''
                      }`}
                    alt="avatar"
                  />
                ))}
              </div>
            </div>

            {/* Left Arrow Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute -left-2 md:-left-[-0.125rem] top-[38%] md:top-[46%] -translate-y-1/2 z-30 w-14 h-14 sm:w-11 sm:h-11 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-transparent md:bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-none md:shadow-md"
            >
              <FaArrowLeft size={18} className="sm:text-[20px]" />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-6 md:-right-[-2.125rem] lg:md:-right-[-0.125rem] top-[38%] md:top-[46%] -translate-y-1/2 z-30 w-14 h-14 sm:w-11 sm:h-11 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-transparent md:bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-none md:shadow-md"
            >
              <FaArrowRight size={18} className="sm:text-[20px]" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
