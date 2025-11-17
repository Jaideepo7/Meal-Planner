'use client';

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, Target } from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { usePreferences } from '../../../context/PreferencesContext';
import { updateUserProfile } from '../../../services/database';

const goals = [
  { name: 'Build Muscle (Bulk)', description: 'High protein, calorie surplus meals', emoji: '💪' },
  { name: 'Lose Weight', description: 'Calorie deficit, balanced nutrition', emoji: '⚖️' },
  { name: 'Maintain Weight', description: 'Balanced meals for maintenance', emoji: '🎯' },
  { name: 'Athletic Performance', description: 'Optimize energy and recovery', emoji: '🏃' },
  { name: 'Eat Healthier', description: 'Nutrient-dense, whole foods', emoji: '🥗' },
  { name: 'Budget Friendly', description: 'Cost-effective meal planning', emoji: '💰' },
];

function getStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1, justifyContent: 'space-between' },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 24,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    headerContent: {
      alignItems: 'center',
    },
    headerIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
    subtitle: { fontSize: 16, color: colors.mutedForeground, textAlign: 'center', paddingHorizontal: 24 },
    content: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    card: {
      width: '100%',
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    },
    selectedCard: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '20',
    },
    cardEmoji: { fontSize: 24, marginRight: 16 },
    cardTextContainer: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.cardForeground },
    cardDescription: { fontSize: 14, color: colors.mutedForeground, marginTop: 4 },
    checkIcon: { marginLeft: 16 },
    footer: { padding: 24, paddingTop: 12 },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 50,
      padding: 18,
      alignItems: 'center',
    },
    buttonText: { color: colors.primaryForeground, fontSize: 16, fontWeight: 'bold' },
  });
}

export default function GoalsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const styles = getStyles(colors);
  const router = useRouter();
  const { user } = useAuth();
  const { setHealthGoals } = usePreferences();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleContinue = async () => {
    if (user) {
      await updateUserProfile(user.uid, { healthGoals: selectedGoals });
    }
    setHealthGoals(selectedGoals);
    router.replace('/ask-ai');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 24, top: 60 }}>
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.headerIcon}>
                <Target size={32} color={colors.primaryForeground} />
              </View>
              <Text style={styles.title}>What are your goals?</Text>
              <Text style={styles.subtitle}>Select your primary health and lifestyle objectives.</Text>
            </View>
          </View>

          <View style={styles.content}>
            {goals.map(goal => {
              const isSelected = selectedGoals.includes(goal.name);
              return (
                <TouchableOpacity
                  key={goal.name}
                  style={[styles.card, isSelected && styles.selectedCard]}
                  onPress={() => toggleGoal(goal.name)}
                >
                  <Text style={styles.cardEmoji}>{goal.emoji}</Text>
                  <View style={styles.cardTextContainer}>
                    <Text style={[styles.cardTitle, { color: isSelected ? colors.primary : colors.cardForeground }]}>
                      {goal.name}
                    </Text>
                    <Text style={styles.cardDescription}>{goal.description}</Text>
                  </View>
                  {isSelected && <Check size={24} color={colors.primary} style={styles.checkIcon} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Finish Setup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}