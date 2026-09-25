import { workflowData } from "../../data/AboutUsPageData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Workflow = () => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-24 xl:px-28">
        
        {/* HEADER */}
<div className="text-center mb-12 md:mb-16">
  <span className="text-primary font-bold text-xs md:text-sm lg:text-sm lg:ml-7 uppercase block mb-8">
    {workflowData.subtitle}
  </span>

  <h2 className="text-2xl md:text-5xl lg:text-[2.2rem] font-normal text-[#1A2B49] leading-tight lg:ml-5 mx-auto">
    {workflowData.title.split("your idea")[0]}

    <span className="font-medium block mt-1 lg:mt-5">
      your idea{workflowData.title.split("your idea")[1]}
    </span>
  </h2>
</div>

        {/* SWIPER SLIDER */}
        <div className="workflow-swiper-container">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            // Logic: 1.2 on mobile (to show next card), 2 on tablet, 4 on desktop
            breakpoints={{
              320: { slidesPerView: 1.2, centeredSlides: true },
              768: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 4, centeredSlides: false, spaceBetween: 30 }
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            className="pb-16"
          >
            {workflowData.steps.map((step) => (
              <SwiperSlide key={step.id} className="h-auto">
                <div 
                  className="group bg-white p-8 lg:p-8 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,174,239,0.15)] transition-all duration-500 flex flex-col items-center text-center h-full lg:w-[22rem]"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-[#F4FBFF] rounded-full flex items-center justify-center group-hover:bg-[#e6f7ff] transition-colors">
                      <img src={step.icon} alt={step.title} className="w-1/2 h-1/2 object-contain" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-gray-800 shadow-md transition-colors duration-300 bg-white group-hover:bg-primary group-hover:text-white">
                      {step.id}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0a1128] mb-4">{step.title}</h3>
                  <p className="text-gray-400 text-[15px] w-[12rem] leading-relaxed">{step.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* CUSTOM PAGINATION DOTS */}
          <div className="custom-pagination flex justify-center items-center gap-3 mt-4" />
        </div>

      </div>

    
    </section>
  );
};

export default Workflow;