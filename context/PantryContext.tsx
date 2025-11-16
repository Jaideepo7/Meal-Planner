
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
        const docRef = doc(db, 'userPantries', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPantry(data.pantry || []);
        }
      }
    };
    fetchPantry();
  }, [user]);

  const savePantry = async () => {
    if (user) {
      const docRef = doc(db, 'userPantries', user.uid);
      await setDoc(docRef, { pantry }, { merge: true });
    }
  };

  useEffect(() => {
    savePantry();
  }, [pantry]);

  const value = {
    pantry,
    setPantry,
  };

  return (
    <PantryContext.Provider value={value}>
      {children}
    </PantryContext.Provider>
  );
};
