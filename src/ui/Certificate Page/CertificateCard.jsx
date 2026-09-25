// src/ui/GalleryCard.jsx
import PropTypes from 'prop-types';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CertificateCard({ item }) {
  const [currentIndex] = useState(0);
  const navigate = useNavigate();
  const images = item.certificateImage ? [item.certificateImage] : [];
  const description = item.certificateDescription;
  const title = item.certificateName;
  const goToDetail = () => {
    navigate(`/certificate/${item._id}`);
  };
  // const truncateWords = (text, wordLimit = 5) => {
  //   if (!text) return "";
  //   const words = text.split(" ");
  //   return words.length > wordLimit
  //     ? words.slice(0, wordLimit).join(" ") + "..."
  //     : text;
  // };

  return (
    <div className="group ">
      <div
        className="
        relative overflow-hidden  
        shadow-lg  transition-all duration-500 
        cursor-pointer bg-gray-100  
      "
        onClick={goToDetail}
      >
        <img
          src={images[currentIndex]}
          alt="certificate image"
          className="
          xl:w-[full] h-[350px] sm:h-[200px] md:h-[250px] xl:h-[345px] lg:h-[265px]  2xl:min-h-[408px] object-cover object-top
          transition-transform duration-700 
          group-hover:scale-110          
        "        loading="lazy"
        />

        {/* Subtle hover overlay */}
        {/* THUMBNAIL OVERLAY */}
        <div className="absolute -top-6  sm:-top-2 lg:-top-4  2xl:-top-6 right-0  w-20 h-28 sm:w-12 sm:h-14 md:w-14 md:h-16 lg:w-16 lg:h-20 xl:min-h-24 xl:min-w-24 xl:max-h-32 2xl:min-h-32 2xl:min-w-24 xl:max-w-24   bg-black/30 rounded-bl-3xl p-0 shadow-lg ">
          <img
            src="/CertificatePageImage/Certificate_Icon.png"
            alt="Certificate icon"
            className="w-full h-full  object-contain px-2 sm:px-1.5 "
          />
        </div>
      </div>
      <div className="pt-5 pb-5 sm:pb-1 ">
        <h1 className="font-extrabold lg:w-[18rem]  xl:w-[20rem] truncate
      text-base sm:text-base md:text-lg lg:text-base xl:text-xl   2xl:text-2xl  text-[#151515] group-hover:text-[#04A9C1] pb-1">
          {title}  </h1>
       <p className="font-normal lg:w-[17rem] text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-xl text-[#666666] truncate">
  {description}
</p>
      </div>
    </div>

  );
}
CertificateCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string.isRequired,
    certificateImage: PropTypes.string,
    certificateName: PropTypes.string,
    certificateDescription: PropTypes.string,
    certificateType: PropTypes.string,
  }).isRequired,
};
