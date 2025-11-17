import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { usePreferences } from '@/context/PreferencesContext';
import { IconSymbol } from '@/components/ui/icon-symbol';

const cuisines = [
  { name: 'Italian', icon: 'fork.knife' },
  { name: 'Mexican', icon: 'fork.knife' },
  { name: 'Chinese', icon: 'fork.knife' },
  { name: 'Indian', icon: 'fork.knife' },
  { name: 'Japanese', icon: 'fork.knife' },
  { name: 'French', icon: 'fork.knife' },
  { name: 'Thai', icon: 'fork.knife' },
  { name: 'Spanish', icon: 'fork.knife' },
  { name: 'Greek', icon: 'fork.knife' },
  { name: 'American', icon: 'fork.knife' },
  { name: 'Mediterranean', icon: 'fork.knife' },
  { name: 'Korean', icon: 'fork.knife' },
  { name: 'Vietnamese', icon: 'fork.knife' },
  { name: 'Caribbean', icon: 'fork.knife' },
  { name: 'German', icon: 'fork.knife' },
  { name: 'British', icon: 'fork.knife' },
];

export default function CuisinePreferencesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { setCuisinePreferences } = usePreferences();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const handleCuisineSelect = (cuisineName: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisineName)
        ? prev.filter(item => item !== cuisineName)
        : [...prev, cuisineName]
    );
  };

  const handleNext = () => {
    setCuisinePreferences(selectedCuisines);
    router.push('/(app)/onboarding/food-preferences');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 24,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
      marginTop: 8,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: 24,
      paddingBottom: 120,
    },
    selectedText: {
      color: colors.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: '48%',
      aspectRatio: 1,
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    },
    selectedCard: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '20',
    },
    cardIcon: {
      marginBottom: 12,
    },
    cardText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardForeground,
      textAlign: 'center',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 24,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
    },
    buttonText: {
      color: colors.primaryForeground,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cuisine Preferences</Text>
        <Text style={styles.subtitle}>What are your favorite cuisines? This will help us recommend recipes you'll love.</Text>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.selectedText}>Selected: {selectedCuisines.length} {selectedCuisines.length === 1 ? 'cuisine' : 'cuisines'}</Text>
        <View style={styles.grid}>
          {cuisines.map(cuisine => (
            <TouchableOpacity
              key={cuisine.name}
              style={[styles.card, selectedCuisines.includes(cuisine.name) && styles.selectedCard]}
              onPress={() => handleCuisineSelect(cuisine.name)}
            >
              <IconSymbol name={cuisine.icon as any} size={40} color={colors.primary} style={styles.cardIcon} />
              <Text style={styles.cardText}>{cuisine.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
