# Gemini API Setup

This app uses Google's Gemini API for the AI-powered meal assistant feature.

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) or [MakerSuite](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Setting Up the API Key

### Option 1: Environment Variable (Recommended)

1. Create a `.env` file in the root of your project (copy from `.env.example`)
2. Add your API key:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Restart your Expo development server

### Option 2: Direct Configuration

If you prefer to hardcode it (not recommended for production), you can modify `services/gemini.ts`:

```typescript
const GEMINI_API_KEY = 'your_actual_api_key_here';
```

## Testing

Once configured, the "Ask AI" feature will use Gemini API to provide personalized meal suggestions based on:
- User's cuisine preferences
- Dietary restrictions
- Health goals
- Pantry items

## Notes

- The API key is prefixed with `EXPO_PUBLIC_` so it's available in the client-side code
- Never commit your `.env` file with the actual API key to version control
- The `.env.example` file is safe to commit as it doesn't contain real keys

