import { useState } from "react";
import PropTypes from "prop-types";

function BlogTags({ tags }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [copiedTag, setCopiedTag] = useState(null);
    const tagsPerPage = 12;

    const handleCopy = (tag) => {
        navigator.clipboard.writeText(tag);
        setCopiedTag(tag);
        setTimeout(() => setCopiedTag(null), 1500);
    };

    // Normalize tags into a clean array of non-empty strings
    const rawList = Array.isArray(tags)
        ? tags
        : typeof tags === "string"
        ? tags.split(",")
        : [];

    const validTags = rawList
        .map((tag) => (typeof tag === "string" ? tag.trim() : String(tag || "").trim()))
        .filter((tag) => tag.length > 0);

    // If tags is empty, do not display or render anything
    if (!validTags || validTags.length === 0) {
        return null;
    }

    // Pagination Logic
    const totalPages = Math.ceil(validTags.length / tagsPerPage);
    const startIndex = (currentPage - 1) * tagsPerPage;
    const currentTags = validTags.slice(startIndex, startIndex + tagsPerPage);

    return (
        <section className="bg-[#f4f7fa] p-8">
            <h3 className="mb-6 text-xl font-bold text-[#1a1a1a]">
                Tags
            </h3>
            <div className="flex flex-wrap gap-2">
                {currentTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleCopy(tag)}
                        className={`relative bg-white px-4 py-2 text-[13px] text-[#1a1a1a] border border-gray-100 rounded-sm shadow-sm transition-all duration-200 cursor-pointer group ${copiedTag === tag ? "" : "hover:border-gray-300"}`}
                    >
                        {tag}
                        {copiedTag === tag && (
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap animate-in fade-in zoom-in slide-in-from-bottom-2 duration-300">
                                Copied!
                                {/* Small Triangle Arrow */}
                                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1a]" />
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Dot Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${currentPage === i + 1
                                ? "bg-[#00A3C4] w-6"
                                : "bg-gray-300"
                                }`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

BlogTags.propTypes = {
    tags: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
    ]),
};

export default BlogTags;
