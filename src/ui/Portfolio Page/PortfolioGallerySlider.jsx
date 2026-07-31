import { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Responsive image gallery slider with dot pagination.
 * Breakpoints: xl/lg → 3 cols, sm/md → 2 cols, xs → 1 col.
 */
export default function PortfolioGallerySlider({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  if (!images.length) return null;

  const totalSlides = Math.ceil(images.length / itemsPerView);
  const showDots = images.length > itemsPerView;
  const gapPercent = (1 / window.innerWidth) * 100; // 1rem gap as %

  return (
    <div className="mb-12 xs:mb-14 sm:mb-16 md:mb-20 lg:mb-16 xl:mb-24">
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-out gap-x-4 md:gap-x-4 xl:gap-x-6"
          style={{
            transform: `translateX(-${currentIndex * (100 + gapPercent * itemsPerView)}%)`,
          }}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex-none"
              style={{ width: `calc(${100 / itemsPerView}% - 1rem)` }}
            >
              <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img
                  src={img}
                  alt={`Project gallery ${idx + 1}`}
                  className="w-full h-48 sm:h-56 md:h-60 lg:h-60 xl:h-72 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDots && (
        <div className="flex justify-center gap-3 mt-16 lg:mt-10 xl:mt-12 2xl:mt-16">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`
                w-2.5 lg:w-2.5 h-2.5 lg:h-2.5 xl:w-3 xl:h-3 rounded-full
                transition-all duration-300
                ${currentIndex === idx
                  ? "bg-gray-600 scale-125 shadow-md"
                  : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                }
              `}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

PortfolioGallerySlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};
