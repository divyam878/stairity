// src/app/blogs/[slug]/page.js
import { fetchBlogPost, fetchRelatedPosts } from '../../../lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import LikeBlogButton from '../../../components/blog/LikeBlogButton';
import LikeHeartButton from '../../../components/blog/LikeHeartButton';

// Category Pill
const CategoryPill = ({ title, color }) => {
  const bgColor = color || "#4AAEFF";
  return (
    <span
      className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white"
      style={{ backgroundColor: bgColor }}
    >
      {title}
    </span>
  );
};

// Social Share Button
const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
  >
    {children}
  </a>
);

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    return (
      <div className="container mx-auto py-16 px-4 text-center mt-32">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blogs" className="text-black hover:underline font-bold">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  const category = post.categories?.[0];
  const author = post.authorName || "Stairity Team";
  const authorImage = post.authorImage || "/images/user-image.png";
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  // Blog data for like button
  const blogData = {
    slug: slug,
    title: post.title,
    mainImage: post.mainImage?.asset?.url || null,
  };

  // Share URL
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pt-28 md:pt-36">
        <Link 
          href="/blogs" 
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Header - Centered */}
      <header className="max-w-4xl mx-auto px-4 pt-8 pb-10 text-center">
        {category && (
          <div className="mb-5">
            <CategoryPill title={category.title} color={category.color} />
          </div>
        )}
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
          {post.title}
        </h1>
        
        {/* Author and Date */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={authorImage}
              alt={author}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-gray-700 text-sm font-medium">{author}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>
      </header>

      {/* Full Width Image */}
      {post.mainImage?.asset?.url && (
        <div className="w-full max-w-6xl mx-auto px-4 mb-12">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden">
            <Image 
              src={post.mainImage.asset.url} 
              alt={post.title || 'Blog post image'} 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content Section - Two Column Layout */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar - Sticky */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-32">
              {/* Table of Contents - Placeholder */}
              <nav className="mb-8">
                <h3 className="text-sm font-bold text-black mb-4 uppercase tracking-wider">
                  In This Article
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="border-l-2 border-black pl-3 text-black font-medium">
                    Introduction
                  </li>
                  <li className="border-l-2 border-transparent pl-3 hover:text-black transition-colors cursor-pointer">
                    Key Points
                  </li>
                  <li className="border-l-2 border-transparent pl-3 hover:text-black transition-colors cursor-pointer">
                    Conclusion
                  </li>
                </ul>
              </nav>

              {/* Like Button */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-black mb-4 uppercase tracking-wider">
                  Like This Article
                </h3>
                <LikeBlogButton blog={blogData} />
              </div>

              {/* Share Section */}
              <div>
                <h3 className="text-sm font-bold text-black mb-4 uppercase tracking-wider">
                  Share Article
                </h3>
                <div className="flex items-center gap-3">
                  <SocialIcon href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </SocialIcon>
                  <SocialIcon href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </SocialIcon>
                  <SocialIcon href={`https://www.instagram.com/`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </SocialIcon>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {post.body && (
              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-black prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-justify prose-li:text-gray-700">
                <PortableText value={post.body} />
              </div>
            )}
            
            {!post.body && post.excerpt && (
              <div className="text-lg text-gray-700 leading-relaxed">
                <p>{post.excerpt}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <RelatedArticles currentSlug={slug} categories={post.categories || []} />
    </article>
  );
}

// Related Articles Component (async)
async function RelatedArticles({ currentSlug, categories }) {
  const categoryIds = categories.map(cat => cat._id);
  const relatedPosts = await fetchRelatedPosts(currentSlug, categoryIds, 3);

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#ffffff] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <RelatedCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Related Card Component
function RelatedCard({ post }) {
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
    slug: post.slug?.current,
    title: post.title,
    image: post.mainImage?.asset?.url || null,
  };

  return (
    <Link href={`/blogs/${post.slug.current}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden border border-transparent hover:border-gray-300 transition-all">
        {/* Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
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
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-3 inline-block"
              style={{ color: category.color || "#4AAEFF", borderColor: category.color || "#4AAEFF" }}
            >
              {category.title}
            </span>
          )}
          <h3 className="text-lg font-bold text-black mb-3 leading-tight group-hover:text-gray-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
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
            <span className="text-sm text-gray-500">
              {author} • {date}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}