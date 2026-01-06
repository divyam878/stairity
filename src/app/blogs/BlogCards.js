"use client";

import Link from "next/link";
import Image from "next/image";
import LikeHeartButton from "../../components/blog/LikeHeartButton";

// Author Capsule Component
const AuthorCapsule = ({ author, date }) => (
  <div className="flex items-center bg-white border border-black rounded-full py-1 px-3 sm:py-2 sm:px-4 w-fit">
    <div className="w-8 h-8 mr-3 overflow-hidden shrink-0">
      <Image
        src="/images/user-image.png"
        alt={author}
        width={32}
        height={32}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="text-black flex flex-col justify-center leading-none">
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-[2px]">
        {author}
      </span>
      <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest">
        {date}
      </span>
    </div>
  </div>
);

// Category Pill Component
const CategoryPill = ({ category, variant = "blue" }) => {
  const bgColors = {
    blue: "bg-[#4AAEFF]",
    tea: "bg-[#0F5A56]",
  };
  const textColors = {
    blue: "text-white",
    tea: "text-white",
  };

  return (
    <span
      className={`inline-block py-2 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest ${bgColors[variant]} ${textColors[variant]} w-fit`}
    >
      {category}
    </span>
  );
};

// Featured Card Component
export function FeaturedCard({ post }) {
  const author = post.authorName || "Divyam Goyal";
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "26 Oct 2025";
  const category = post.categories?.[0]?.title || "UI/UX";
  const excerpt = "The digital marketing landscape is experiencing one of its most transformative periods in recent history. What was once about simple banner ads or keyword optimization has now evolved into a dynamic ecosystem driven by data, artificial intelligence, and evolving consumer expectations. As consumer behavior continues to shift and platforms evolve, digital marketers are rethinking the way they engage with audiences. From short-form video to AI automation, today's trends are reshaping how brands communicate, sell, and build trust online. By embracing these changes and focusing on authentic storytelling, businesses can create deeper connections and drive sustainable growth in an increasingly competitive market.";

  const blogData = {
    slug: post.slug.current,
    title: post.title,
    image: post.mainImage?.asset?.url || null,
  };

  return (
    <div className="block group mb-16 sm:mb-24">
      {/* Image Area */}
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] mb-6 md:mb-8 overflow-hidden">
        <LikeHeartButton blog={blogData} />
        <Link href={`/blogs/${post.slug.current}`}>
          {post.mainImage?.asset?.url ? (
            <Image
              src={post.mainImage.asset.url}
              alt={post.title || "Featured blog post"}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </Link>
      </div>

      {/* Content Area */}
      <Link href={`/blogs/${post.slug.current}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-black mb-6 md:mb-8 leading-tight group-hover:opacity-80 transition-opacity">
            {post.title}
          </h2>

          <div className="text-base md:text-lg text-gray-800 leading-relaxed mb-10 md:columns-2 gap-12 text-justify">
            <p>{excerpt}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-black pt-6 gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <AuthorCapsule author={author} date={date.toUpperCase()} />
              <CategoryPill category={category} variant="blue" />
            </div>
            <span className="text-lg font-bold text-black uppercase tracking-widest group-hover:underline underline-offset-4">
              View More
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Standard Card Component
export function StandardCard({ post }) {
  const author = post.authorName || "Divyam Goyal";
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "26 Oct 2025";
  const category = post.categories?.[0]?.title || "Marketing";
  const excerpt = post.excerpt || "In today's digital landscape, your website is often your brand's first handshake with the world...";

  const blogData = {
    slug: post.slug.current,
    title: post.title,
    image: post.mainImage?.asset?.url || null,
  };

  return (
    <div className="block group flex flex-col h-full">
      {/* Image Area */}
      <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gray-100">
        <LikeHeartButton blog={blogData} />
        <Link href={`/blogs/${post.slug.current}`} className="block w-full h-full">
          {post.mainImage?.asset?.url ? (
            <Image
              src={post.mainImage.asset.url}
              alt={post.title || "Blog post"}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </Link>
      </div>

      {/* Content */}
      <Link href={`/blogs/${post.slug.current}`} className="flex flex-col grow">
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 leading-tight group-hover:opacity-80 transition-opacity">
          {post.title}
        </h3>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-auto pt-6 border-t border-black flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AuthorCapsule author={author} date={date.toUpperCase()} />
            <CategoryPill category={category} variant="tea" />
          </div>
          <span className="text-sm font-bold text-black uppercase tracking-widest group-hover:underline underline-offset-4">
            View More
          </span>
        </div>
      </Link>
    </div>
  );
}
