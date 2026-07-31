import { useState, useRef, useEffect, useMemo } from "react"
import PortfolioCard from "./PortfolioCard"
import Pagination from "../Pagination";
import { usePortfolio } from "../../hooks/usePortfolioHooks";
import LoadingSpinner from "../LoadingSpinner";

export default function PortfolioSection() {
  const scrollRef = useRef(null);
  const { data: portfolioProjects, loading, error } = usePortfolio({ limit: 100, page: 1 });

  // FIXED: Wrapped in useMemo to prevent unnecessary re-renders and fix the warning
  const projectCategories = useMemo(() => {
    if (!portfolioProjects) return ["All"];
    return [
      "All",
      ...new Set(portfolioProjects.map((item) => item.catagory))
    ];
  }, [portfolioProjects]);

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItems, setCurrentItems] = useState([]);

  const ITEMS_PER_PAGE = 6

  // 1. MOUSE WHEEL SCROLL
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({
        left: e.deltaY * 2,
        behavior: "auto"
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // 2. SMART AUTO-SCROLL (Forward and Backward)
  useEffect(() => {
    const index = projectCategories.indexOf(selectedCategory);
    const container = scrollRef.current;

    if (container) {
      const buttons = container.querySelectorAll("button");
      const activeButton = buttons[index];

      if (activeButton) {
        const containerWidth = container.offsetWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;

        const targetScroll = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);

        container.scrollTo({
          left: targetScroll,
          behavior: "smooth"
        });
      }
    }
  }, [selectedCategory, projectCategories]); // Warning fixed here

  const filteredItems = useMemo(() => {
    if (!portfolioProjects) return [];
    return selectedCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((item) => item.catagory === selectedCategory);
  }, [selectedCategory, portfolioProjects]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const categoryIndex = projectCategories.indexOf(selectedCategory)
  const activeDotIndex = Math.floor(categoryIndex / 3)
  const totalDots = Math.ceil(projectCategories.length / 3)

  if (loading) return <LoadingSpinner text="Loading portfolio..." />;

  return (
    <div className="font-sans px-5 xs:px-6 md:px-12 lg:px-20 xl:px-20 2xl:px-28 py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24">

      {error && (
        <div className="text-center text-red-500 mb-8 bg-red-50 p-4 rounded-lg max-w-xl mx-auto font-semibold">
          {error?.response?.data?.message || error?.message || String(error)}
        </div>
      )}
      <div className="text-center mb-8 xs:mb-10 sm:mb-12">
        <p className="text-primary font-semibold text-base xs:text-lg mb-4 uppercase tracking-widest">
          Work with us
        </p>
        <h2 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
          Our portfolio
        </h2>

        <div className="flex justify-center gap-2 mt-24">
          {Array.from({ length: totalDots }).map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${activeDotIndex === index ? "bg-gray-600 scale-125"
                : "bg-cyan-100"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="mb-10 sm:mb-14 md:mb-16 lg:mb-20 xl:mb-10 2xl:mb-12 sm:px-28 md:px-36 lg:px-48 xl:px-52 2xl:px-56 flex justify-center">
        <div
          ref={scrollRef}
          className="w-full max-w-4xl flex overflow-x-auto gap-4 pb-4 
                     cursor-grab active:cursor-grabbing
                     no-scrollbar select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentPage(1)
              }}
              className={`flex-none px-4 xs:px-5 sm:px-6 md:px-7 lg:px-8 xl:px-6 2xl:px-7 py-2.5 xs:py-3 sm:py-3.5 md:py-4 lg:py-4.5 xl:py-3 text-sm xs:text-base sm:text-base md:text-lg font-semibold whitespace-nowrap rounded-full transition-all duration-500 ease-in-out snap-center ${selectedCategory === category
                ? "text-primary bg-transparent "
                : "bg-gray-100 md:bg-transparent text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-5 mb-14 md:mb-24">
        {!loading && !error && currentItems.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <h3 className="text-2xl font-semibold mb-2">No Portfolio Projects Found</h3>
            <p>Check back later for new updates.</p>
          </div>
        ) : (
          currentItems.map((item, index) => (
            <PortfolioCard key={item._id || index} item={item} />
          ))
        )}
      </div>

      <div className="flex justify-center items-center">
        <Pagination
          items={filteredItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onDataUpdate={setCurrentItems}
        />
      </div>
    </div>
  )
}