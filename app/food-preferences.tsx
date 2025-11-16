
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme } from 'react-native';
import { ChevronLeft, UtensilsCrossed } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';

function getStyles(colors: any) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      alignItems: 'center',
      position: 'relative',
    },
    backButton: {
      position: 'absolute',
      left: 24,
      top: 60,
    },
    headerIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primaryForeground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    title: {
      color: colors.primaryForeground,
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.primaryForeground,
      fontSize: 14,
      opacity: 0.8,
      marginTop: 2,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: 24,
      paddingBottom: 100,
    },
    cuisineGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    cuisineCard: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      gap: 8,
    },
    cuisineName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.cardForeground,
    },
    continueButton: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginTop: 24,
    },
    continueButtonText: {
        color: colors.primaryForeground,
        fontSize: 16,
        fontWeight: '600',
    },
  });
}

export default function FoodPreferencesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const { setCuisines } = usePreferences();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const cuisines = [
    { name: 'Chinese', emoji: '🥢' },
    { name: 'Indian', emoji: '🍛' },
    { name: 'Italian', emoji: '🍝' },
    { name: 'Mexican', emoji: '🌮' },
    { name: 'Japanese', emoji: '🍱' },
    { name: 'Thai', emoji: '🍜' },
    { name: 'Korean', emoji: '🥘' },
    { name: 'Mediterranean', emoji: '🥗' },
    { name: 'American', emoji: '🍔' },
    { name: 'French', emoji: '🥐' },
  ];

  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const handleContinue = () => {
    setCuisines(selectedCuisines);
    router.push('/dietary-restrictions');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.primaryForeground} />
          </TouchableOpacity>
          <View style={styles.headerIcon}>
            <UtensilsCrossed size={28} color={colors.primary} />
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.title}>Food Preferences</Text>
            <Text style={styles.subtitle}>Select cuisines you enjoy</Text>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={{ fontSize: 14, color: colors.mutedForeground, marginBottom: 16 }}>
            Selected: {selectedCuisines.length} {selectedCuisines.length === 1 ? 'cuisine' : 'cuisines'}
          </Text>
          <View style={styles.cuisineGrid}>
            {cuisines.map((cuisine, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.cuisineCard, 
                  { backgroundColor: selectedCuisines.includes(cuisine.name) ? colors.primary : colors.card }
                ]} 
                onPress={() => handleCuisineSelect(cuisine.name)}
              >
                <Text style={{fontSize: 40}}>{cuisine.emoji}</Text>
                <Text style={[
                  styles.cuisineName, 
                  { color: selectedCuisines.includes(cuisine.name) ? colors.primaryForeground : colors.cardForeground }
                ]}>
                  {cuisine.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
