
import { ctaData } from '../../data/HomePageData';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
export default function FooterCard() {
  return (
    // <section className="pb-12 lg:pb-[0px] translate-y-96 px-5 md:px-5 lg:px-44 lg:translate-y-60 relative z-20">
     <section className="relative z-20 px-3 md:px-5 lg:px-44 -mb-[9rem] lg:translate-y-48">
      <div className="max-w-7xl mx-auto bg-secondary rounded-[1rem] overflow-hidden relative  flex items-center ">



        <div className="container mx-auto px-8 md:px-16 lg:px-0 py-0 md:py-0 flex flex-col md:flex-row justify-between gap-12 lg:gap-0">

          {/* Left Side: Content */}
          <div className="w-full md:w-1/2 text-left z-10 mt-24 lg:pl-24">
            <h2 className="text-5xl md:text-5xl font-bold text-white  leading-tight mb-10">
              {ctaData.title}
            </h2>

            <Link to="/contacts">
              <button className="group flex items-center gap-3 border-2 border-[#00AEEF] px-5 lg:px-5 py-5 lg:py-3.5 rounded-full text-white font-bold tracking-wider hover:bg-[#00AEEF] transition-all duration-300 shadow-[0_0_20px_rgba(0,174,239,0.3)]">
                {ctaData.buttonText}
                <span className="text-2xl lg:text-xl group-hover:translate-x-1 transition-transform">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </Link>
          </div>

          {/* Right Side: Image with Blob Shape */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end lg:justify-center relative">
            <div className="relative w-80 h-80 md:w-[21.875rem] md:h-[23.125rem] lg:w-[26.875rem] lg:ml-20 lg:h-[29.375rem]">
              {/* Custom Blob Shape Container */}
              <div className="w-full h-full overflow-hidden shadow-2xl">
                <img
                  src={ctaData.image}
                  alt="Professional"

                />
              </div>
            </div>
          </div>

        </div>
      </div>


    </section>
  );
}