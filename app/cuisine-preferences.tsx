
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { usePreferences } from '../context/PreferencesContext';
import Colors from '../constants/Colors';

function getStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 18,
      color: colors.mutedForeground,
      marginBottom: 32,
    },
    optionContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 32,
    },
    optionButton: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 24,
      borderWidth: 2,
    },
    optionText: {
      fontSize: 16,
      fontWeight: '500',
    },
    footer: {
      marginTop: 'auto',
    },
    button: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonText: {
      color: colors.primaryForeground,
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 8,
    },
  });
}

export default function CuisinePreferencesScreen() {
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

  const handleNext = () => {
    setCuisines(selectedCuisines);
    router.push('/dietary-restrictions');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Cuisine Preferences</Text>
        <Text style={styles.subtitle}>Select any cuisines you enjoy. This helps us find recipes you'll love.</Text>
        
        <View style={styles.optionContainer}>
          {cuisines.map(cuisine => {
            const isSelected = selectedCuisines.includes(cuisine.name);
            return (
              <TouchableOpacity
                key={cuisine.name}
                style={[
                  styles.optionButton,
                  { 
                    backgroundColor: isSelected ? colors.primary : colors.card, 
                    borderColor: isSelected ? colors.primary : colors.border 
                  }
                ]}
                onPress={() => handleCuisineSelect(cuisine.name)}
              >
                <Text style={{ color: isSelected ? colors.primaryForeground : colors.text }}>
                  {cuisine.emoji} {cuisine.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
            <ChevronRight size={20} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
