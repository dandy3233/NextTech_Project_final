import PropTypes from 'prop-types';
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/service/${service.id}`} // The entire card is now a link
      className=" 
        group bg-white rounded-t-xl
        overflow-hidden 
        shadow-sm ring-1 ring-gray-50/5 
      "
    >
      <div className="relative aspect-[4/3]  xs:aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[15/9] xl:aspect-[15/9] 2xl:aspect-[15/9] overflow-hidden">
        <img
          src={service.imageCover}
          alt={service.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-120"
          loading="lazy"
        />
      </div>

      <div className="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-4 xl:p-8">
        <h3 className="
          text-xl sm:text-xl md:text-2xl lg:text-lg xl:text-2xl 2xl:text-2xl
          font-bold text-gray-900 line-clamp-1 
          group-hover:text-primary transition-colors duration-300
        ">
          {service.title ? service.title.charAt(0).toUpperCase() + service.title.slice(1) : ''}
        </h3>

        <p className="
          text-base sm:text-base md:text-lg lg:text-base xl:text-xl 2xl:text-lg
          text-gray-600 mt-2 xs:mt-3 sm:mt-3 md:mt-4 lg:mt-3 xl:mt-4 2xl:mt-4
          line-clamp-2 break-words
        ">
          {service.description}
        </p>
        <div
          className="
            mt-4 xs:mt-5 sm:mt-6 lg:mt-3 xl:mt-6 
            text-sm xs:text-base sm:text-base md:text-base  lg:text-sm xl:text-base 2xl:text-base
            inline-flex items-center  gap-1.5 sm:gap-2 
            text-[#00A3E0] transition-colors
          "
        >
          Read More
          <IoIosArrowRoundForward size={22} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageCover: PropTypes.string,
  }).isRequired,
};