// AI Generator Utility - Handles all AI generation logic using Groq

import Groq from 'groq-sdk';
import { generateContentPrompt } from './prompts';
import { getTemplate } from '../templates';
import { AI_CONFIG } from '../config/ai';

// Initialize Groq AI
const getAI = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not set in environment variables');
  }
  
  return new Groq({ apiKey });
};

/**
 * Generate website content using AI
 * @param {Object} userInput - User's business information
 * @returns {Promise<Object>} Generated content object
 */
export async function generateWebsiteContent(userInput) {
  try {
    const groq = getAI();
    
    const prompt = generateContentPrompt(userInput);
    
    console.log('🤖 Generating content with Groq AI...');
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'groq/compound', // Groq Compound system with built-in tools
      temperature: 0.7,
      max_tokens: 2048,
    });
    
    let text = completion.choices[0]?.message?.content || '';
    
    console.log('📝 Raw AI response:', text.substring(0, 200) + '...');
    
    // Clean up the response (remove markdown code blocks if present)
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse JSON response
    let content;
    try {
      content = JSON.parse(text);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      console.log('Attempting to extract JSON from response...');
      
      // Try to find JSON in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        content = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not find valid JSON in AI response');
      }
    }
    
    // Ensure all required fields exist with fallbacks
    const validatedContent = {
      hero: {
        headline: content.hero?.headline || userInput.businessName,
        subheadline: content.hero?.subheadline || `Welcome to ${userInput.businessName}`,
        ctaText: content.hero?.ctaText || 'Get Started'
      },
      about: {
        title: content.about?.title || 'About Us',
        content: String(content.about?.content || `${userInput.businessName} is dedicated to providing excellent service.`)
      },
      features: content.features?.length >= 3 ? content.features.slice(0, 3) : [
        { title: userInput.features[0] || 'Feature 1', description: 'High quality service' },
        { title: userInput.features[1] || 'Feature 2', description: 'Professional team' },
        { title: userInput.features[2] || 'Feature 3', description: 'Customer focused' }
      ],
      cta: {
        headline: content.cta?.headline || 'Ready to Get Started?',
        subheadline: content.cta?.subheadline || 'Contact us today',
        buttonText: content.cta?.buttonText || 'Contact Us'
      },
      seo: {
        title: content.seo?.title || `${userInput.businessName} - ${userInput.industry}`,
        description: content.seo?.description || `${userInput.businessName} offers ${userInput.features.join(', ')}`,
        keywords: content.seo?.keywords || [userInput.businessName, userInput.industry, ...userInput.features]
      }
    };
    
    console.log('✅ Content generated and validated successfully with Groq');
    return validatedContent;
    
  } catch (error) {
    console.error('❌ Error generating content:', error);
    
    // Provide fallback content if AI fails
    if (error.message.includes('JSON')) {
      throw new Error('AI generated invalid content. Please try again.');
    }
    
    throw new Error(`Content generation failed: ${error.message}`);
  }
}

/**
 * Generate complete HTML website
 * @param {Object} userInput - User's business information
 * @param {string} templateId - Selected template ID
 * @param {string} tier - User's subscription tier
 * @returns {Promise<Object>} Generated HTML and metadata
 */
export async function generateWebsite(userInput, templateId = 'modern-minimal', tier = 'free') {
  try {
    // Step 1: Generate content with AI
    const content = await generateWebsiteContent(userInput);
    
    // Step 2: Get selected template
    const template = getTemplate(templateId);
    
    // Step 3: Render HTML using template
    let html = template.render(content);
    
    // Step 4: Add watermark for free tier
    if (tier === 'free') {
      html = addWatermark(html);
    }
    
    // Step 5: Optimize HTML
    html = optimizeHTML(html);
    
    return {
      html,
      content,
      template: template.name,
      metadata: {
        generatedAt: new Date().toISOString(),
        tier,
        templateId,
      }
    };
    
  } catch (error) {
    console.error('❌ Error generating website:', error);
    throw error;
  }
}

/**
 * Generate SEO content (meta tags, descriptions, etc.)
 * @param {Object} input - Content to optimize
 * @returns {Promise<Object>} SEO optimized content
 */
export async function generateSEOContent(input) {
  try {
    const groq = getAI();

    const prompt = `
Generate SEO-optimized content for a website about: ${input.topic || input.businessName}

Output JSON with:
{
  "title": "SEO page title (max 60 characters)",
  "description": "Meta description (max 160 characters)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "h1": "Main heading",
  "h2": ["Subheading 1", "Subheading 2", "Subheading 3"],
  "altTexts": ["Alt text 1", "Alt text 2", "Alt text 3"]
}

Make it compelling and optimized for search engines.
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
    
    return JSON.parse(text);
    
  } catch (error) {
    console.error('❌ Error generating SEO content:', error);
    throw new Error(`SEO generation failed: ${error.message}`);
  }
}

/**
 * Add Stairity watermark to HTML (for free tier)
 */
function addWatermark(html) {
  // Add a more prominent watermark for free tier
  const watermark = `
  <!-- Stairity Free Tier Watermark -->
  <div style="position: fixed; bottom: 20px; right: 20px; background: rgba(147, 51, 234, 0.95); color: white; padding: 12px 20px; border-radius: 50px; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999;">
    Built with <a href="https://stairity.com" style="color: white; text-decoration: underline;" target="_blank">Stairity</a> ✨
  </div>
  `;
  
  return html.replace('</body>', `${watermark}\n</body>`);
}

/**
 * Optimize HTML (minify, clean up)
 */
function optimizeHTML(html) {
  // Remove excessive whitespace while preserving readability
  return html
    .replace(/\n\s*\n/g, '\n') // Remove empty lines
    .replace(/>\s+</g, '><') // Remove whitespace between tags
    .trim();
}

/**
 * Retry logic for AI generation
 */
export async function generateWithRetry(generateFn, maxRetries = AI_CONFIG.maxRetries) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generateFn();
    } catch (error) {
      lastError = error;
      console.log(`⚠️ Attempt ${i + 1} failed, retrying...`);
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, AI_CONFIG.retryDelay * (i + 1)));
      }
    }
  }
  
  throw lastError;
}
