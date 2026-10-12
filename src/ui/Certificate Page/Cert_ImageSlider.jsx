import { useState } from "react";
import PropTypes from 'prop-types';

export default function CertificateHero({ certificateImages = [] }) {
  const safeImages = Array.isArray(certificateImages) ? certificateImages.filter(Boolean) : [];

  const [currentPage, setCurrentPage] = useState(0);

  const IMAGES_PER_SLIDE = 2;
  const totalPages = Math.ceil(safeImages.length / IMAGES_PER_SLIDE);

  // Pick 2 images for the current slide
  const leftImage  = safeImages[currentPage * IMAGES_PER_SLIDE]     || null;
  const rightImage = safeImages[currentPage * IMAGES_PER_SLIDE + 1] || null;

  if (!leftImage && !rightImage) return null;

  return (
    <div className="w-full pb-2 2xl:pb-12">

      {/* LEFT and RIGHT — both from certificateImages, 2 per slide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* LEFT image */}
        {leftImage && (
          <img
            src={leftImage}
            alt="certificate image"
            className="w-full h-[300px] md:h-[400px] lg:h-[480px] 2xl:h-[28rem] object-cover"
          />
        )}

        {/* RIGHT image */}
        {rightImage && (
          <img
            src={rightImage}
            alt="certificate image"
            className="w-full h-[300px] md:h-[400px] lg:h-[480px] 2xl:h-[28rem] object-cover"
          />
        )}
      </div>

      {/* Dots — 1 dot per slide (every 2 images) */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1 pt-6 lg:pt-12 pb-10">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full transition-all duration-300 ${
                idx === currentPage
                  ? "bg-[#1e3a5f] scale-125 shadow-md"
                  : "bg-sky-200 hover:bg-sky-300 hover:scale-110"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

CertificateHero.propTypes = {
  certificateImage: PropTypes.string,
  certificateImages: PropTypes.arrayOf(PropTypes.string),
};