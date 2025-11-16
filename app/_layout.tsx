
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { PreferencesProvider } from '../context/PreferencesContext';
import { useEffect } from 'react';

const InitialLayout = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (user && !inAuthGroup) {
      router.replace('/(tabs)');
    } else if (!user) {
      router.replace('/(auth)/sign-in');
    }
  }, [user, loading, segments, router]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="food-preferences" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="dietary-restrictions" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="goals" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="ask-ai" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <InitialLayout />
      </PreferencesProvider>
    </AuthProvider>
  );
}
