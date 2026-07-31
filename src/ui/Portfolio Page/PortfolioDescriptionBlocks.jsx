import PropTypes from "prop-types";

/**
 * Renders the project title and up to three description blocks
 * (subtitleOne/descriptionOne, subtitleTwo/subDescriptionTwo, subtitleThere/subDescriptionThere).
 */
export default function PortfolioDescriptionBlocks({ project }) {
  const blocks = [
    { title: project.subtitleOne,   body: project.descriptionOne },
    { title: project.subtitleTwo,   body: project.subDescriptionTwo },
    { title: project.subtitleThere, body: project.subDescriptionThere },
  ].filter(({ title, body }) => title || body);

  return (
    <div className="mb-8 md:mb-12 lg:mb-10 xl:mb-10 2xl:mb-12">
      <h1 className="text-2xl md:text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-6 text-gray-900">
        {project.title}
      </h1>
      <div className="max-w-5xl space-y-8">
        {blocks.map(({ title, body }, idx) => (
          <div key={idx} className="space-y-3">
            {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
            {body && (
              <p className="text-gray-500 text-base md:text-lg lg:text-sm xl:text-lg 2xl:text-xl font-sans leading-relaxed whitespace-pre-line">
                {body}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

PortfolioDescriptionBlocks.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    subtitleOne: PropTypes.string,
    descriptionOne: PropTypes.string,
    subtitleTwo: PropTypes.string,
    subDescriptionTwo: PropTypes.string,
    subtitleThere: PropTypes.string,
    subDescriptionThere: PropTypes.string,
  }),
};
