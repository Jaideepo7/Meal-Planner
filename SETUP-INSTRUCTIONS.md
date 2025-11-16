# Setup Instructions

## Firebase Database
✅ **Already Configured!** 
- Firebase is set up in `firebase/config.ts`
- Firestore is used for database storage
- Authentication is configured
- No additional setup needed

## Gemini API Setup

### Step 1: Get Your API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Configure the API Key

**Option A: Using .env file (Recommended)**

1. Create a `.env` file in the root directory:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

2. Restart your Expo development server:
   ```bash
   npm start --clear
   ```

**Option B: Direct Configuration (Not Recommended for Production)**

Edit `services/gemini.ts` and replace:
```typescript
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
```
with:
```typescript
const GEMINI_API_KEY = 'your_actual_api_key_here';
```

### Step 3: Test
1. Open the app
2. Navigate to "Ask AI" feature
3. Send a message to test the Gemini API integration

## Notes
- The `.env` file is already in `.gitignore` - your API key won't be committed
- Expo automatically loads `EXPO_PUBLIC_*` environment variables
- If you see an error about API key, make sure you've set it correctly and restarted the server

