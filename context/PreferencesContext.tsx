import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PreferencesState {
  cuisinePreferences: string[];
  dietaryRestrictions: string[];
  healthGoals: string[];
}

interface PreferencesContextType extends PreferencesState {
  setCuisinePreferences: (cuisines: string[]) => void;
  setDietaryRestrictions: (restrictions: string[]) => void;
  setHealthGoals: (goals: string[]) => void;
  isLoaded: boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<PreferencesState>({
    cuisinePreferences: [],
    dietaryRestrictions: [],
    healthGoals: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const storedPrefs = await AsyncStorage.getItem('userPreferences');
        if (storedPrefs) {
          const parsedPrefs = JSON.parse(storedPrefs);
          // Data migration to handle both old and new keys
          setPreferences({
            cuisinePreferences: parsedPrefs.cuisinePreferences || parsedPrefs.cuisines || [],
            dietaryRestrictions: parsedPrefs.dietaryRestrictions || parsedPrefs.restrictions || [],
            healthGoals: parsedPrefs.healthGoals || parsedPrefs.goals || [],
          });
        }
      } catch (error) {
        console.error('Failed to load preferences:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPreferences();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
    }
  }, [preferences, isLoaded]);

  const setCuisinePreferences = (cuisinePreferences: string[]) => {
    setPreferences(prev => ({ ...prev, cuisinePreferences }));
  };

  const setDietaryRestrictions = (dietaryRestrictions: string[]) => {
    setPreferences(prev => ({ ...prev, dietaryRestrictions }));
  };

  const setHealthGoals = (healthGoals: string[]) => {
    setPreferences(prev => ({ ...prev, healthGoals }));
  };

  return (
    <PreferencesContext.Provider 
      value={{ 
        ...preferences, 
        setCuisinePreferences, 
        setDietaryRestrictions, 
        setHealthGoals,
        isLoaded 
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};