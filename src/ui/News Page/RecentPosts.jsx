import PropTypes from "prop-types";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatLongDate } from "../../utils/dataNormalization";

function RecentPosts({ posts }) {
    const navigate = useNavigate();

    if (!posts) return null;

    const handlePostClick = (postId) => {
        navigate(`/news/${postId}`);
    };



    return (
        <section className="bg-[#f4f7fa] p-8">
            <h3 className="mb-6 text-xl lg:text-2xl font-bold text-[#1a1a1a]">
                Recent Posts
            </h3>
            <div className="space-y-6">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="flex gap-4 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                        onClick={() => handlePostClick(post._id)}
                    >
                        <img
                            src={post.imageCover}
                            alt={post.title}
                            className="h-20 w-20 rounded-md object-cover"
                        />
                        <div className="flex flex-col justify-center gap-3 overflow-hidden min-w-0">
                            <h4 className="truncate text-lg font-bold leading-snug text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#00a6e3]">
                                {post.title}
                            </h4>
                            <div className="flex items-center text-sm font-medium text-[#00A3C4]">
                                <MdOutlineCalendarToday className="mr-2" size={16} />
                                <span>{formatLongDate(post.happenedOn)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

RecentPosts.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string,
            imageCover: PropTypes.string,
            happenedOn: PropTypes.string,
        })
    ),
};

export default RecentPosts;
