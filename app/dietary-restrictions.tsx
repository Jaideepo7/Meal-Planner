
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme } from 'react-native';
import { ChevronLeft, Shield } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import React from 'react';

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
    selectedText: {
        color: colors.text,
        textAlign: 'center',
        marginBottom: 12,
    },
    restrictionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    restrictionCard: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      gap: 8,
    },
    restrictionName: {
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

export default function DietaryRestrictionsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const { setDietaryRestrictions } = usePreferences();
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);

  const restrictions = [
    { name: 'Vegetarian', emoji: '🥦' },
    { name: 'Vegan', emoji: '🌱' },
    { name: 'Gluten-Free', emoji: '🌾' },
    { name: 'Dairy-Free', emoji: '🥛' },
    { name: 'Nut Allergy', emoji: '🥜' },
    { name: 'Shellfish Allergy', emoji: '🦐' },
    { name: 'Kosher', emoji: '✡️' },
    { name: 'Halal', emoji: '☪️' },
    { name: 'Low Sodium', emoji: '🧂' },
    { name: 'Keto', emoji: '🥑' },
  ];

  const handleRestrictionSelect = (restriction: string) => {
    setSelectedRestrictions(prev => 
      prev.includes(restriction) ? prev.filter(r => r !== restriction) : [...prev, restriction]
    );
  };

  const handleContinue = () => {
    setDietaryRestrictions(selectedRestrictions);
    router.push('/health-goals');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.primaryForeground} />
          </TouchableOpacity>
          <View style={styles.headerIcon}>
            <Shield size={28} color={colors.primary} />
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.title}>Dietary Restrictions</Text>
            <Text style={styles.subtitle}>Tell us about any dietary needs</Text>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.selectedText}>Selected: {selectedRestrictions.length} {selectedRestrictions.length === 1 ? 'restriction' : 'restrictions'}</Text>
          <View style={styles.restrictionGrid}>
            {restrictions.map((restriction, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.restrictionCard, 
                  { backgroundColor: selectedRestrictions.includes(restriction.name) ? colors.primary : colors.card }
                ]} 
                onPress={() => handleRestrictionSelect(restriction.name)}
              >
                <Text style={{fontSize: 40}}>{restriction.emoji}</Text>
                <Text style={[
                  styles.restrictionName, 
                  { color: selectedRestrictions.includes(restriction.name) ? colors.primaryForeground : colors.cardForeground }
                ]}>
                  {restriction.name}
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
