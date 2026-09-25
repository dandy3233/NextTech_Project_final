import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CoverImage({ title, backgroundImage, breadcrumbs }) {
    return (
        <div
            className="relative h-[20rem] md:h-[20rem] lg:h-[35rem] xl:h-[29rem] w-full bg-cover sm:bg-cover sm:bg-center lg:mt-24 mb-0 md:mb-0"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Specific Gradient Overlay: Dark Blue (#1A215E) -> Light Blue/Gray (#C6C7D7) -> White (#FFFFFF) */}
            <div className="absolute inset-0 bg-[#1e3873]/20 md:bg-gradient-to-l" />
            <div className="relative  flex h-full flex-col items-start justify-center px-6 lg:px-44 pointer-events-none">
                <h1 className="mb-2 lg:mb-6 text-4xl font-bold text-white md:text-5xl font-sans pointer-events-auto">
                    {title}
                </h1>

                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <div className="flex items-center gap-3 text-base font-medium text-white/90 font-sans pointer-events-auto">
                        {breadcrumbs.map((crumb, index) => (
                            <div key={index} className="flex items-center gap-3">
                                {crumb.path ? (
                                    <Link to={crumb.path} className="hover:text-white">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span>{crumb.label}</span>
                                )}
                                {index < breadcrumbs.length - 1 && (
                                    <span className="text-white/60">/</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

CoverImage.propTypes = {
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string,
        })
    ),
};

export default CoverImage;
