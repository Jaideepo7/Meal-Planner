import React, { createContext, useState, useContext, ReactNode } from 'react';

const StatsContext = createContext({
  mealsLogged: 18, // Initial value
  incrementMealsLogged: () => {},
});

interface StatsProviderProps {
  children: ReactNode;
}

export const StatsProvider = ({ children }: StatsProviderProps) => {
  const [mealsLogged, setMealsLogged] = useState(18); // Initial value

  const incrementMealsLogged = () => {
    setMealsLogged(prev => prev + 1);
  };

  return (
    <StatsContext.Provider value={{ mealsLogged, incrementMealsLogged }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);
