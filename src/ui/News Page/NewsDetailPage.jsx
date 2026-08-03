import { useParams } from "react-router-dom";
import BlogSearch from "./NewsSearch";
import BlogCategories from "./NewsCategories";
import RecentPosts from "./RecentPosts";
import BlogTags from "./NewsTags";
import BlogContent from "./NewsContent";
import NotFoundMessage from "../NotFoundMessage";
import useBlog from "../../hooks/useNewsPage";
import LoadingSpinner from "../LoadingSpinner";

function BlogDetail() {
  const { id } = useParams();
  const { posts, categories, tags, recentPosts, loading } = useBlog();

  if (loading) {
    return <LoadingSpinner text="Loading News Details..." />;
  }

  const post = posts.find((p) => String(p._id) === String(id));

  if (!post) {
    return <NotFoundMessage itemType="News" backPath="/news" />;
  }

  return (
    <div className="flex flex-col pt-10 mb-6 lg:mb-16">
      <main className="px-4 py-12 sm:px-6 lg:px-8 lg:mx-16 xl:mx-20 2xl:mx-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-6 xl:gap-8 2xl:gap-10">
          {/* Main Content */}
          <div className="w-full lg:w-[70%]">
            <BlogContent post={post} />
          </div>

          {/* Sidebar */}
          <aside className="w-full space-y-12 lg:w-[30%]">
            <BlogSearch />
            <BlogCategories categories={categories} />
            <RecentPosts posts={recentPosts} />
            <BlogTags tags={tags} />
          </aside>
        </div >
      </main >
    </div >
  );
}

export default BlogDetail;
