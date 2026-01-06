"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Sparkles, Heart, BarChart3, Loader2 } from "lucide-react";
import Link from "next/link";

const AI_TOOLS = [
  { name: "seo-generator", label: "SEO Generator", color: "#DC2626" },
  { name: "social-content", label: "Social Content", color: "#EAB308" },
  { name: "video-scripts", label: "Video Scripts", color: "#16A34A" },
  { name: "website-analyzer", label: "Website Analyzer", color: "#2B7FFF" },
];

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [usage, setUsage] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded || !user) return;

      try {
        // Fetch usage for all tools
        const usagePromises = AI_TOOLS.map(tool =>
          fetch(`/api/usage?tool=${tool.name}`).then(res => res.json())
        );
        const usageResults = await Promise.all(usagePromises);
        
        const usageData = {};
        AI_TOOLS.forEach((tool, index) => {
          usageData[tool.name] = usageResults[index];
        });
        setUsage(usageData);

        // Fetch favorites
        const favRes = await fetch("/api/favorites");
        if (favRes.ok) {
          const favData = await favRes.json();
          setFavorites(favData.favorites || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] pt-32">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
            Welcome back, {user?.firstName || "there"}!
          </h1>
          <p className="text-gray-600 text-lg">
            Track your AI tool usage and manage your favorites
          </p>
        </div>

        {/* AI Usage Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-black">AI Tool Usage</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {AI_TOOLS.map((tool) => {
              const toolUsage = usage[tool.name] || { used: 0, remaining: 15 };
              const percentage = (toolUsage.used / 15) * 100;
              
              return (
                <div
                  key={tool.name}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${tool.color}20` }}
                      >
                        <Sparkles className="w-5 h-5" style={{ color: tool.color }} />
                      </div>
                      <span className="font-semibold text-black">{tool.label}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {toolUsage.remaining}/15 left
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: tool.color,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {toolUsage.used} prompts used
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Favorites Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-black">Favorite Blogs</h2>
          </div>
          
          {favorites.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">You haven&apos;t liked any blogs yet</p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Explore Blogs
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
                >
                  {blog.image && (
                    <div className="aspect-video rounded-xl overflow-hidden mb-4">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-black group-hover:text-purple-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
