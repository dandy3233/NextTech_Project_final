import PropTypes from "prop-types";
import {
    MdOutlinePerson,
    MdOutlineCalendarToday,
    MdOutlineFolderOpen,
} from "react-icons/md";
import { formatLongDate } from "../../utils/dataNormalization";

function BlogContent({ post }) {
    if (!post) return null;

    return (
        <article>
            <div className="relative mb-8 w-full overflow-hidden rounded-xl aspect-[16/10]">
                <img
                    src={post.imageCover}
                    alt={post.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="mb-10 flex flex-wrap items-center gap-8 text-[15px] 2xl:text-lg 2xl:gap-14 text-gray-500">
                <div className="flex items-center font-bold">
                    <MdOutlinePerson className="mr-2 text-sky-500 " size={22} />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center font-bold">
                    <MdOutlineCalendarToday className="mr-2 text-sky-500" size={22} />
                    <span>{formatLongDate(post.happenedOn)}</span>
                </div>
                <div className="flex items-center font-bold">
                    <MdOutlineFolderOpen className="mr-2 text-sky-500" size={22} />
                    <span>{post.catagory}</span>
                </div>
            </div>

            <h1 className="mb-8 2xl:mb-12 text-2xl font-extrabold md:text-3xl lg:text-5xl 2xl:text-6xl pr-20 leading-tight ">
                {post.title}
            </h1>

            <div className="space-y-6 2xl:space-y-10 text-gray-600 text-lg 2xl:text-xl leading-relaxed">
                {post.descriptionOne && <p>{post.descriptionOne}</p>}
                {post.descriptionTwo && <p>{post.descriptionTwo}</p>}

                {post.images && post.images.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 py-2">
                        {post.images.map((img, index) => (
                            <div key={index} className="relative overflow-hidden rounded-lg aspect-[16/10] w-full">
                                <img
                                    src={img}
                                    alt={`Detail ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {post.discriptionThree && <p>{post.discriptionThree}</p>}
                {post.discriptionFour && <p>{post.discriptionFour}</p>}
            </div>
        </article>
    );
}

BlogContent.propTypes = {
    post: PropTypes.shape({
        imageCover: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        happenedOn: PropTypes.string,
        catagory: PropTypes.string,
        descriptionOne: PropTypes.string,
        descriptionTwo: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
        discriptionThree: PropTypes.string,
        discriptionFour: PropTypes.string,
    }),
};

export default BlogContent;