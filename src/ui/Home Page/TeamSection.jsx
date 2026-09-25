import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import Button from '../Button';
import TeamCard from '../Team Page/TeamCard';
import useTeams from '../../hooks/useTeamHooks';
import { teamSectionHeaderData } from '../../data/TeamPageData';

const TeamSection = () => {
  const { data: teamMembers = [], loading } = useTeams({ limit: 100, page: 1 });
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let itemsPerPage = 4;
  if (windowWidth < 640) itemsPerPage = 1;
  else if (windowWidth < 1024) itemsPerPage = 2;
  else itemsPerPage = 4;

  const safeMembers = Array.isArray(teamMembers) ? teamMembers : [];
  const totalPages = safeMembers.length > 0 ? Math.ceil(safeMembers.length / itemsPerPage) : 1;

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    if (!isPaused && totalPages > 1) {
      const interval = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage >= totalPages - 1 ? 0 : prevPage + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, totalPages]);

  const offset = currentPage * itemsPerPage;
  const displayedMembers = safeMembers.slice(offset, offset + itemsPerPage);

  return (
    <section className="py-12 md:py-20 lg:py-24 px-6 md:px-7 2xl:px-[6.75rem]  bg-white">
      <div className="max-w-7xl 2xl:max-w-screen-2xl  mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-6">
          <div className="text-left">
            <span className="text-[#00AEEF] font-semibold lg:ml-2 text-base lg:text-xl tracking-normal">
              {teamSectionHeaderData.subtitle}
            </span>
           <h2 className="text-3xl sm:text-4xl lg:text-[40px]  font-normal text-[#0B162C] mt-2 lg:mt-6 lg:ml-3 max-w-lg">
              <span className="block ">
                {teamSectionHeaderData.mainHeading.split(" ").slice(0, -1).join(" ")}
              </span>

              <span className="block mt-2 lg:mt-8 ">
                {teamSectionHeaderData.mainHeading.split(" ").slice(-1)}
              </span>
            </h2>
          </div>

          <div className="flex-shrink-0">
            <Button
              as={Link}
              to={teamSectionHeaderData.buttonLink}
              variant="primary"
              size="lg"
              iconAfter={IoIosArrowForward}
            >
              {teamSectionHeaderData.buttonText}
            </Button>
          </div>
        </div>

        {/* Team Members Grid - Staggered 1, 3 (High) & 2, 4 (Low) Layout */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
            {[1, 2, 3, 4].map((n, idx) => (
              <div
                key={n}
                className={`animate-pulse flex flex-col space-y-4 ${idx % 2 === 1 ? 'lg:mt-20' : 'lg:mt-0'
                  }`}
              >
                <div className="bg-gray-200 aspect-[317/405] rounded-xl w-full" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:mt-20 lg:gap-8 px-2 items-start pb-8 lg:pb-14">
              {displayedMembers.map((member, index) => (
                <div
                  key={member._id || member.id || index}
                  className={`transition-all duration-300 ${index % 2 === 1 ? 'lg:mt-20' : 'lg:mt-0'
                    }`}
                >
                  <TeamCard member={member} />
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4 lg:mt-8">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 transition-all duration-300 rounded-full ${
                      currentPage === index ? 'w-2 bg-[#00AEEF]' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;

