'use client';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function BlogHero({ posts = [] }) {
  // Extract up to 3 images for each side
  const images = posts
    .map(post => post.mainImage?.asset?.url)
    .filter(Boolean)
    .slice(0, 6);
  const leftImages = images.slice(0, 3);
  const rightImages = images.slice(3, 6);
  // Extract unique categories from posts
  const categories = Array.from(
    new Set(posts.map(post => post.category).filter(Boolean))
  );
  const CATEGORIES = ['All', ...categories.slice(0, 5)];

  const [search, setSearch] = useState('');
  const [active, setActive] = useState('All');

  return (
    <section className="w-full min-h-[calc(100vh-80px)] mt-20 bg-[#FAFAFA] py-20 px-0">
      <div className="flex w-full max-w-5xl items-center justify-between mb-4">
        {/* Left images */}
        <div className="flex flex-col gap-4">
          {leftImages.length > 0
            ? leftImages.map((img, i) => (
                <img
                  key={img + i}
                  src={img}
                  alt="Blog preview"
                  className="w-14 h-14 rounded-2xl object-cover shadow-md border border-gray-100"
                />
              ))
            : [1, 2, 3].map(i => (
                <div key={i} className="w-14 h-14 rounded-2xl bg-gray-200" />
              ))}
        </div>
        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold font-poppins tracking-tight text-gray-900 mb-6">BLOGS</h1>
          {/* Search bar */}
          <div className="w-6xl max-w-lg flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6 shadow-sm">
            <FaSearch className="w-6 h-6 text-gray-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for blog, topic, author…"
              className="flex-1 bg-transparent outline-none text-lg text-gray-700 placeholder-gray-400"
              aria-label="Search blogs"
            />
          </div>
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`px-6 py-2 rounded-full font-semibold text-base transition shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${active === cat ? 'bg-yellow-400 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActive(cat)}
                aria-label={cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Right images */}
        <div className="flex flex-col gap-4">
          {rightImages.length > 0
            ? rightImages.map((img, i) => (
                <img
                  key={img + 'r' + i}
                  src={img}
                  alt="Blog preview"
                  className="w-14 h-14 rounded-2xl object-cover shadow-md border border-gray-100"
                />
              ))
            : [1, 2, 3].map(i => (
                <div key={i} className="w-14 h-14 rounded-2xl bg-gray-200" />
              ))}
        </div>
      </div>
    </section>
  );
}
