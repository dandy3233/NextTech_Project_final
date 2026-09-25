import { useState } from 'react';
import { useGallery } from '../../hooks/useGalleryHooks';
import GalleryGrid from './GallaryGrid';
import Pagination from "../Pagination";
import LoadingSpinner from "../LoadingSpinner";

const ITEMS_PER_PAGE = 6;

export default function GalleryUI() {
  const { data: galleryItems, loading, error } = useGallery({ limit: 100, page: 1 });
  const [, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  if (loading) return <LoadingSpinner text="Loading gallery..." />;

  return (
    <div className="bg-gray-50/50 px-4 sm:px-6 lg:px-4  py-12 xs:py-14 sm:py-16 md:py-20 lg:py-28">
      {error && (
        <div className="text-center text-red-500 mb-8 bg-red-50 p-4 rounded-lg max-w-xl mx-auto font-semibold">
          {error?.response?.data?.message || error?.message || String(error)}
        </div>
      )}
      <div className="mx-[4%] sm-[6%] md:mx-[6%]">
        {!loading && !error && galleryItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <h3 className="text-2xl font-semibold mb-2">No Gallery Images Found</h3>
            <p>Check back later for new updates.</p>
          </div>
        ) : (
          <>
            {/* Grid now uses the state managed by Pagination */}
            <GalleryGrid
              items={currentItems}
              onItemClick={setSelectedImage}
            />
            <Pagination
              items={galleryItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onDataUpdate={setCurrentItems}
            />
          </>
        )}
      </div>
    </div>
  );
}