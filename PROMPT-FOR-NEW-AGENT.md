# Prompt for Building New App with This Codebase as Reference

Copy and paste this prompt when starting a new conversation with an AI agent:

---

**I want to build a new app. Please use the codebase in this workspace (Meal-Planner-1) as a reference and foundation for the following:**

## Technical Requirements:

1. **Project Structure & Setup:**
   - Use the same Expo Router structure (`app/` folder with file-based routing)
   - Maintain the same TypeScript configuration and patterns
   - Follow the same folder organization (contexts/, services/, components/, constants/, hooks/)
   - Keep the same build setup and scripts from `package.json`

2. **Firebase Integration:**
   - Use Firebase as the database storage (Firestore)
   - Follow the same Firebase configuration pattern from `firebase/config.ts`
   - Use the same authentication patterns from `services/auth.ts`
   - Maintain the same database service patterns from `services/database.ts`
   - Store user data, preferences, and app data in Firestore collections

3. **Gemini API Integration:**
   - Use Google's Gemini API for AI features (see `services/gemini.ts` for implementation)
   - Follow the same API service pattern
   - Use environment variables for API keys (`EXPO_PUBLIC_GEMINI_API_KEY`)
   - Implement proper error handling and user feedback

4. **Code Patterns & Architecture:**
   - Use the same Context Provider patterns (AuthContext, PantryContext, PreferencesContext)
   - Follow the same service layer architecture
   - Use the same optimization patterns (useMemo, useCallback) to prevent unnecessary re-renders
   - Maintain the same error handling patterns
   - Use the same TypeScript interface and type definitions

5. **Code Quality Standards:**
   - Follow the same TypeScript patterns and best practices
   - Use the same component structure and organization
   - Maintain the same code style and naming conventions
   - Include proper error handling in all async operations
   - Use debouncing for frequent operations (like saving to Firebase)

6. **Dependencies:**
   - Use the same core dependencies (Expo, React Native, Firebase, TypeScript)
   - Maintain compatibility with the existing dependency versions
   - Add new dependencies only when necessary for new features

## What to Adapt:

- Create new screens/components based on the wireframes/designs provided
- Modify layouts and UI to match the new design requirements
- Add new features while maintaining the same code structure
- Update navigation flow as needed for the new app
- Adapt Firebase collections/schema for new data requirements

## Key Files to Reference:

- `firebase/config.ts` - Firebase setup
- `services/auth.ts` - Authentication patterns
- `services/database.ts` - Database operations
- `services/gemini.ts` - Gemini API integration
- `context/AuthContext.tsx` - Context provider pattern
- `app/_layout.tsx` - App structure and provider setup
- `package.json` - Dependencies and scripts

## Important Notes:

- Firebase is configured and ready to use as the database
- Gemini API service is set up and ready (requires API key in environment variables)
- All context providers are optimized with useMemo/useCallback
- The codebase follows React Native/Expo best practices
- Error handling is implemented throughout

**Please maintain consistency with the existing codebase while building the new app according to the wireframes/requirements I'll provide.**

---

