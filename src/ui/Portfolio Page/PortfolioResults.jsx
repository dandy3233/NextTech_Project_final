import PropTypes from "prop-types";

/** Project results text paragraphs. */
export default function PortfolioResults({ results = [] }) {
  const nonEmpty = results.filter(Boolean);
  if (!nonEmpty.length) return null;

  return (
    <div className="mb-12 xs:mb-14 sm:mb-16 md:mb-20 lg:mb-24">
      <h2 className="text-3xl lg:text-2xl xl:text-3xl font-bold mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-6 xl:mb-10 text-gray-900">
        Results
      </h2>
      <div className="space-y-5 xs:space-y-6 sm:space-y-7 md:space-y-8 text-gray-500 leading-relaxed text-base xs:text-base sm:text-lg md:text-lg lg:text-sm xl:text-base 2xl:text-base whitespace-pre-line">
        {nonEmpty.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

PortfolioResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string),
};
