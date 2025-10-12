// src/app/blog/[slug]/page.js
import { fetchBlogPost } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogDetail({ params }) {
  const { slug } = params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blogs" className="text-yellow-600 hover:text-yellow-700 font-bold">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto py-16 px-4 max-w-3xl">
      <Link href="/blogs" className="text-yellow-600 hover:text-yellow-700 font-bold mb-8 inline-block">
        ← Back to Blogs
      </Link>
      
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      {post.publishedAt && (
        <span className="text-xs text-gray-400 mb-4 block">
          {new Date(post.publishedAt).toLocaleDateString()}
        </span>
      )}
      
      {post.mainImage?.asset?.url && (
        <div className="relative w-full h-80 mb-8">
          <Image 
            src={post.mainImage.asset.url} 
            alt={post.title || 'Blog post image'} 
            fill 
            className="object-cover rounded-lg" 
          />
        </div>
      )}
      
      {post.body && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      )}
      
      {!post.body && post.excerpt && (
        <p className="text-gray-700 text-lg leading-relaxed">{post.excerpt}</p>
      )}
    </article>
  );
}