import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Favorite {
  id: string;
  content: string;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (recipe: Favorite) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
});

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const addFavorite = (recipe: Favorite) => {
    setFavorites(prevFavorites => [...prevFavorites, recipe]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
