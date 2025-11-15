
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context's value
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context with a default value that matches the type
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Define the props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// The provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // In a real app, you'd have logic to verify credentials
    console.log('User logged in');
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log('User logged out');
    setIsAuthenticated(false);
  };

  // The value that will be supplied to all consuming components
  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
