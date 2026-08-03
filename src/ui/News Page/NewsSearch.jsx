import { MdSearch } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNewsSearch } from "../../hooks/useNewsPage";

function BlogSearch() {
    const [searchValue, setSearchValue] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Debounce the search term
    const [debouncedValue, setDebouncedValue] = useState(searchValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchValue]);

    // Fetch search results using custom hook
    const { data: searchResults = [], isFetching } = useNewsSearch(debouncedValue);

    const filteredResults = searchResults.slice(0, 5);

    // Show results box when typing 3+ characters
    useEffect(() => {
        setShowResults(searchValue && searchValue.length >= 3);
    }, [searchValue]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleResultClick = (post) => {
        // Use post._id as backend uses MongoDB ObjectId, fallback to id if necessary
        const postId = post._id;
        navigate(`/news/${postId}`);
        setShowResults(false);
        setSearchValue(""); // Clear search
    };

    return (
        <div className="bg-[#f4f7fa] py-12 px-6">
            <div className="relative" ref={searchRef}>
                <div className="relative flex items-center bg-white p-1 border border-gray-100 shadow-sm">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none text-gray-600 placeholder-gray-400"
                    />
                    <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#00A3C4] text-white transition-colors hover:bg-[#008ba3]">
                        <MdSearch size={20} />
                    </button>
                </div>

                {/* Autocomplete Dropdown */}
                {showResults && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                        {isFetching ? (
                            <div className="px-4 py-4 text-sm text-gray-500 text-center">
                                Searching...
                            </div>
                        ) : filteredResults.length > 0 ? (
                            filteredResults.map((post) => (
                                <div
                                    key={post._id}
                                    onClick={() => handleResultClick(post)}
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                >
                                    <h4 className="text-sm font-semibold text-gray-800 mb-1">
                                        {post.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 line-clamp-1">
                                        {post.excerpt ||
                                            (Array.isArray(post.content) ? post.content.join(" ") : post.content)?.substring(0, 100)}
                                    </p>
                                    {post.tags && (
                                        <div className="flex gap-1 mt-2">
                                            {post.tags.slice(0, 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : debouncedValue.length >= 3 ? (
                            <div className="px-4 py-4 text-sm text-gray-500 text-center">
                                No published news found for &quot;{debouncedValue}&quot;
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogSearch;
