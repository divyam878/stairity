"use client";
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

export function useAIUsage(toolName) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [usage, setUsage] = useState({
    allowed: true,
    remaining: 15,
    used: 0,
    loading: true,
  });

  const checkUsage = useCallback(async () => {
    if (!isSignedIn || !user) {
      setUsage({ allowed: true, remaining: 15, used: 0, loading: false });
      return;
    }

    try {
      const res = await fetch(`/api/usage?tool=${encodeURIComponent(toolName)}`);
      const data = await res.json();
      setUsage({
        allowed: data.allowed,
        remaining: data.remaining,
        used: data.used,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to check usage:", error);
      setUsage({ allowed: true, remaining: 15, used: 0, loading: false });
    }
  }, [isSignedIn, user, toolName]);

  useEffect(() => {
    if (isLoaded) {
      checkUsage();
    }
  }, [isLoaded, checkUsage]);

  const incrementUsage = async () => {
    if (!isSignedIn) return { success: false };

    try {
      const res = await fetch("/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolName }),
      });

      if (res.status === 403) {
        setUsage(prev => ({ ...prev, allowed: false, remaining: 0 }));
        return { success: false, limitReached: true };
      }

      const data = await res.json();
      setUsage(prev => ({
        ...prev,
        used: data.newCount,
        remaining: data.remaining,
        allowed: data.remaining > 0,
      }));

      return { success: true, remaining: data.remaining };
    } catch (error) {
      console.error("Failed to increment usage:", error);
      return { success: false };
    }
  };

  return {
    ...usage,
    isSignedIn,
    isLoaded,
    incrementUsage,
    refetch: checkUsage,
  };
}
