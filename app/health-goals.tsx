
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Check, ChevronRight } from 'lucide-react-native';
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
      gap: 12,
      marginBottom: 32,
    },
    optionButton: {
      padding: 16,
      borderRadius: 16,
      borderWidth: 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionTextContainer: {
      flex: 1,
      marginRight: 12,
    },
    optionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    optionDescription: {
      fontSize: 14,
      marginTop: 4,
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

export default function HealthGoalsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const { setGoals } = usePreferences();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { title: 'Weight Loss', description: 'Reduce calorie intake' },
    { title: 'Muscle Gain', description: 'Increase protein and calories' },
    { title: 'Balanced Diet', description: 'Maintain a healthy mix of nutrients' },
    { title: 'Low Carb', description: 'Reduce carbohydrate intake' },
    { title: 'Heart Health', description: 'Focus on low-fat, low-cholesterol meals' },
  ];

  const handleGoalSelect = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleFinish = () => {
    setGoals(selectedGoals);
    router.push('/(app)/ask-ai');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Health Goals</Text>
        <Text style={styles.subtitle}>What are you aiming for? This helps tailor your meal recommendations.</Text>
        
        <View style={styles.optionContainer}>
          {goals.map(goal => {
            const isSelected = selectedGoals.includes(goal.title);
            const titleColor = isSelected ? colors.primary : colors.text;
            const descriptionColor = isSelected ? colors.primary : colors.mutedForeground;

            return (
              <TouchableOpacity
                key={goal.title}
                style={[
                  styles.optionButton,
                  { 
                    backgroundColor: isSelected ? colors.primary + '20' : colors.card, 
                    borderColor: isSelected ? colors.primary : colors.border 
                  }
                ]}
                onPress={() => handleGoalSelect(goal.title)}
              >
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionTitle, { color: titleColor }]}>{goal.title}</Text>
                  <Text style={[styles.optionDescription, { color: descriptionColor }]}>{goal.description}</Text>
                </View>
                {isSelected && <Check size={24} color={colors.primary} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>Finish</Text>
            <Check size={20} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
