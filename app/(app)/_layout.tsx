
import { Stack } from 'expo-router';
import { ThemeProvider } from '../../context/ThemeContext';

export default function AppLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="ask-ai" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
