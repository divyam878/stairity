// API Route: Generate SEO Content
// POST /api/ai/generate-content

import { generateSEOContent } from '@/lib/ai/generator';

export async function POST(request) {
  try {
    const body = await request.json();
    const { topic, businessName, type } = body;

    if (!topic && !businessName) {
      return Response.json(
        { error: 'Please provide a topic or business name' },
        { status: 400 }
      );
    }

    console.log('🚀 Generating SEO content for:', topic || businessName);

    const content = await generateSEOContent({
      topic,
      businessName,
      type: type || 'general'
    });

    return Response.json({
      success: true,
      content
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    
    return Response.json(
      { 
        error: 'Content generation failed',
        message: error.message
      },
      { status: 500 }
    );
  }
}
