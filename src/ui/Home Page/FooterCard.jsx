
import { ctaData } from '../../data/HomePageData';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
export default function FooterCard() {
  return (
    <section className="px-4 pb-12 lg:pb-[90px] translate-y-5 lg:translate-y-60 relative z-20">
      <div className="max-w-7xl mx-auto bg-[#0A142F] rounded-[16px] overflow-hidden relative min-h-[480px] flex items-center ">



        <div className="container mx-auto px-8 md:px-16 py-2 md:py-0 flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left Side: Content */}
          <div className="w-full md:w-1/2 text-left z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-10">
              {ctaData.title}
            </h2>

            <Link to="/contacts">
              <button className="group flex items-center gap-3 border-2 border-[#00AEEF] px-8 py-3.5 rounded-full text-white font-bold tracking-wider hover:bg-[#00AEEF] transition-all duration-300 shadow-[0_0_20px_rgba(0,174,239,0.3)]">
                {ctaData.buttonText}
                <span className="text-xl group-hover:translate-x-1 transition-transform">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </Link>
          </div>

          {/* Right Side: Image with Blob Shape */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
            <div className="relative w-72 h-72 md:w-[350px] md:h-[370px]">
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