
import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

interface PantryContextType {
  pantry: string[];
  setPantry: (pantry: string[]) => void;
}

const PantryContext = createContext<PantryContextType>({
  pantry: [],
  setPantry: () => {},
});

export const usePantry = () => {
  return useContext(PantryContext);
};

interface PantryProviderProps {
  children: ReactNode;
}

export const PantryProvider = ({ children }: PantryProviderProps) => {
  const [pantry, setPantry] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPantry = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'userPantries', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setPantry(data.pantry || []);
          }
        } catch (error) {
          console.error("Error fetching pantry:", error);
        }
      }
    };
    fetchPantry();
  }, [user]);

  useEffect(() => {
    const savePantry = async () => {
      if (user && pantry.length >= 0) {
        try {
          const docRef = doc(db, 'userPantries', user.uid);
          await setDoc(docRef, { pantry }, { merge: true });
        } catch (error) {
          console.error("Error saving pantry:", error);
        }
      }
    };
    
    // Only save if user exists and pantry has been initialized (not on first mount)
    if (user) {
      const timeoutId = setTimeout(() => {
        savePantry();
      }, 500); // Debounce saves to avoid excessive writes
      
      return () => clearTimeout(timeoutId);
    }
  }, [pantry, user]);

  const setPantryMemo = useCallback((newPantry: string[]) => {
    setPantry(newPantry);
  }, []);

  const value = useMemo(() => ({
    pantry,
    setPantry: setPantryMemo,
  }), [pantry, setPantryMemo]);

  return (
    <PantryContext.Provider value={value}>
      {children}
    </PantryContext.Provider>
  );
};
