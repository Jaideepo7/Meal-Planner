
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Failed to load user from storage", e);
      } finally {
        setAuthInitialized(true);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!authInitialized || !navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/sign-in');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, segments, navigationState, authInitialized]);

  const login = (userData: any) => {
    setUser(userData);
    SecureStore.setItemAsync('user', JSON.stringify(userData));
    router.replace('/(tabs)');
  };

  const logout = () => {
    setUser(null);
    SecureStore.deleteItemAsync('user');
    router.replace('/(auth)/sign-in');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
      }}
    >
      {authInitialized ? children : null}
    </AuthContext.Provider>
  );
}
