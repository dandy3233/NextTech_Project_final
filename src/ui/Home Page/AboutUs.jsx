import { aboutData } from "../../data/HomePageData";
import { HiChevronRight } from "react-icons/hi";
import aboutUsImage from "/AboutUsPageImages/aboutUsHeroImage.jpg";
import { Link } from "react-router-dom";
import Button from "../Button.jsx";

const AboutUs = () => {
  return (
    <section className="bg-[#FBFBFB] py-12 md:py-20  lg:py-16 xl:py-20">
      {/* Container: Gradually increases max-width. 
          2xl:max-w-screen-2xl (1536px) keeps it readable on massive monitors.
      */}
      <div className="container px-5   lg:px-12 xl:px-20 2xl:max-w-[107.5rem]">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 2xl:gap-[2.5rem] items-start">

          {/* LEFT SIDE: IMAGE & HEADER */}
          <div className="w-full flex flex-col space-y-6 lg:space-y-16">
            <div className="space-y-3 lg:space-y-4">
              <span className="text-primary lg:ml-12 font-bold text-sm md:text-base lg:text-base uppercase tracking-wider block">
                {aboutData.subtitle}
              </span>
              <h2 className="text-[1.75rem] sm:text-4xl lg:text-[28px] xl:text-[42px]  lg:ml-10 font-medium text-[#0B162C] leading-[1.18] tracking-tight">
                {aboutData.title.includes('Intelligence') ? (
                  <>
                    <span className="block mb-3 sm:my-9">{aboutData.title.split('Intelligence')[0].trim()}</span>
                    <span className="block">Intelligence{aboutData.title.split('Intelligence')[1]}</span>
                  </>
                ) : (
                  aboutData.title
                )}
              </h2>
            </div>

            {/* Image Wrapper: ensures image scales nicely but doesn't blow up too large */}
            <div className="relative group lg:ml-11 ">
              <img
                src={aboutUsImage}
                alt="Our Team"
                className="min-w-[310px] sm:min-w-[550px] md:min-w-full max-h-[400px] md:max-h-[360px] lg:max-h-[600px] lg:min-w-[100px] xl:max-h-[600px] rounded-[10px] object-cover transform transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="flex flex-col space-y-8 lg:space-y-10 pt-0">
            <div className="space-y-[2.5rem] lg:ml-5">
              <p className="text-[#737A83] text-[1rem] sm:text-[1rem] lg:text-[1rem] leading-[1.8] tracking-[0.01em]">
                {aboutData.description}
              </p>

              <p className="text-[#737A83] text-[1rem] sm:text-[1rem] lg:text-[1rem] leading-[1.8] tracking-[0.01em]">
                {aboutData.subDescription}
              </p>
            </div>

            {/* VISION/MISSION GRID: Adjusts columns for smaller screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-3 xl:gap-6 lg:pr-14">
              {aboutData.features.map((item, index) => (
                <div key={item.id} className={`group ${index % 2 !== 0 ? 'lg:ml-6' : ''}`}>
                  <h4 className="text-xl md:text-2xl xl:text-2xl font-normal text-[#26262C] mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[#8F939B] text-sm md:text-base xl:text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTTON: Sized via size="lg" for clean responsive layout */}
            <div className="pt-4">
              <Button
                as={Link}
                to="/aboutus"
                variant="primary"
                className="w-auto sm:w-auto"
                size="lg"
                iconAfter={HiChevronRight}
              >
                Read More
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;