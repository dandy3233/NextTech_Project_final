import PropTypes from 'prop-types';
import { useState, useMemo, useEffect, useRef } from "react";
import RightArrow from "/GalleryPageImage/RightArrow.png";
import LeftArrow from "/GalleryPageImage/LeftArrow.png";

export default function GalleryCard({ src, alt = "Gallery image", onClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRef = useRef(null);

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

  // Reset index when card data changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [src]);

  const hasMultipleImages = allImages.length > 1;

  // Dynamic card title
  const cardTitle = useMemo(() => {
    if (src?.title && typeof src.title === 'string' && src.title.trim()) {
      const trimmed = src.title.trim();
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    }
    return alt || "Gallery Item";
  }, [src?.title, alt]);

  // Dynamic alt text that changes when currentIndex changes:
  const currentAlt = useMemo(() => {
    if (hasMultipleImages) {
      return `${cardTitle} - Image ${currentIndex + 1} of ${allImages.length}`;
    }
    return `${cardTitle} - Image 1`;
  }, [cardTitle, currentIndex, hasMultipleImages, allImages.length]);

  // Accurate Forward & Backward Scroll Handler (Portfolio method)
  const scrollThumbnailIntoView = (index, behavior = "smooth") => {
    const container = thumbnailRef.current;
    if (!container) return;

    const buttons = container.querySelectorAll("button");
    const targetButton = buttons[index];
    if (!targetButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = targetButton.getBoundingClientRect();

    const relativeLeft = buttonRect.left - containerRect.left + container.scrollLeft;
    const targetScroll = relativeLeft - (container.clientWidth / 2) + (buttonRect.width / 2);

    container.scrollTo({
      left: Math.max(0, targetScroll),
      behavior,
    });
  };

  // Sync scroll on currentIndex change (Forward & Backward sync)
  useEffect(() => {
    scrollThumbnailIntoView(currentIndex);
  }, [currentIndex]);

  // Mouse Wheel & Drag-to-scroll support (Portfolio method)
  useEffect(() => {
    const el = thumbnailRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      if (delta === 0) return;
      e.preventDefault();
      el.scrollBy({
        left: delta * 2,
        behavior: "auto",
      });
    };

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const onMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollStart = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
    };

    const onMouseUp = () => {
      isDown = false;
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 5) {
        e.preventDefault();
        el.scrollLeft = scrollStart - walk;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleThumbnailClick = (e, index) => {
    e.stopPropagation();
    setCurrentIndex(index);
    scrollThumbnailIntoView(index);
  };

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
      <div className="relative w-full h-[20rem] md:h-[22rem] xl:h-[24rem] shrink-0">
        <img
          src={allImages[currentIndex]}
          alt={currentAlt}
          className="
          w-full  h-full object-cover object-top
          transition-transform duration-700"
          loading="lazy"
        />
        {/* Prev / Next buttons */}
        {hasMultipleImages && (
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-[#0097a7]  text-white pt-2 px-1  "
          >
            <img src={LeftArrow}
              className="h-6 w-6 lg:h-5 lg:w-5 xl:w-9 xl:h-8 object-cover"
              alt="" />
          </button>
        )}
        {hasMultipleImages && (
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-[#0097a7] bg-primary   text-white pt-2 px-1    "
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
            bg-black/20 
            px-3 pb-5 pt-3 
          "
          >
            <div
              ref={thumbnailRef}
              className="flex justify-start gap-3 overflow-x-auto flex-nowrap cursor-grab active:cursor-grabbing select-none scrollbar-hide pb-1"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => handleThumbnailClick(e, index)}
                  className={`h-[8vh] w-[12vh] 2xl:w-[11vh] sm:h-[10vh] flex-shrink-0 rounded-sm overflow-hidden border transition-all duration-300
                  ${index === currentIndex
                      ? "border-blue-500"
                    : "border-white/30"
                    }`}
                >
                  <img
                    src={img}
                    className="h-[10vh] w-[13vh] sm:h-[10vh] object-cover pointer-events-none"
                    alt={`${cardTitle} thumbnail ${index + 1}`}
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
          {src.title ? src.title.charAt(0).toUpperCase() + src.title.slice(1) : ''}
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
