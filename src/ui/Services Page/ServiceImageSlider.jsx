import { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Responsive image gallery/slider with dot pagination.
 * On mobile (<768px) shows 1 image at a time; on desktop shows 2.
 */
export default function ServiceImageSlider({ images = [], headLine }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  useEffect(() => {
    const updateView = () => {
      setItemsPerView(window.innerWidth >= 768 ? 2 : 1);
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  if (!images.length) return null;

  const totalSlides = Math.ceil(images.length / itemsPerView);
  const gapPercent = (1 / window.innerWidth) * 100; // 1rem gap as %

  return (
    <>
      {/* Slider track */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out gap-x-4 md:gap-x-4 lg:gap-x-5 xl:gap-x-5"
          style={{
            transform: `translateX(-${currentIndex * (100 + gapPercent * itemsPerView)}%)`,
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-none"
              style={{ width: `calc(${100 / itemsPerView}% - 1rem)` }}
            >
              <img
                src={img}
                alt="Service detail"
                className="w-full h-64 lg:h-60 xl:h-80 object-cover md:rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot controls */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`
                w-2.5 xs:w-3 h-2.5 xs:h-3 rounded-full
                transition-all duration-300
                ${currentIndex === idx
                  ? "bg-gray-600 scale-125 shadow-md"
                  : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                }
              `}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Optional headline below slider */}
      {headLine && (
        <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg lg:text-base xl:text-lg">
          <p>{headLine}</p>
        </div>
      )}
    </>
  );
}

ServiceImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  headLine: PropTypes.string,
};
