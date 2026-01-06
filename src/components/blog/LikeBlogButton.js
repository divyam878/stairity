"use client";

import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function LikeBlogButton({ blog }) {
  const { isSignedIn, isLoaded } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!isSignedIn || !blog?.slug) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const data = await res.json();
          const liked = data.favorites?.some((fav) => fav.slug === blog.slug);
          setIsLiked(liked);
        }
      } catch (error) {
        console.error("Failed to check like status:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      checkIfLiked();
    }
  }, [isSignedIn, isLoaded, blog?.slug]);

  const toggleLike = async () => {
    if (!isSignedIn) return;

    setLoading(true);
    try {
      if (isLiked) {
        // Remove from favorites
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: blog.slug }),
        });
        setIsLiked(false);
      } else {
        // Add to favorites
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: blog.slug,
            title: blog.title,
            image: blog.mainImage || blog.image || null,
          }),
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <Link
        href="/sign-in"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
      >
        <Heart className="w-4 h-4" />
        Sign in to like
      </Link>
    );
  }

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium ${
        isLiked
          ? "bg-red-50 text-red-600 border border-red-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart
          className={`w-4 h-4 transition-all ${isLiked ? "fill-red-500 text-red-500" : ""}`}
        />
      )}
      {isLiked ? "Liked" : "Like"}
    </button>
  );
}
