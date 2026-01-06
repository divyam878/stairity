"use client";
import { AlertTriangle, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export function UsageLimitBanner({ remaining, used, limit = 15 }) {
  if (remaining > 5) return null;

  const isAtLimit = remaining === 0;

  return (
    <div
      className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
        isAtLimit
          ? "bg-red-50 border border-red-200"
          : "bg-amber-50 border border-amber-200"
      }`}
    >
      <AlertTriangle
        className={`w-5 h-5 ${isAtLimit ? "text-red-500" : "text-amber-500"}`}
      />
      <div className="flex-1">
        <p className={`font-medium ${isAtLimit ? "text-red-700" : "text-amber-700"}`}>
          {isAtLimit
            ? "You've reached your free limit!"
            : `${remaining} free prompts remaining`}
        </p>
        <p className="text-sm text-gray-600">
          {isAtLimit
            ? "Upgrade to continue using AI tools."
            : `You've used ${used} of ${limit} free prompts.`}
        </p>
      </div>
    </div>
  );
}

export function SignInPrompt({ toolName }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Sign in to use {toolName}
        </h2>
        <p className="text-gray-600 mb-6">
          Create a free account to get 15 free prompts for each AI tool.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-6 py-3 bg-white text-black border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export function UsageCounter({ remaining, used, limit = 15 }) {
  const percentage = (used / limit) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">Free Prompts</span>
        </div>
        <span className="text-sm text-gray-500">
          {remaining} of {limit} remaining
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            percentage >= 100
              ? "bg-red-500"
              : percentage >= 80
              ? "bg-amber-500"
              : "bg-purple-500"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
