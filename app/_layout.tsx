
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { PreferencesProvider } from '../context/PreferencesContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="food-preferences" options={{ headerShown: false }} />
          <Stack.Screen name="dietary-restrictions" options={{ headerShown: false }} />
          <Stack.Screen name="goals" options={{ headerShown: false }} />
          <Stack.Screen name="ask-ai" options={{ headerShown: false }} />
        </Stack>
      </PreferencesProvider>
    </AuthProvider>
  );
}
