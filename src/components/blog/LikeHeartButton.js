"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function LikeHeartButton({ blog }) {
  const { isSignedIn, isLoaded } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!isSignedIn || !blog?.slug) return;

      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const data = await res.json();
          const liked = data.favorites?.some((fav) => fav.slug === blog.slug);
          setIsLiked(liked);
        }
      } catch (error) {
        console.error("Failed to check like status:", error);
      }
    };

    if (isLoaded) {
      checkIfLiked();
    }
  }, [isSignedIn, isLoaded, blog?.slug]);

  const toggleLike = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    
    if (!isSignedIn || loading) return;

    setLoading(true);
    try {
      if (isLiked) {
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: blog.slug }),
        });
        setIsLiked(false);
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: blog.slug,
            title: blog.title,
            image: blog.image || null,
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

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all shadow-md ${
        isLiked
          ? "bg-red-500 text-white"
          : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
      }`}
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <Heart
        className={`w-5 h-5 transition-all ${isLiked ? "fill-white" : ""}`}
      />
    </button>
  );
}
