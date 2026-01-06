"use client";

import { useState } from "react";
import { FeaturedCard, SmallCard, StandardCard, CategoryFilters } from "./BlogCards";

export default function BlogContent({ posts, categories }) {
  const [activeCategory, setActiveCategory] = useState(null);

  // Filter posts by category
  const filteredPosts = activeCategory
    ? posts.filter((post) =>
        post.categories?.some((cat) => cat.slug.current === activeCategory)
      )
    : posts;

  // Split posts for layout
  const [featuredPost, ...restPosts] = filteredPosts;
  const smallPosts = restPosts.slice(0, 3);
  const gridPosts = restPosts.slice(3);

  return (
    <>
      {/* Latest News Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">
          Latest News
        </h2>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <FeaturedCard post={featuredPost} />
          </div>
        )}

        {/* Small Posts Row */}
        {smallPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            {smallPosts.map((post) => (
              <SmallCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="w-full border-t border-gray-200" />

      {/* All Posts Section with Filters - Full width white bg */}
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Explore All Articles
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Filter by category to find what interests you
          </p>

          {/* Category Filters */}
          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <StandardCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No posts found in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
