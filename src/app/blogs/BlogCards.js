"use client";

import Link from "next/link";
import Image from "next/image";
import LikeHeartButton from "../../components/blog/LikeHeartButton";

// Author Info Component with image
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

// Category Tag with outline
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

// Featured Card - Large image left, content right
export function FeaturedCard({ post }) {
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
      <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-transparent hover:border-gray-300 transition-all">
        {/* Image */}
        <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden bg-gray-100">
          <LikeHeartButton blog={blogData} />
          {post.mainImage?.asset?.url ? (
            <Image
              src={post.mainImage.asset.url}
              alt={post.title || "Featured blog post"}
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
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8">
          {category && (
            <div className="mb-3">
              <CategoryTag title={category.title} color={category.color} />
            </div>
          )}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight group-hover:text-gray-700 transition-colors">
            {post.title}
          </h2>
          <AuthorInfo author={author} authorImage={authorImage} date={date} />
        </div>
      </div>
    </Link>
  );
}

// Small Card - Horizontal layout for row below featured
export function SmallCard({ post }) {
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
  const excerpt = post.excerpt || post.title;

  return (
    <Link href={`/blogs/${post.slug.current}`} className="block group">
      <div className="flex bg-white rounded-xl overflow-hidden border border-transparent hover:border-gray-300 transition-all">
        {/* Thumbnail */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-gray-100">
          {post.mainImage?.asset?.url ? (
            <Image
              src={post.mainImage.asset.url}
              alt={post.title || "Blog post"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center min-w-0 p-3">
          {category && (
            <div className="mb-1">
              <CategoryTag title={category.title} color={category.color} />
            </div>
          )}
          <h3 className="text-sm font-bold text-black mb-1 leading-snug line-clamp-2 group-hover:text-gray-700 transition-colors">
            {excerpt.length > 60 ? excerpt.substring(0, 60) + "..." : excerpt}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <Image
                src={authorImage || "/images/user-image.png"}
                alt={author}
                width={20}
                height={20}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xs text-gray-500">
              {author} • {date}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Standard Grid Card - For main grid section
export function StandardCard({ post }) {
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
}

// Category Filter Pills
export function CategoryFilters({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
          activeCategory === null
            ? "bg-black text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
        }`}
      >
        All Categories
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onCategoryChange(cat.slug.current)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === cat.slug.current
              ? "bg-black text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}
