
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'expo-router';

// This would typically be a more complex user object, maybe from your auth provider
type User = object | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

// The default value provided to the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

// Custom hook for easy access to the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simulate checking auth status on component mount
  useEffect(() => {
    // In a real app, you might be checking a token in AsyncStorage
    // or waiting for a response from your auth server.
    setTimeout(() => {
      // For demonstration, we'll start with the user logged out.
      setUser(null);
      setLoading(false);
    }, 1000); // Simulate a 1-second loading time
  }, []);

  const login = () => {
    // In a real app, this would involve an API call.
    // On success, you'd get user data and set it.
    setUser({}); // Set to a generic object to represent a logged-in user
  };

  const logout = () => {
    setUser(null); // Clear user data
    router.replace('/sign-in');
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
