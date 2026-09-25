import PropTypes from "prop-types";
import { useState } from "react";
import BlogCard from "./NewsCard";
import Pagination from "../Pagination";

function BlogList({ posts }) {
    const [currentPage, setCurrentPage] = useState(1);

    // NEW: State to hold the sliced posts for the current page
    const [currentPosts, setCurrentPosts] = useState([]);

    const postsPerPage = 6;

    if (!posts || posts.length === 0) return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <h3 className="text-2xl font-semibold mb-2">No News Found</h3>
            <p>Check back later for new updates.</p>
        </div>
    );

    return (
        <div className="flex flex-col gap-20 lg:pt-10">
            {/* Grid now uses currentPosts state updated by Pagination */}
            <div className="grid grid-cols-1 gap-x-6 xl:gap-x-6 2xl:gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:mx-16 xl:mx-20 2xl:mx-[5rem] ">
                {currentPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>

            <Pagination
                items={posts}
                itemsPerPage={postsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onDataUpdate={setCurrentPosts}
            />
        </div>
    );
}

BlogList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
        })
    ),
};

export default BlogList;