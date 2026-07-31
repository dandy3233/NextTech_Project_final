import PropTypes from "prop-types";

/** Portfolio hero / cover thumbnail. */
export default function PortfolioHero({ src, alt }) {
  return (
    <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-10 xl:mb-16 2xl:mb-16">
      <img
        src={src}
        alt={alt}
        className="w-full md:h-96 lg:h-[26rem] xl:h-[34rem] object-cover rounded-xl shadow-lg"
      />
    </div>
  );
}

PortfolioHero.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
