// API Route: Generate Website
// POST /api/ai/generate-website

import { generateWebsite } from '../../../../lib/ai/generator';
import { getUserTier, canGenerateWebsite } from '../../../../lib/config/ai';

export async function POST(request) {
  try {
    const body = await request.json();
    const { businessName, industry, targetAudience, features, style } = body;

    // Validate required fields
    if (!businessName || !industry || !features || !style) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Get actual user from session/auth
    const user = null; // Replace with actual user from auth
    const tier = getUserTier(user);

    // TODO: Check usage limits from database
    const usageCount = 0; // Replace with actual usage count
    if (!canGenerateWebsite(user, usageCount)) {
      return Response.json(
        { 
          error: 'Generation limit reached',
          message: 'Upgrade to Tools tier for unlimited generations'
        },
        { status: 429 }
      );
    }

    // Prepare user input
    const userInput = {
      businessName,
      industry,
      targetAudience: targetAudience || 'general audience',
      features: Array.isArray(features) ? features : [features],
      style: style || 'modern-minimal'
    };

    console.log('🚀 Generating website for:', businessName);

    // Generate website
    const result = await generateWebsite(userInput, style, tier);

    // TODO: Save generation to database
    // await saveGeneration(user, result);

    return Response.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    
    return Response.json(
      { 
        error: 'Generation failed',
        message: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check generation status/limits
export async function GET(request) {
  try {
    // TODO: Get actual user from session
    const user = null;
    const tier = getUserTier(user);
    
    // TODO: Get actual usage from database
    const usage = {
      websitesThisMonth: 0,
      contentGenerationsThisMonth: 0,
      tier
    };

    return Response.json({
      success: true,
      usage
    });

  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
}
