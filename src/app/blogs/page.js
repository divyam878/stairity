// src/app/blog/page.js
import BlogHero from "./BlogHero";
import { fetchBlogPosts } from "../../lib/sanity";
import { FeaturedCard, StandardCard } from "./BlogCards";

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
