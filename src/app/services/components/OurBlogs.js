import Link from "next/link";
import Image from "next/image";
import Underline from "../../../components/Underline";

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

// Component for the blog card (Updated to match StandardCard design)
const BlogCard = ({ post }) => {
  const author = post?.authorName || "Divyam Goyal";
  const date = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "26 Oct 2025";
  const category = post?.categories?.[0]?.title || "Marketing";
  const excerpt = post?.excerpt || "In today's digital landscape, your website is often your brand's first handshake with the world...";

  return (
    <Link
      href={post?.slug?.current ? `/blogs/${post.slug.current}` : "#"}
      className="block group flex flex-col h-full"
    >
      {/* Image Area */}
      <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        {post?.mainImage?.asset?.url && (
          <Image
            src={post.mainImage.asset.url}
            alt={post?.title || "Blog post"}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col grow">
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 leading-tight group-hover:opacity-80 transition-opacity">
          {post?.title || "The best marketing strategy for your business"}
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

export default function OurBlogs({ posts = [] }) {
  // If no posts are provided, show 2 placeholder cards
  const displayPosts = posts.length > 0 ? posts : Array(2).fill({});

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {displayPosts.slice(0, 2).map((post, index) => (
          <div key={post._id || index} className="w-full">
            <BlogCard post={post} />
          </div>
        ))}
      </div>

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