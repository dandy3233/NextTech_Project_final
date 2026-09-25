import PropTypes from 'prop-types';
import { recentProjects } from '../../data/HomePageData';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Button from "../Button"
const RecentProjects = () => {
  const { subtitle, title, description, images } = recentProjects;

  return (
    /* Increased vertical padding for that spacious 'zoomed' feel */
    <section className="py-12 md:py-20 lg:py-[7.375rem] px-6 md:px-12 lg:px-28 bg-white ">

      <div className="max-w-7xl lg:max-w-[100rem] mx-auto flex flex-col lg:flex-row  lg:items-start gap-10 lg:gap-10">

        {/* LEFT SIDE: CONTENT */}
<div className="w-full lg:w-[50%] lg:px-2 text-start lg:text-left flex flex-col items-start">
  
  {/* Subtitle */}
  <span className="text-primary font-bold text-xs md:text-base lg:text-[17px] uppercase">
    {subtitle}
  </span>

 {/* Title */}
<h2 className="text-3xl md:text-5xl lg:text-[36px] font-normal text-slate-900 mt-10 lg:mt-10">
  <span className="block leading-[1.15]">
    {title.split(" with ")[0]}
  </span>

  <span className="block mt-8 leading-[1.15]">
    with {title.split(" with ")[1]}
  </span>
</h2>

  {/* Description */}
  <div className="max-w-2xl lg:max-w-none mt-10 lg:mt-12 lg:ml-3">
    {description.map((paragraph, index) => (
      <p
        key={index}
        className={`text-gray-500 text-sm md:text-base lg:text-[18px] leading-relaxed lg:leading-[2] ${
          index !== description.length - 1
            ? "mb-8 lg:mb-10"
            : "mb-0"
        }`}
      >
        {paragraph}
      </p>
    ))}
  </div>

  {/* Button */}
  <div className="mt-12 lg:mt-20 lg:ml-3">
    <Button
      as={Link}
      to="/portfolio"
      variant="primary"
      size="lg"
      iconAfter={IoIosArrowForward}
    >
      Read More
    </Button>
  </div>

</div>

        {/* RIGHT SIDE: IMAGE COLLAGE */}
        <div className="w-full lg:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 lg:pr-[1.25rem]">
          {/* Top Row: Height scaled for zoom */}
          <div className="rounded-[25px] lg:rounded-[25px] overflow-hidden shadow-md">
            <img
              src={images.mainLeft}
              alt="Working"
              className="w-full h-[450px] md:h-[350px] lg:h-[435px] object-cover  hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="rounded-[25px] lg:rounded-[25px] overflow-hidden shadow-md">
            <img
              src={images.mainRight}
              alt="VR Technology"
              className="w-full h-[450px] md:h-[350px] lg:h-[435px] object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Bottom Row: Height scaled for zoom */}
          <div className="rounded-[1.25rem] lg:rounded-[1.5625rem] overflow-hidden shadow-lg h-[7rem] md:h-[10rem] lg:h-[8.75rem]">
            <img
              src={images.bottomLeft}
              alt="Laptop"
              className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
            />
          </div>
         <div className="rounded-[1.25rem] lg:rounded-[1.5625rem] overflow-hidden shadow-lg h-[7rem] md:h-[10rem] lg:h-[8.75rem]">
            <img
              src={images.bottomRight}
              alt="Laptop"
              className="w-full h-full object-cover o hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

RecentProjects.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default RecentProjects;