import PropTypes from "prop-types";

/**
 * Renders the hero cover image and the main service title.
 */
export default function ServiceHeroImage({ src, title }) {
  return (
    <>
      <div className="w-full h-56 xs:h-72 sm:h-80 md:h-[28rem] lg:h-[25rem] xl:h-[32rem] 2xl:h-[33rem] rounded-lg overflow-hidden">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>

      <h3 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
    </>
  );
}

ServiceHeroImage.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};
