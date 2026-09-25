import PropTypes from 'prop-types';
import CertificateCard from './CertificateCard.jsx';


export default function CertificateGrid({ items }) {
  return (
    <div className="
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
      lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 
      gap-3 md:gap-4 lg:gap-8 xl:gap-x-12 xl:gap-y-8 pb-16
    ">
      {items.map((item, index) => (
        <CertificateCard
          key={item._id || index}
          item={item}
        />
      ))}
    </div>
  );
}

CertificateGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
