
import { useEffect } from 'react';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
      SplashScreen.hideAsync();
  });

  useEffect(() => {
    const inTabsGroup = segments[0] === '(tabs)';

    if (isAuthenticated && !inTabsGroup) {
      // Navigate to the main app screen
      router.replace('/(tabs)');
    } else if (!isAuthenticated && inTabsGroup) {
      // Navigate to the login screen
      router.replace('/login');
    }
  }, [isAuthenticated, segments]);


  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayoutNav;
