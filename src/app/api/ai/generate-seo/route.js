// API Route: Generate SEO Content
// POST /api/ai/generate-seo

import Groq from 'groq-sdk';

export async function POST(request) {
  try {
    const { pageTitle, pageDescription, targetKeywords, industry } = await request.json();

    // Validate input
    if (!pageTitle) {
      return Response.json({ error: 'Page title is required' }, { status: 400 });
    }

    // Initialize Groq
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
Generate SEO-optimized content for a webpage.

PAGE INFORMATION:
Title: ${pageTitle}
Description: ${pageDescription || 'Not provided'}
Target Keywords: ${targetKeywords || 'Not provided'}
Industry: ${industry || 'General'}

TASK:
Create SEO-optimized content in JSON format:

{
  "title": "SEO-optimized page title (50-60 characters, include main keyword)",
  "description": "Compelling meta description (150-160 characters, include CTA)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "h1": "Main heading for the page",
  "h2": ["Subheading 1", "Subheading 2", "Subheading 3"],
  "altTexts": ["Image alt text 1", "Image alt text 2", "Image alt text 3"]
}

REQUIREMENTS:
- Title must be 50-60 characters
- Description must be 150-160 characters
- Include power words and emotional triggers
- Add clear call-to-action in description
- Keywords should be relevant and specific
- H2 headings should be question-based or benefit-driven
- Alt texts should be descriptive and keyword-rich

Output ONLY valid JSON.
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'groq/compound',
      temperature: 0.7,
      max_tokens: 1024,
    });

    let text = completion.choices[0]?.message?.content || '';
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const result = JSON.parse(text);

    return Response.json(result);

  } catch (error) {
    console.error('SEO generation error:', error);
    return Response.json(
      { error: 'Failed to generate SEO content' },
      { status: 500 }
    );
  }
}
