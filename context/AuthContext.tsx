
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { signIn as signInService, signOut as signOutService, signUp as signUpService } from '../services/auth';

// 1. Define the shape of the context value
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  signUp: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
}

// 2. Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create a hook for easy access to the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 4. Create the AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass:string) => {
    const { success, error } = await signInService(email, pass);
    return { success, error };
  };

  const logout = async () => {
    await signOutService();
    // onAuthStateChanged will handle setting the user to null
  };

  const signUp = async (email: string, pass: string) => {
    const { success, error } = await signUpService(email, pass);
    return { success, error };
  };

  // 5. Provide the context value to children - memoized to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    signUp,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
