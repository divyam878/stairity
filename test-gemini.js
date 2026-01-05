// Test script to verify Gemini API key and list available models
// Run with: node test-gemini.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiAPI() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    console.log('Please add it to .env.local');
    return;
  }

  console.log('✅ API Key found:', apiKey.substring(0, 10) + '...');
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try different model names
    const modelsToTry = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'models/gemini-pro',
      'models/gemini-1.5-pro',
      'models/gemini-1.5-flash'
    ];

    console.log('\n🔍 Testing available models...\n');

    for (const modelName of modelsToTry) {
      try {
        console.log(`Testing: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say hello');
        const response = await result.response;
        console.log(`✅ ${modelName} works!`);
        console.log(`   Response: ${response.text()}\n`);
        
        // If we found a working model, save it
        console.log(`\n🎉 SUCCESS! Use this model name: "${modelName}"\n`);
        break;
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message}\n`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testGeminiAPI();
