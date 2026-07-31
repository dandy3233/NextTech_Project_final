import { VscStarFull } from "react-icons/vsc";
import PropTypes from "prop-types";

/** Project requirements list with star bullets. */
export default function PortfolioRequirements({ requirements = [] }) {
  if (!requirements.length) return null;

  return (
    <div className="mb-12 lg:mb-16 xl:mb-20 2xl:mb-24">
      <h2 className="text-3xl lg:text-2xl xl:text-3xl md:ml-4 font-bold mb-6 md:mb-8 xl:mb-8 text-gray-900">
        Project Requirement
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 ml-3 md:ml-0 gap-6">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex gap-3 items-start">
            <VscStarFull className="w-4 h-4 text-cyan-500 flex-shrink-0" />
            <p className="text-gray-700 text-sm xs:text-base sm:text-lg md:text-base lg:text-sm xl:text-base 2xl:text-lg leading-relaxed">
              {req}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

PortfolioRequirements.propTypes = {
  requirements: PropTypes.arrayOf(PropTypes.string),
};
