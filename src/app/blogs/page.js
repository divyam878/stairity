// src/app/blog/page.js
import BlogHero from "./BlogHero";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogPosts } from "../../lib/sanity";

// --- Components ---

const AuthorCapsule = ({ author, date }) => (
  <div className="flex items-center bg-white border border-black rounded-full py-1 px-3 sm:py-2 sm:px-4 w-fit">
    <div className="w-8 h-8 mr-3  overflow-hidden shrink-0">
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

// Component for the "Featured" large card
const FeaturedCard = ({ post }) => {
  const author = post.authorName || "Divyam Goyal";
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "26 Oct 2025";
  const category = post.categories?.[0]?.title || "UI/UX";
  // Hardcoded long text to ensure 4-5 lines per column as requested
  const excerpt = "The digital marketing landscape is experiencing one of its most transformative periods in recent history. What was once about simple banner ads or keyword optimization has now evolved into a dynamic ecosystem driven by data, artificial intelligence, and evolving consumer expectations. As consumer behavior continues to shift and platforms evolve, digital marketers are rethinking the way they engage with audiences. From short-form video to AI automation, today’s trends are reshaping how brands communicate, sell, and build trust online. By embracing these changes and focusing on authentic storytelling, businesses can create deeper connections and drive sustainable growth in an increasingly competitive market.";

  return (
    <Link
      href={`/blogs/${post.slug.current}`}
      className="block group mb-16 sm:mb-24"
    >
      {/* Image Area */}
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] mb-6 md:mb-8 overflow-hidden ">
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
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-black mb-6 md:mb-8 leading-tight group-hover:opacity-80 transition-opacity">
          {post.title}
        </h2>

        {/* Description - Multi-column layout */}
        <div className="text-base md:text-lg text-gray-800 leading-relaxed mb-10 md:columns-2 gap-12 text-justify">
          <p>{excerpt}</p>
        </div>

        {/* Footer */}
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
  );
};

// Component for the "Standard" small card
const StandardCard = ({ post }) => {
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

  return (
    <Link
      href={`/blogs/${post.slug.current}`}
      className="block group flex flex-col h-full"
    >
      {/* Image Area */}
      <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gray-100 ">
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
      </div>

      {/* Content */}
      <div className="flex flex-col grow">
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
      </div>
    </Link>
  );
};

export default async function BlogList() {
  const posts = await fetchBlogPosts();

  if (!posts || posts.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAFAFA]">
        <BlogHero />
        <section className="container mx-auto py-16 px-4 text-center">
             <p className="text-gray-600 text-lg">No blog posts found.</p>
        </section>
      </main>
    );
  }

  const [featuredPost, ...standardPosts] = posts;

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-32">
      <BlogHero />
      
      {/* Featured Section */}
      {featuredPost && (
        <section className="w-full max-w-7xl mx-auto ">
          <FeaturedCard post={featuredPost} />
        </section>
      )}

      {/* Standard Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {standardPosts.map((post) => (
            <StandardCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
