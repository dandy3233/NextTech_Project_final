import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { workData } from "../../data/HomePageData";
import { HiChevronRight } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import Button from "../Button";


export default function WhyWeOffer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = workData.features.length;
  const slidesPerView = 4;
  const totalPages = Math.ceil(totalSlides / slidesPerView);
  const currentPage = Math.floor(activeIndex / slidesPerView);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerSlide = 5;
  const featureGroups = [];
  for (let i = 0; i < workData.features.length; i += itemsPerSlide) {
    featureGroups.push(workData.features.slice(i, i + itemsPerSlide));
  }

  return (
    <section className="py-16 md:py-24 lg:px-14 lg:py-[120px] bg-white overflow-hidden">
      <style>
        {`
          .mobile-dots .swiper-pagination-bullet {
            background-color: #ADD8E6 !important;
            opacity: 1 !important;
            width: 8px !important;
            height: 8px !important;
            margin: 0 4px !important;
            display: inline-block;
            border-radius: 50%;
          }
          .mobile-dots .swiper-pagination-bullet-active {
            background-color: #0a1128 !important;
            width: 10px !important;
            height: 10px !important;
          }
        `}
      </style>

      <div className="max-w-[1690px] mx-auto px-6 lg:px-0">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-[180px] ">

          {/* LEFT CONTENT */}
          <div className="space-y-6 lg:space-y-10 lg:ml-20">
            <div className="space-y-8">
              <span className="text-primary font-bold uppercase tracking-widest text-base">
                {workData.subtitle}
              </span>
              <h2 className="text-[2.75rem] sm:text-3xl lg:text-[38px] xl:text-[38px] font-normal text-[#0B162C] leading-[1.18] tracking-tight">
                {workData.title.includes('Passion') ? (
                  <>
                    <span className="block mb-3 sm:my-5 lg:mb-11">{workData.title.split('Passion')[0].trim()}</span>
                    <span className="block">Passion{workData.title.split('Passion')[1]}</span>
                  </>
                ) : (
                  workData.title
                )}
              </h2>
              <p className="text-[#8F939B] text-base lg:text-[18px] leading-relaxed max-w-2xl">
                {workData.description1}
              </p>
              <p className="text-[#8F939B] text-base lg:text-[18px] leading-relaxed max-w-2xl">
                {workData.description2}
              </p>
            </div>
            <Button
              as={Link}
              to="/Service"
              variant="primary"
              size="lg"
              iconAfter={HiChevronRight}>
              Read More
            </Button>
          </div>

          {/* RIGHT SLIDER SECTION */}
          <div className="w-full">
            {isMobile ? (
              /* MOBILE VIEW: Horizontal groups of 5 with dynamic dots */
              <div className="relative">
                <Swiper
                  direction={"horizontal"}
                  slidesPerView={1}
                  spaceBetween={20}
                  // This connects the dots to the scroll position
                  pagination={{
                    clickable: true,
                    el: '.mobile-dots',
                    bulletActiveClass: 'swiper-pagination-bullet-active'
                  }}
                  // Updates the activeIndex state when swiping
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  modules={[Autoplay, Pagination]}
                  className="w-full"
                >
                  {featureGroups.map((group, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="flex flex-col gap-3">
                        {group.map((item) => (
                          <FeatureCard key={item.id} feature={item} isMobile={true} />
                        ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* THE DOTS: These will now change color based on the scroll position */}
                <div className="mobile-dots flex justify-center gap-2 mt-8"></div>
              </div>
            ) : (
              /* DESKTOP VIEW: Vertical Individual Slider + Progress Line */
              <div className="flex items-center gap-8 w-full">
                <div className="flex-1 h-[510px]">
                  <Swiper
                    direction={"vertical"}
                    slidesPerView={4}
                    spaceBetween={18}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    modules={[Autoplay]}
                    className="h-full w-full"
                  >
                    {workData.features.map((feature, index) => (
                      <SwiperSlide key={feature.id}>
                        <FeatureCard
                          feature={feature}
                          isMobile={false}
                          stagger={index % 2 !== 0}
                          isActive={activeIndex === index}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* THE PROGRESS LINE & NAV BUTTON (DESKTOP ONLY) */}
                <div className="flex flex-col items-center lg:pt-10 gap-3 h-[480px]">
                  {/* Dynamic Dots based on groups of 4 items */}
                  <div className="flex flex-col gap-1.5 items-center my-1">
                    {Array.from({ length: totalPages }).map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`rounded-full transition-all duration-300 ${dotIdx === currentPage
                          ? "w-2.5 h-2.5 bg-primary shadow-sm"
                          : "w-2 h-2 bg-gray-300"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Active Slide Number */}
                  <span className="text-sm font-bold text-primary">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>

                  {/* Vertical Progress Bar */}
                  <div className="w-[4px] h-full bg-gray-100 relative rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 w-full bg-primary transition-all duration-500 ease-out"
                      style={{ height: `${((activeIndex + 1) / totalSlides) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-300">0{totalSlides}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, isMobile, stagger = false }) {
  const Icon = feature.icon;
  return (
    <div className={`
      bg-white py-5 px-6 lg:py-6 lg:px-8
      shadow-[0_12px_35px_rgba(0,168,232,0.14)] 
      border-l-[6px] border-primary 
      rounded-r-md lg:w-[80%] 2xl:w-[78%]
      flex items-center gap-5 
      transition-all duration-300 ease-out
      ${!isMobile && stagger ? 'lg:ml-40' : 'lg:ml-0'}
    `}>
      <div className="text-primary text-2xl lg:text-[30px] flex-shrink-0">
        <Icon />
      </div>
      <p className="text-[#2B354F] w-full font-bold text-base lg:text-[18px] leading-snug">
        {feature.text}
      </p>
    </div>
  );
}

// ESLint Prop-Types Validation
FeatureCard.propTypes = {
  feature: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  stagger: PropTypes.bool,
  isActive: PropTypes.bool,
};