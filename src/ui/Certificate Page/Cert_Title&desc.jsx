import PropTypes from 'prop-types';
export default function CertificateContent({ certificateName, certificateDescription }) {
  return (
    <div className=" lg:w-full flex flex-col justify-between ">
      {/* Title */}
      <div className="w-full">
        <h1 className="text-3xl md:text-4xl lg:text-5x1  2xl:text-6xl font-sans font-bold text-gray-900 mb-5">
          {certificateName}
        </h1>
        {/* Description */}
        <div className="text-lg md:text-sm lg:text-base 2xl:text-base w-full text-gray-600  leading-relaxed mb-10 whitespace-pre-line">
          {certificateDescription &&
            certificateDescription.split(/ {2,}/).map((text, i) => (
              <p key={i} className="mb-6">
                {text}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
CertificateContent.propTypes = {
  certificateName: PropTypes.string,
  certificateDescription: PropTypes.string,
};