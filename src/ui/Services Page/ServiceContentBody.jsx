import PropTypes from "prop-types";

/**
 * Renders the main description and up to two optional sub-sections
 * (subTitleOne/subdescriptionOne, subTitleTwo/subdescriptionTwo).
 */
export default function ServiceContentBody({ service }) {
  return (
    <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg lg:text-base xl:text-lg">
      {service.description && (
        <p className="first-letter:text-gray-900">{service.description}</p>
      )}

      {/* Sub Section One */}
      {(service.subTitleOne || service.subdescriptionOne) && (
        <div className="mt-8 space-y-3">
          {service.subTitleOne && (
            <h4 className="text-xl font-bold text-gray-900">{service.subTitleOne}</h4>
          )}
          {service.subdescriptionOne && <p>{service.subdescriptionOne}</p>}
        </div>
      )}

      {/* Sub Section Two */}
      {(service.subTitleTwo || service.subdescriptionTwo) && (
        <div className="mt-8 space-y-3">
          {service.subTitleTwo && (
            <h4 className="text-xl font-bold text-gray-900">{service.subTitleTwo}</h4>
          )}
          {service.subdescriptionTwo && <p>{service.subdescriptionTwo}</p>}
        </div>
      )}
    </div>
  );
}

ServiceContentBody.propTypes = {
  service: PropTypes.shape({
    description: PropTypes.string,
    subTitleOne: PropTypes.string,
    subdescriptionOne: PropTypes.string,
    subTitleTwo: PropTypes.string,
    subdescriptionTwo: PropTypes.string,
  }),
};
