// API Route: Generate Video Script
// POST /api/ai/generate-video-script

import Groq from 'groq-sdk';

export async function POST(request) {
  try {
    const { topic, videoType, style, keyPoints, targetAudience, refinement, previousScript } = await request.json();

    if (!topic || !videoType || !style) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const durations = {
      reel: '15-30 seconds',
      short: '15-60 seconds',
      tiktok: '15-60 seconds',
      story: '10-15 seconds'
    };

    // If this is a refinement request, use a different prompt
    const prompt = refinement && previousScript ? `
You are refining a video script based on user feedback.

PREVIOUS SCRIPT:
${previousScript}

USER FEEDBACK:
${refinement}

ORIGINAL VIDEO DETAILS:
Topic: ${topic}
Type: ${videoType} (${durations[videoType]})
Style: ${style}

TASK:
Improve the script based on the user's feedback. Keep the same structure and timing, but incorporate their suggestions.

Return JSON format:
{
  "script": "Improved word-for-word script with timing markers",
  "visualSuggestions": ["Updated visual suggestions"],
  "musicSuggestion": "Music recommendation",
  "hashtags": ["#relevant", "#hashtags"]
}

IMPORTANT:
- Address the user's specific feedback
- Keep the script camera-ready (complete sentences)
- Maintain natural, conversational language
- Stay within ${durations[videoType]}
- Use timing markers: [0-3s], [3-15s], etc.

Output ONLY valid JSON.
` : `
Generate a complete, word-for-word video script for ${videoType} that someone can read directly on camera.

VIDEO DETAILS:
Topic: ${topic}
Type: ${videoType} (${durations[videoType]})
Style: ${style}
Key Points: ${keyPoints || 'Not specified'}
Target Audience: ${targetAudience || 'General'}

TASK:
Create a COMPLETE, READY-TO-READ video script. The person should be able to read this EXACTLY as written on camera.

Return JSON format:
{
  "script": "Complete word-for-word script with timing markers",
  "visualSuggestions": ["What to show at different timestamps"],
  "musicSuggestion": "Music recommendation",
  "hashtags": ["#relevant", "#hashtags"]
}

SCRIPT REQUIREMENTS:
1. Write COMPLETE SENTENCES - every single word they should say
2. Use natural, conversational language (like talking to a friend)
3. Include timing markers: [0-3s], [3-15s], [15-25s], [25-30s]
4. Sound authentic, not robotic
5. Use contractions: I'm, you're, don't, can't
6. Add natural pauses with "..."
7. Include filler words for authenticity: well, so, actually, honestly
8. Make it fit ${durations[videoType]}

EXAMPLE SCRIPT FORMAT:

"[0-3 SECONDS - HOOK]
Hey! So I just discovered something that's gonna blow your mind...

[3-15 SECONDS - MAIN CONTENT]
Most people don't know this, but here's the secret. You actually just need these three simple things, and I'm gonna show you exactly how to use them.

[15-25 SECONDS - VALUE/PROOF]
I've been doing this for months now, and honestly? It's changed everything. Like, I wish I knew this years ago.

[25-30 SECONDS - CALL TO ACTION]
Try this today and let me know how it goes in the comments. And follow for more tips like this!"

STYLE GUIDE FOR ${style}:
${style === 'tutorial' ? '- Educational tone\n- "First... then... finally..."\n- "Here\'s how you do it..."\n- Step-by-step instructions' : ''}
${style === 'behind-scenes' ? '- Personal and authentic\n- "Let me show you..."\n- "Here\'s what really happens..."\n- Behind-the-curtain feel' : ''}
${style === 'testimonial' ? '- Emotional and story-driven\n- "I used to... but now..."\n- "This changed everything for me..."\n- Personal transformation' : ''}
${style === 'product-showcase' ? '- Benefit-focused\n- "Check this out..."\n- "This is game-changing because..."\n- Feature → Benefit format' : ''}
${style === 'trending' ? '- Viral format\n- "POV:", "Tell me why..."\n- Current slang and trends\n- Relatable and shareable' : ''}

FORMAT FOR ${videoType.toUpperCase()}:
${videoType === 'reel' || videoType === 'short' || videoType === 'tiktok' ? `
Structure:
[0-3s] HOOK - Question, shocking statement, or bold claim
[3-20s] CONTENT - The value, step-by-step or point-by-point
[20-30s] CTA - Clear next step

Keep it punchy, fast-paced, and engaging throughout.
` : ''}
${videoType === 'story' ? `
Structure:
[0-5s] HOOK - Ultra-fast attention grab
[5-10s] VALUE - One quick tip
[10-15s] CTA - Swipe up or poll

Make it ultra-concise and urgent.
` : ''}

CRITICAL: Write the EXACT words they should say. Make it sound like natural speech, not a written document.

Output ONLY valid JSON.
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'groq/compound',
      temperature: 0.9,
      max_tokens: 2000,
    });

    let text = completion.choices[0]?.message?.content || '';
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const result = JSON.parse(text);

    return Response.json(result);

  } catch (error) {
    console.error('Video script generation error:', error);
    return Response.json(
      { error: 'Failed to generate video script' },
      { status: 500 }
    );
  }
}
