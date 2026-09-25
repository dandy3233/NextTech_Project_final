import PropTypes from 'prop-types';
import GalleryCard from './GalleryCard';

export default function GalleryGrid({ items, onItemClick }) {
  return (
    <div className="
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
      lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 
      gap-y-6 gap-x-3 sm:gap-x-10 sm:gap-y-6 md:gap-x-10  md:gap-y-6 lg:gap-x-8 lg:gap-y-6 xl:gap-x-8 xl:gap-y-6 2xl:gap-x-8 2xl:gap-y-6  pb-16
    ">
      {items.map((src, index) => (
        <GalleryCard
          key={index}
          src={src}
          alt={`Gallery image ${index + 1}`}
          onClick={() => onItemClick?.(src, index)}
        />
      ))}
    </div>
  );
}

GalleryGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      coverImage: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onItemClick: PropTypes.func,
};
