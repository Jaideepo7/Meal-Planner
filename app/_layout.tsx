
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { PreferencesProvider } from '../context/PreferencesContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="food-preferences" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="dietary-restrictions" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="goals" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="ask-ai" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
      </PreferencesProvider>
    </AuthProvider>
  );
}
