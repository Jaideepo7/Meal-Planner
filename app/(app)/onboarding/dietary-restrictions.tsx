import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { usePreferences } from '@/context/PreferencesContext';

const restrictions = [
  { name: 'Vegan', description: 'No animal products of any kind' },
  { name: 'Vegetarian', description: 'No meat, but may include eggs and dairy' },
  { name: 'Gluten-Free', description: 'No wheat, barley, or rye' },
  { name: 'Dairy-Free', description: 'No milk, cheese, or other dairy products' },
  { name: 'Nut-Free', description: 'No peanuts or tree nuts' },
  { name: 'Soy-Free', description: 'No soybeans or soy-based products' },
  { name: 'Low-Carb', description: 'Limited carbohydrates, such as those found in sugary foods, pasta, and bread' },
  { name: 'Low-Fat', description: 'Limited fat, especially saturated and trans fats' },
  { name: 'Halal', description: 'Foods that are permissible under Islamic law' },
  { name: 'Kosher', description: 'Foods that conform to the regulations of kashrut' },
];

export default function DietaryRestrictionsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { setDietaryRestrictions } = usePreferences();
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);

  const handleRestrictionSelect = (restrictionName: string) => {
    setSelectedRestrictions(prev =>
      prev.includes(restrictionName)
        ? prev.filter(item => item !== restrictionName)
        : [...prev, restrictionName]
    );
  };

  const handleNext = () => {
    setDietaryRestrictions(selectedRestrictions);
    router.push('/onboarding/goals');
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
      width: '100%',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: colors.border,
    },
    selectedCard: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '20',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardForeground,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginTop: 4,
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
        <Text style={styles.title}>Dietary Restrictions</Text>
        <Text style={styles.subtitle}>Do you have any dietary restrictions? This will help us filter out recipes that don't meet your needs.</Text>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.selectedText}>Selected: {selectedRestrictions.length} {selectedRestrictions.length === 1 ? 'restriction' : 'restrictions'}</Text>
        <View style={styles.grid}>
          {restrictions.map(restriction => (
            <TouchableOpacity
              key={restriction.name}
              style={[styles.card, selectedRestrictions.includes(restriction.name) && styles.selectedCard]}
              onPress={() => handleRestrictionSelect(restriction.name)}
            >
              <Text style={styles.cardTitle}>{restriction.name}</Text>
              <Text style={styles.cardDescription}>{restriction.description}</Text>
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
