// src/app/blog/[slug]/page.js
import { fetchBlogPost } from '../../../lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import LikeBlogButton from '../../../components/blog/LikeBlogButton';

// Use standard AuthorCapsule from listing page
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

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    return (
      <div className="container mx-auto py-16 px-4 text-center mt-32">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blogs" className="text-black hover:underline font-bold uppercase tracking-widest">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  const author = post.authorName || "Divyam Goyal";
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "26 Oct 2025";
  const category = post.categories?.[0]?.title || "Article";

  // Blog data for like button
  const blogData = {
    slug: slug,
    title: post.title,
    mainImage: post.mainImage?.asset?.url || null,
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Navigation / Header Area */}
      <div className="max-w-7xl mx-auto px-4 pt-32 md:pt-48 pb-12">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <Link href="/blogs" className="inline-block text-sm font-bold uppercase tracking-widest hover:underline">
            ← Back to Blogs
          </Link>
          <LikeBlogButton blog={blogData} />
        </div>
        
        {/* Magazine Header */}
        <div className="flex flex-col items-center text-center">
             {/* Title */}
             <h1 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase font-poppins tracking-tighter leading-none mb-8 md:mb-10 max-w-5xl">
                {post.title}
             </h1>

             {/* Meta */}
             <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16">
                 <AuthorCapsule author={author} date={date} />
                 <CategoryPill category={category} variant="blue" />
             </div>
        </div>
      </div>

      {/* Full Width Sharp Image */}
      {post.mainImage?.asset?.url && (
        <div className="w-full max-w-7xl mx-auto h-[40vh] md:h-[80vh] relative mb-12 md:mb-24">
          <Image 
            src={post.mainImage.asset.url} 
            alt={post.title || 'Blog post image'} 
            fill 
            className="object-cover rounded-none" // Sharp corners
          />
        </div>
      )}

      {/* Columned Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-32">
        {post.body && (
          <div className="prose prose-lg md:prose-xl max-w-none md:columns-2 gap-12 lg:gap-20 text-justify leading-relaxed prose-headings:font-bold prose-headings:uppercase prose-p:mb-6">
            <PortableText value={post.body} />
          </div>
        )}
        
        {!post.body && post.excerpt && (
           <div className="md:columns-2 gap-12 text-lg md:text-xl text-gray-800 leading-relaxed text-justify">
              <p>{post.excerpt}</p>
           </div>
        )}
      </div>
    </article>
  );
}