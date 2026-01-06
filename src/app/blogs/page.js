// src/app/blogs/page.js
import BlogHero from "./BlogHero";
import { fetchBlogPosts, fetchCategories } from "../../lib/sanity";
import BlogContent from "./BlogContent";

export default async function BlogList() {
  const [posts, categories] = await Promise.all([
    fetchBlogPosts(),
    fetchCategories(),
  ]);

  if (!posts || posts.length === 0) {
    return (
      <main className="min-h-screen bg-[#ffffff]">
        <BlogHero />
        <section className="container mx-auto py-16 px-4 text-center">
          <p className="text-gray-600 text-lg">No blog posts found.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-32">
      <BlogHero />
      <BlogContent posts={posts} categories={categories} />
    </main>
  );
}
