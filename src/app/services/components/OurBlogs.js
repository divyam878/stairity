"use client";

import Link from "next/link";
import Image from "next/image";
import Underline from "../../../components/Underline";
import LikeHeartButton from "../../../components/blog/LikeHeartButton";

// Author Info Component with image (matching blogs page)
const AuthorInfo = ({ author, authorImage, date }) => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
      <Image
        src={authorImage || "/images/user-image.png"}
        alt={author}
        width={24}
        height={24}
        className="object-cover w-full h-full"
      />
    </div>
    <span className="text-sm text-gray-600">
      {author} • {date}
    </span>
  </div>
);

// Category Tag with outline (matching blogs page)
const CategoryTag = ({ title, color }) => {
  const tagColor = color || "#4AAEFF";
  return (
    <span
      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
      style={{ 
        color: tagColor, 
        borderColor: tagColor,
        backgroundColor: "transparent"
      }}
    >
      {title}
    </span>
  );
};

// Standard Card - Matching the blogs page StandardCard component
const StandardCard = ({ post }) => {
  const author = post.authorName || "Stairity Team";
  const authorImage = post.authorImage || null;
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const category = post.categories?.[0];
  const blogData = {
    slug: post.slug.current,
    title: post.title,
    image: post.mainImage?.asset?.url || null,
  };

  return (
    <Link href={`/blogs/${post.slug.current}`} className="block group">
      <div className="bg-[#fafafa] rounded-2xl overflow-hidden border border-transparent hover:border-gray-300 transition-all">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
          <LikeHeartButton blog={blogData} />
          {post.mainImage?.asset?.url ? (
            <Image
              src={post.mainImage.asset.url}
              alt={post.title || "Blog post"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {category && (
            <div className="mb-3">
              <CategoryTag title={category.title} color={category.color} />
            </div>
          )}
          <h3 className="text-lg md:text-xl font-bold text-black mb-3 leading-tight group-hover:text-gray-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <AuthorInfo author={author} authorImage={authorImage} date={date} />
        </div>
      </div>
    </Link>
  );
};

export default function OurBlogs({ posts = [] }) {
  // Display the first 2 posts, or show message if no posts
  const displayPosts = posts.slice(0, 2);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <header className="mb-16 sm:mb-20 lg:mb-24">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">
            OUR BLOGS
          </p>
          <h2
            className="text-5xl md:text-6xl text-gray-900 tracking-tight relative inline-block font-light"
          >
            Insights That Actually{" "}
            <span className="relative inline-block font-medium font-hello">
              Matter
              <div className="absolute left-0 right-0 -bottom-2 h-4">
                <Underline color="#e88ae3ff" width="100%" thickness="4" />
              </div>
            </span>
          
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-4xl font-sans">
            Stay updated with the latest news and insights from our team
          </p>
          </h2>
        </header>
       
      </div>

      {displayPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
          {displayPosts.map((post) => (
            <div key={post._id} className="w-full">
              <StandardCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No blog posts available yet.</p>
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          href="/blogs"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#4d3258] hover:bg-[#3a2640] transition md:py-4 md:text-lg md:px-10"
        >
          View All Articles
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}