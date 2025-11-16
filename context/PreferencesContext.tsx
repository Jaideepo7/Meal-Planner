
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
        const docRef = doc(db, 'userPreferences', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCuisines(data.cuisines || []);
          setRestrictions(data.restrictions || []);
          setGoals(data.goals || []);
        }
      }
    };
    fetchPreferences();
  }, [user]);

  const savePreferences = async () => {
    if (user) {
      const docRef = doc(db, 'userPreferences', user.uid);
      await setDoc(docRef, { cuisines, restrictions, goals }, { merge: true });
    }
  };

  useEffect(() => {
    savePreferences();
  }, [cuisines, restrictions, goals]);

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
