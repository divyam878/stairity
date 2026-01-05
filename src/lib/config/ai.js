// AI Configuration for Webestrix

export const AI_CONFIG = {
  // Model settings
  model: {
    provider: 'gemini', // 'gemini' or 'openai'
    name: 'gemini-1.5-flash', // Model name (SDK adds 'models/' prefix automatically)
    temperature: 0.7, // Creativity level (0-1)
    maxTokens: 2048,
  },

  // Rate limits
  rateLimits: {
    free: {
      websitesPerMonth: 1,
      contentGenerationsPerMonth: 3,
      requestsPerMinute: 2,
    },
    tools: {
      websitesPerMonth: -1, // Unlimited
      contentGenerationsPerMonth: 50,
      requestsPerMinute: 10,
    },
    pro: {
      websitesPerMonth: -1, // Unlimited
      contentGenerationsPerMonth: -1, // Unlimited
      requestsPerMinute: 30,
    },
  },

  // Feature flags
  features: {
    watermark: {
      free: true,
      tools: false,
      pro: false,
    },
    customDomain: {
      free: false,
      tools: false,
      pro: true,
    },
    exportCode: {
      free: true, // Can download but with watermark
      tools: true,
      pro: true,
    },
    advancedTemplates: {
      free: false,
      tools: true,
      pro: true,
    },
  },

  // Timeouts and retries
  timeout: 30000, // 30 seconds
  maxRetries: 3,
  retryDelay: 1000, // 1 second
};

export const getUserTier = (user) => {
  // TODO: Implement actual user tier detection from database
  // For now, return 'free' for all users
  return user?.tier || 'free';
};

export const canGenerateWebsite = (user, usageCount) => {
  const tier = getUserTier(user);
  const limit = AI_CONFIG.rateLimits[tier].websitesPerMonth;
  
  if (limit === -1) return true; // Unlimited
  return usageCount < limit;
};

export const getRateLimitForTier = (tier) => {
  return AI_CONFIG.rateLimits[tier] || AI_CONFIG.rateLimits.free;
};
