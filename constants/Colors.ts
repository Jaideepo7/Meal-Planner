
const tintColorLight = '#030213';
const tintColorDark = '#f8f8f8';

// This is a translation of the variables from your global.css file
export default {
  light: {
    text: '#030213',
    background: '#ffffff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary: '#030213',
    primaryForeground: '#ffffff',
    secondary: '#ececf0',
    secondaryForeground: '#030213',
    muted: '#ececf0',
    mutedForeground: '#717182',
    accent: '#e9ebef',
    accentForeground: '#030213',
    destructive: '#d4183d',
    border: 'rgba(0, 0, 0, 0.1)',
    card: '#ffffff',
    cardForeground: '#030213',
    rating: '#e4b30e', // Translated from --chart-5
  },
  dark: {
    text: '#f8f8f8',
    background: '#141414',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    primary: '#f8f8f8',
    primaryForeground: '#141414',
    secondary: '#2d2d2d',
    secondaryForeground: '#f8f8f8',
    muted: '#2d2d2d',
    mutedForeground: '#a1a1a1',
    accent: '#2d2d2d',
    accentForeground: '#f8f8f8',
    destructive: '#d4183d', // Kept the vibrant red for consistency
    border: '#2d2d2d',
    card: '#1f1f1f', // Slightly lighter than background for depth
    cardForeground: '#f8f8f8',
    rating: '#e4b30e', // Same gold color for ratings in dark mode
  },
};
