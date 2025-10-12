// src/app/blog/page.js
import BlogHero from './BlogHero';
import Link from 'next/link';
import Image from 'next/image';
import { fetchBlogPosts } from '@/lib/sanity';

export default async function BlogList() {
  const posts = await fetchBlogPosts();

  if (!posts || posts.length === 0) {
    return (
      <>
        <BlogHero posts={[]} />
        <section className="container mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts found.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    
    <main className="min-h-screen bg-white">
      <BlogHero posts={posts} />
      <section className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post._id} href={`/blogs/${post.slug.current}`} className="group block rounded-lg shadow hover:shadow-lg transition bg-white">
              <div className="relative w-full h-56">
                {post.mainImage?.asset?.url ? (
                  <Image 
                    src={post.mainImage.asset.url} 
                    alt={post.title || 'Blog post image'} 
                    fill 
                    className="object-cover rounded-t-lg" 
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold group-hover:text-yellow-500">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
                <span className="text-xs text-gray-400 mt-2 block">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'No date'}
                </span>
                <span className="inline-block mt-4 text-yellow-600 font-bold">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}