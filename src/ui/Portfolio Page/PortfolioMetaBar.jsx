import PropTypes from "prop-types";
import { formatLongDate } from "../../utils/dataNormalization";

/**
 * Horizontal meta bar: Client / Date / Sector / Category.
 */
export default function PortfolioMetaBar({ client, happingDate, sector, category }) {
  const items = [
    { label: "Client:", value: client },
    { label: "Date:", value: formatLongDate(happingDate) },
    { label: "Sector:", value: sector },
    { label: "Category:", value: category },
  ];

  return (
    <>
      <div className="w-full h-px bg-gray-400/20 my-8 xs:my-10 sm:my-12 md:my-8 lg:my-8 xl:my-8 2xl:my-8" />
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 xs:gap-7 sm:gap-8 md:gap-6 lg:gap-0 xl:gap-8 mb-10 xs:mb-12 sm:mb-14 md:mb-10 lg:mb-8 xl:mb-14 2xl:mb-14">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex gap-2 xs:gap-3 items-center text-base xs:text-base sm:text-lg md:text-base lg:text-sm xl:text-lg 2xl:text-lg"
          >
            <span className="font-semibold text-gray-900">{item.label}</span>
            <span className="text-gray-600">{item.value}</span>
          </div>
        ))}
      </div>
    </>
  );
}

PortfolioMetaBar.propTypes = {
  client: PropTypes.string,
  happingDate: PropTypes.string,
  sector: PropTypes.string,
  category: PropTypes.string,
};
