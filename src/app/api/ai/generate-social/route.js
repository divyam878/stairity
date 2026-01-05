// API Route: Generate Social Media Content
// POST /api/ai/generate-social

import Groq from 'groq-sdk';

export async function POST(request) {
  try {
    const { topic, platform, tone, includeHashtags, includeEmojis, callToAction } = await request.json();

    if (!topic || !platform || !tone) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const platformLimits = {
      instagram: 2200,
      tiktok: 300,
      youtube: 5000,
      twitter: 280
    };

    const prompt = `
Generate engaging social media content for ${platform}.

CONTENT DETAILS:
Topic: ${topic}
Platform: ${platform}
Tone: ${tone}
Include Hashtags: ${includeHashtags ? 'Yes' : 'No'}
Include Emojis: ${includeEmojis ? 'Yes' : 'No'}
Call to Action: ${callToAction || 'None'}

CHARACTER LIMIT: ${platformLimits[platform]} characters

TASK:
Create engaging social media content in JSON format:

{
  "caption": "The main post caption (must be under ${platformLimits[platform]} characters)",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "tips": ["Posting tip 1", "Posting tip 2", "Posting tip 3"]
}

REQUIREMENTS FOR ${platform.toUpperCase()}:
${platform === 'instagram' ? `
- Use line breaks for readability
- Include 5-10 relevant hashtags
- Add emojis throughout if requested
- Hook in first line
- Story-driven or value-focused
- End with clear CTA
` : ''}
${platform === 'tiktok' ? `
- Short and punchy (under 300 chars)
- Trending language and slang
- Lots of emojis if requested
- Question or challenge format
- Urgency and FOMO
` : ''}
${platform === 'youtube' ? `
- Longer, detailed description
- Timestamps if applicable
- Links and resources
- SEO keywords
- Subscribe CTA
` : ''}
${platform === 'twitter' ? `
- Under 280 characters
- Concise and impactful
- 1-2 hashtags max
- Thread-worthy hook
- Retweet-friendly
` : ''}

TONE: ${tone}
${includeEmojis ? 'Use emojis strategically throughout' : 'Minimal or no emojis'}
${callToAction ? `Include this CTA: ${callToAction}` : 'Include a relevant CTA'}

Output ONLY valid JSON.
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'groq/compound',
      temperature: 0.8,
      max_tokens: 1024,
    });

    let text = completion.choices[0]?.message?.content || '';
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const result = JSON.parse(text);

    // Ensure hashtags don't have # if includeHashtags is false
    if (!includeHashtags) {
      result.hashtags = [];
    }

    return Response.json(result);

  } catch (error) {
    console.error('Social content generation error:', error);
    return Response.json(
      { error: 'Failed to generate social content' },
      { status: 500 }
    );
  }
}
