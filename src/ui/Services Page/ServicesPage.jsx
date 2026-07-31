import { useState } from "react";
import { useServices } from "../../hooks/useServiceHooks";
import ServiceCard from "./ServiceCard";
import Pagination from "../Pagination";
import LoadingSpinner from "../LoadingSpinner";

const ITEMS_PER_PAGE = 6;

export default function ServicesPage() {
  const { data: services, loading, error } = useServices();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentServices, setCurrentServices] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <LoadingSpinner text="Loading services..." />;

  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="px-4 xs:px-5 sm:px-6 md:px-8 lg:px-24 xl:px-28 2xl:pl-[7rem] 2xl:pr-[5rem]">

        {error && (
          <div className="text-center text-red-500 mb-8 bg-red-50 p-4 rounded-lg max-w-xl mx-auto font-semibold">
            {error?.response?.data?.message || error?.message || String(error)}
          </div>
        )}
        {/* Header */}
        <div className="text-center mb-10 xs:mb-12 sm:mb-14 md:mb-16 lg:mb-24 xl:mb-24">
          <p className="text-primary font-semibold uppercase tracking-widest text-xs xs:text-sm sm:text-base md:text-lg mb-2 xs:mb-3">
            What We Do
          </p>
          <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-6xl font-extrabold leading-tight">
            <span className="gap-0.5 xs:gap-1 lg:gap-2 flex flex-col">
              Services That Help
              <br />
              You Grow
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        {!loading && !error && services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <h3 className="text-2xl font-semibold mb-2">No Services Found</h3>
            <p>Check back later for new updates.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:px-3 gap-5 xs:gap-6 sm:gap-7 md:gap-8 lg:gap-4 lg:gap-y-9 xl:gap-y-12 xl:gap-6">
              {currentServices.map((service) => (
                <ServiceCard key={service.id || service._id} service={service} />
              ))}
            </div>
            <div className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-20">
              <Pagination
                items={services}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onDataUpdate={setCurrentServices}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}