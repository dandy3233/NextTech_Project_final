import { aboutData } from "../../data/AboutUsPageData.js";
import aboutUsImage from "/AboutUsPageImages/aboutUsHeroImage.jpg";

const AboutUs = () => {
  return (
    <section className="bg-white pb-20  lg:pb-32 py-12 xs:py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="max-w-7xl xl:max-w-[1640px] mx-auto px-6 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16  lg:gap-1 xl:gap-2 items-start">
          
          {/* LEFT SIDE: IMAGE SECTION */}
          
            <div className="relative lg:w-[32rem]">
                <div className="rounded-[0.75rem] md:rounded-[1.5rem] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                  <img 
                    src={aboutUsImage}
                    alt="About Nextech" 
                    className="w-full h-[22rem] md:h-[28rem] lg:h-[30rem] xl:h-[34rem] object-cover"
                  />
                </div>
              </div>


          {/* RIGHT SIDE: CONTENT SECTION */}
          <div className="flex flex-col ">
            <span className="text-[#00AEEF] font-bold text-sm  lg:ml-5 uppercase mb-4 text-start lg:text-left">
              {aboutData.subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl xl:text-[42px] font-semibold text-[#0a1128] leading-[1.1] mb-8 text-start lg:text-left">
              {aboutData.title}
            </h2>
            <p className="text-gray-500 text-base lg:text-[17px] leading-relaxed mb-12 lg:mb-8 text-start lg:text-left">
              {aboutData.description}
            </p>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {aboutData.features.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`flex flex-row items-center text-start md:items-center lg:flex-row lg:items-start lg:text-left gap-5 ${
                    index === 0 
                      ? "md:col-span-2 md:flex-col md:items-center md:text-center  px-8 lg:flex-row lg:items-start lg:text-left lg:ml-32" 
                      : ""
                  }`}
                >
                  {/* Icon Image Container */}
                  <div className="flex-shrink-0 w-16 h-16 lg:w-12 lg:h-14 flex items-center justify-center">
                    <img 
                      src={item.icon} 
                      alt={item.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex flex-col ">
                    <h4 className="text-xl lg:text-[22px] lg:ml-3 font-normal text-[#0a1128] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm lg:text-[15px] max-w-[20rem]  lg:mx-0">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;