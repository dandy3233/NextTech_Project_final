import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { usePartners } from "../../hooks/usePartnerHooks";
import { clientsData } from "../../data/HomePageData";
import LoadingSpinner from "../LoadingSpinner";

const LogoCard = ({ logo }) => (
  <div
    className="w-full max-w-[170px] h-[59px] 
               sm:max-w-[200px] sm:h-[85px] 
               md:max-w-[220px] md:h-[95px] 
               lg:max-w-[360px] lg:h-[80px] 
               xl:w-[480px] xl:h-[80px] 
               2xl:w-[300px] 2xl:h-[90px]
      
      bg-white rounded-[8px] md:rounded-[15px]
      shadow-[0px_15px_40px_rgba(176,190,210,0.25)] 
      flex items-center justify-center 
      p-1 "
  >
    <img
      src={logo.partnerImage}
      alt={logo.partnerName}
      className="max-w-[100%] max-h-[100%]"
    />
  </div>
);

LogoCard.propTypes = {
  logo: PropTypes.shape({
    _id: PropTypes.string,
    partnerImage: PropTypes.string,
    partnerName: PropTypes.string,
  }).isRequired,
};

const Clients = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);
  const { subtitle, title, blogTitle } = clientsData;
  const PAGE_LIMIT = 10;
  // Fetch all active partners at once so the auto-carousel doesn't constantly hit the backend
  const { data: allLogos, loading, error } = usePartners({ limit: 100, page: 1 });

  const safeLogos = Array.isArray(allLogos) ? allLogos : [];
  const totalPages = safeLogos.length > 0 ? Math.ceil(safeLogos.length / PAGE_LIMIT) : 1;

  // Slice the correct logos for the current carousel page
  const offset = currentPage * PAGE_LIMIT;
  const logos = safeLogos.slice(offset, offset + PAGE_LIMIT);

  // Auto-slide effect
  useEffect(() => {
    if (!isPaused && totalPages > 1) {
      const interval = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage >= totalPages - 1 ? 0 : prevPage + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, totalPages]);

  useEffect(() => {
    if (!loading && !hasInitialLoaded) {
      setHasInitialLoaded(true);
    }
  }, [loading, hasInitialLoaded]);

  const handlePageChange = (index) => {
    setCurrentPage(index);
  };

  // Only show the global loading screen on the very first visit
  // Subsequent pages will use the opacity fade transition instead of replacing the whole UI
  if (loading && !hasInitialLoaded) {
    return <LoadingSpinner text="Loading Partners..." />;
  }

  return (
    <section id="partners-section" className="py-10 md:py-24 lg:py-32 bg-[#FCFDFF] overflow-hidden">
      <div className=" mx-auto px-6">

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-24">
          <span className="text-[#00AEEF] font-bold text-xs md:text-lg tracking-[0.2em] uppercase block mb-3">
            {subtitle}
          </span>
          <h2 className="text-2xl md:text-5xl lg:text-[52px] font-bold text-[#1A2B49] leading-tight max-w-3xl mx-auto">
            {title} <br className="hidden md:block" />
            <span className="font-semibold block mt-1">{blogTitle}</span>
          </h2>
        </div>

        {error && (
          <div className="text-center text-red-500 mb-8 bg-red-50 p-4 rounded-lg max-w-xl mx-auto">
            {error?.response?.data?.message || error?.message || String(error)}
          </div>
        )}

        {/* Logos Container with Pause on Hover */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {(!logos || logos.length === 0) && !error ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <h3 className="text-2xl font-semibold mb-2">No Partners Found</h3>
              <p>Check back later for new updates.</p>
            </div>
          ) : !error ? (
            <>
              {/* MOBILE VIEW */}
              <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 lg:hidden justify-items-center transition-all duration-700 ease-in-out ${loading ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                {logos.map((logo, index) => (
                  <LogoCard key={logo._id || `mobile-${index}`} logo={logo} />
                ))}
              </div>

              {/* DESKTOP VIEW: Exact 3-4-3 Staggered Layout */}
              <div className={`hidden lg:flex flex-col items-center gap-8 lg:gap-10 transition-all duration-700 ease-in-out ${loading ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                {/* Row 1 (3 logos) */}
                <div className="flex justify-center gap-8 w-full">
                  {logos.slice(0, 3).map((logo, index) => (
                    <LogoCard key={logo._id || `row1-${index}`} logo={logo} />
                  ))}
                </div>

                {/* Row 2 (4 logos) */}
                <div className="flex justify-center gap-8 w-full">
                  {logos.slice(3, 7).map((logo, index) => (
                    <LogoCard key={logo._id || `row2-${index}`} logo={logo} />
                  ))}
                </div>

                {/* Row 3 (3 logos) */}
                <div className="flex justify-center gap-8 w-full">
                  {logos.slice(7, 10).map((logo, index) => (
                    <LogoCard key={logo._id || `row3-${index}`} logo={logo} />
                  ))}
                </div>
              </div>
              {/* Pagination Dots */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12 md:mt-16 relative z-10">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index)}
                      aria-label={`Go to page ${index + 1}`}
                      title={`Page ${index + 1}`}
                      className={`h-2 transition-all duration-300 rounded-full ${currentPage === index ? 'w-2 bg-[#00AEEF]' : 'w-2 bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : null}
        </div>

      </div>
    </section>
  );
};

export default Clients;