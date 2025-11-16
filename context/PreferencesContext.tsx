
import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();

  useEffect(() => {
    const fetchPreferences = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'userPreferences', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setCuisines(data.cuisines || []);
            setRestrictions(data.restrictions || []);
            setGoals(data.goals || []);
          }
        } catch (error) {
          console.error("Error fetching preferences:", error);
        }
      }
    };
    fetchPreferences();
  }, [user]);

  useEffect(() => {
    const savePreferences = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'userPreferences', user.uid);
          await setDoc(docRef, { cuisines, restrictions, goals }, { merge: true });
        } catch (error) {
          console.error("Error saving preferences:", error);
        }
      }
    };
    
    // Debounce saves to avoid excessive writes
    const timeoutId = setTimeout(() => {
      savePreferences();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [cuisines, restrictions, goals, user]);

  const setCuisinesMemo = useCallback((newCuisines: string[]) => {
    setCuisines(newCuisines);
  }, []);

  const setRestrictionsMemo = useCallback((newRestrictions: string[]) => {
    setRestrictions(newRestrictions);
  }, []);

  const setGoalsMemo = useCallback((newGoals: string[]) => {
    setGoals(newGoals);
  }, []);

  const value = useMemo(() => ({
    cuisines,
    setCuisines: setCuisinesMemo,
    restrictions,
    setRestrictions: setRestrictionsMemo,
    goals,
    setGoals: setGoalsMemo,
  }), [cuisines, restrictions, goals, setCuisinesMemo, setRestrictionsMemo, setGoalsMemo]);

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};
