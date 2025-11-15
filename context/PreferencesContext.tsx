
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PreferencesContextType {
  cuisines: string[];
  setCuisines: (cuisines: string[]) => void;
  restrictions: string[];
  setRestrictions: (restrictions: string[]) => void;
  goals: string[];
  setGoals: (goals: string[]) => void;
}

const PreferencesContext = createContext<PreferencesContextType>({
  cuisines: [],
  setCuisines: () => {},
  restrictions: [],
  setRestrictions: () => {},
  goals: [],
  setGoals: () => {},
});

export const usePreferences = () => {
  return useContext(PreferencesContext);
};

interface PreferencesProviderProps {
  children: ReactNode;
}

export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  const value = {
    cuisines,
    setCuisines,
    restrictions,
    setRestrictions,
    goals,
    setGoals,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};
