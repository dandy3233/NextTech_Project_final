import { useState, useEffect } from "react";
import { workflowData } from "../../data/AboutUsPageData";

const Workflow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const totalSlides = Math.ceil(workflowData.steps.length / itemsPerView);
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [itemsPerView]);

  const totalSlides = Math.ceil(workflowData.steps.length / itemsPerView);
  const visibleSteps = workflowData.steps.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  );

  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-2 xl:px-28">

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

        {/* CARDS GRID */}
        <div
          className={`grid gap-5 ${
            itemsPerView === 4
              ? "grid-cols-4"
              : itemsPerView === 2
              ? "grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {visibleSteps.map((step) => (
            <div
              key={step.id}
              className="group bg-white p-8 lg:p-10 xl:p-8 rounded-2xl border border-gray-100 shadow-none hover:shadow-[0_20px_50px_rgba(0,174,239,0.15)] transition-shadow duration-500 flex flex-col items-center text-center h-full"
            >
              {/* ICON */}
              <div className="relative mb-6 lg:mb-8">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#F4FBFF] rounded-full flex items-center justify-center group-hover:bg-[#e6f7ff] transition-colors duration-300">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-1/2 h-1/2 lg:w-12 lg:h-12 object-contain"
                  />
                </div>

                {/* STEP NUMBER */}
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-gray-800 shadow-md transition-colors duration-300 bg-white group-hover:bg-primary group-hover:text-white">
                  {step.id}
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-[#0a1128] mb-4">{step.title}</h3>

              {/* DESCRIPTION */}
              <p className="text-gray-400 text-[15px] w-[12rem] lg:w-auto leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* PAGINATION DOTS */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-1 mt-10">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`
                  w-2.5 h-2.5 rounded-full
                  transition-all duration-300
                  ${currentIndex === idx
                    ? "bg-[#1e3a5f] scale-125 shadow-md"
                    : "bg-sky-200 hover:bg-sky-300 hover:scale-110"
                  }
                `}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Workflow;