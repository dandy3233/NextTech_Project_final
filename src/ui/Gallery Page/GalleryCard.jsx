import PropTypes from 'prop-types';
import { useState, useMemo } from "react";
import RightArrow from "/GalleryPageImage/RightArrow.png";
import LeftArrow from "/GalleryPageImage/LeftArrow.png";

export default function GalleryCard({ src, alt = "Gallery image", onClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract images array directly from backend object
  const allImages = useMemo(() => {
    if (!src || typeof src !== 'object') return [];

    const combinedImages = [];
    if (src.coverImage) combinedImages.push(src.coverImage);

    if (Array.isArray(src.images)) {
      src.images.forEach(img => {
        if (img && img !== src.coverImage) combinedImages.push(img);
      });
    }

    return combinedImages;
  }, [src]);

  const hasMultipleImages = allImages.length > 1;
  const prev = (e) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i === 0 ? allImages.length - 1 : i - 1));
  };
  const next = (e) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i === allImages.length - 1 ? 0 : i + 1));
  };

  return (
    // <div 
    //   className="
    //     group relative overflow-hidden rounded-xl 
    //     shadow-lg hover:shadow-2xl transition-all duration-500 
    //     cursor-pointer bg-gray-100 h-[340px] sm:h-[325px]    lg:h-[325px] xl:h-[395px]  2xl:min-h-[500px] 
    //   "
    //   onClick={onClick}
    // >
    //     <div 
    //   className="
    //     group relative overflow-hidden rounded-xl 
    //     shadow-lg hover:shadow-2xl transition-all duration-500 
    //     cursor-pointer bg-gray-100 

    //     /* Responsive Heights in vh */
    //     min-h-[46vh]          /* Default (Mobile) ~340px */
    //     sm:h-[55vh]       /* ~325px (Adjusted for landscape) */
    //     lg:h-[50vh]       /* ~325px */
    //     xl:min-h-[60vh] xl:min-w-[27vw]       /* ~395px */          
    //   "
    //   onClick={onClick}
    // >
    <div
      className="
    group flex flex-col overflow-hidden rounded-xl 
    shadow-lg hover:shadow-2xl transition-all duration-500 
    cursor-pointer bg-gray-100 
    w-full h-full lg:ml-5
  "
      onClick={onClick}
    >
      {/* Image & Carousel Wrapper */}
      <div className="relative w-full h-[260px] sm:h-[280px] xl:h-[300px] shrink-0">
        <img
          src={allImages[currentIndex]}
          alt={alt}
          className="
          w-full  h-full object-cover object-top
          transition-transform duration-700"
          loading="lazy"
        />
        {/* Prev / Next buttons */}
        {hasMultipleImages && (
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#00A3E0] hover:bg-[#0097a7]  text-white pt-2 px-1  "
          >
            <img src={LeftArrow}
              className="h-6 w-6 lg:h-5 lg:w-5 xl:w-7 xl:h-8 object-cover"
              alt="" />
          </button>
        )}
        {hasMultipleImages && (
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-[#0097a7] bg-[#00A3E0]   text-white pt-2 px-1    "
          >
            <img src={RightArrow}
              className=" h-6 w-6 lg:h-5 lg:w-5 xl:w-8 xl:h-8 object-cover "
              alt="" />
          </button>
        )}


        {/* Subtle hover overlay */}
        {/* THUMBNAIL OVERLAY */}
        {hasMultipleImages && (
          <div
            className="
            absolute bottom-0 left-0 right-0 z-10
            bg-black/60 
            px-3 pb-5 pt-3 
          "
          >
            <div className=" flex justify-start gap-2 overflow-x-auto flex-nowrap scrollbar-hide ">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`h-[10vh] w-[12vh] sm:h-[10vh] flex-shrink-0  rounded-sm overflow-hidden border
                  ${index === currentIndex
                      ? "border-blue-500"
                      : "border-white/30"
                    }`}
                >
                  <img
                    src={img}
                    className="h-[10vh] w-[12vh]  sm:h-[10vh]  object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Description Div */}
      <div className="p-5 flex flex-col gap-2 flex-grow bg-white border-t border-gray-50">
        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#00A3E0] transition-colors duration-300">
          {src.title}
        </h3>
        {src.description && (
          <p className="text-sm text-gray-500 leading-relaxed">
            {src.description}
          </p>
        )}
      </div>

    </div>
  );
}

GalleryCard.propTypes = {
  src: PropTypes.shape({
    coverImage: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};
