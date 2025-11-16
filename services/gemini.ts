/**
 * Gemini API Service
 * Handles all interactions with Google's Gemini API for AI-powered meal assistance
 */

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Generates a system prompt based on user preferences and pantry
 */
function generateSystemPrompt(
  cuisines: string[],
  restrictions: string[],
  goals: string[],
  pantry: string[]
): string {
  const cuisineText = cuisines.length > 0 ? cuisines.join(', ') : 'no specific cuisine preferences';
  const restrictionsText = restrictions.length > 0 ? restrictions.join(', ') : 'no dietary restrictions';
  const goalsText = goals.length > 0 ? goals.join(', ') : 'no specific health goals';
  const pantryText = pantry.length > 0 ? pantry.join(', ') : 'no items in pantry';

  return `You are a helpful AI meal planning assistant. The user has the following preferences:
- Cuisines: ${cuisineText}
- Dietary Restrictions: ${restrictionsText}
- Health Goals: ${goalsText}
- Pantry Items: ${pantryText}

Provide personalized meal suggestions, recipe recommendations, and cooking advice based on these preferences. Be concise, helpful, and friendly.`;
}

/**
 * Sends a message to Gemini API and returns the response
 */
export async function sendMessageToGemini(
  userMessage: string,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  cuisines: string[],
  restrictions: string[],
  goals: string[],
  pantry: string[]
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set EXPO_PUBLIC_GEMINI_API_KEY in your environment variables.');
  }

  try {
    // Convert chat history to Gemini format
    const systemPrompt = generateSystemPrompt(cuisines, restrictions, goals, pantry);
    
    // Build the conversation history
    const contents: GeminiMessage[] = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      {
        role: 'model',
        parts: [{ text: 'I understand. I\'m ready to help you with meal planning based on your preferences.' }]
      }
    ];

    // Add recent chat history (last 10 messages to avoid token limits)
    const recentHistory = chatHistory.slice(-10);
    for (const msg of recentHistory) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }

    // Add the current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `Gemini API error: ${response.status} ${response.statusText}`
      );
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return aiResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get response from Gemini API');
  }
}

