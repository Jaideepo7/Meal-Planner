
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

// 1. Define the shape of the context value
interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

// 2. Create the context with a default null value
const AuthContext = createContext<AuthContextType | null>(null);

// 3. Create a hook for easy access to the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// 4. Create the AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Start as true to indicate loading

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Failed to load user from storage", e);
      } finally {
        // setLoading to false after trying to load user
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = useCallback(async (userData: any) => {
    setUser(userData);
    try {
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to save user to storage", e);
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    try {
      await SecureStore.deleteItemAsync('user');
    } catch (e) {
      console.error("Failed to delete user from storage", e);
    }
  }, []);

  // 5. Provide the context value to children - memoized to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
  }), [user, loading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
