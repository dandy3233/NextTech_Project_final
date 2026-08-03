import BlogList from "../ui/News Page/NewsList";
import useBlog from "../hooks/useNewsPage";

function Blogs() {
  const { posts, loading, error } = useBlog();

  if (loading) return <div className="flex justify-center py-20 font-bold text-primary">Loading news...</div>;

  return (
    <div className="flex flex-col">
      {error && (
        <div className="text-center text-red-500 my-8 bg-red-50 p-4 rounded-lg max-w-xl mx-auto font-semibold">
          {error?.response?.data?.message || error?.message || String(error)}
        </div>
      )}
      <main className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <BlogList posts={posts} />
      </main>
    </div>
  );
}

export default Blogs;
