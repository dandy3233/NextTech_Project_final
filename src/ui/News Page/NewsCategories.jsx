import PropTypes from "prop-types";

function BlogCategories({ categories }) {
    if (!categories || !Array.isArray(categories) || categories.length === 0) return null;

    return (
        <section className="bg-[#f4f7fa] p-8">
            <h1 className="mb-6 text-2xl font-bold text-[#1a1a1a]">
                Categories
            </h1>
            <ul className="space-y-4">
                {categories.map((cat) => (
                    <li
                        key={cat.name}
                        className="flex items-center text-lg text-gray-900"
                    >
                        <span className="mr-1">{cat.name}</span>
                        <span className="text-gray-950">({cat.count})</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

BlogCategories.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            count: PropTypes.number,
        })
    ),
};

export default BlogCategories;
