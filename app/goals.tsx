
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme } from 'react-native';
import { ChevronLeft, Target } from 'lucide-react-native';
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
    selectedText: {
        color: colors.text,
        textAlign: 'center',
        marginBottom: 12,
    },
    goalGrid: {
      gap: 12,
    },
    goalCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    goalEmoji: {
      fontSize: 40,
    },
    goalTextContainer: {
      flex: 1,
    },
    goalName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardForeground,
    },
    goalDescription: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checked: {
      backgroundColor: colors.primary,
    },
    check: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.primaryForeground,
    },
    completeButton: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginTop: 24,
    },
    completeButtonText: {
        color: colors.primaryForeground,
        fontSize: 16,
        fontWeight: '600',
    },
    skipButton: {
        marginTop: 12,
        alignItems: 'center',
    },
    skipButtonText: {
        color: colors.mutedForeground,
        fontSize: 12,
    },
  });
}

export default function GoalsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const { setGoals } = usePreferences();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { name: 'Build Muscle (Bulk)', description: 'High protein, calorie surplus meals', emoji: '💪' },
    { name: 'Lose Weight', description: 'Calorie deficit, balanced nutrition', emoji: '⚖️' },
    { name: 'Maintain Weight', description: 'Balanced meals for maintenance', emoji: '🎯' },
    { name: 'Athletic Performance', description: 'Optimize energy and recovery', emoji: '🏃' },
    { name: 'Eat Healthier', description: 'Nutrient-dense, whole foods', emoji: '🥗' },
    { name: 'Budget Friendly', description: 'Cost-effective meal planning', emoji: '💰' },
  ];

  const handleGoalSelect = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleComplete = () => {
    setGoals(selectedGoals);
    router.push('/ask-ai');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.primaryForeground} />
          </TouchableOpacity>
          <View style={styles.headerIcon}>
            <Target size={28} color={colors.primary} />
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.title}>Your Goals</Text>
            <Text style={styles.subtitle}>What are you trying to achieve?</Text>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.selectedText}>Selected: {selectedGoals.length} {selectedGoals.length === 1 ? 'goal' : 'goals'}</Text>
          <View style={styles.goalGrid}>
            {goals.map((goal, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.goalCard} 
                onPress={() => handleGoalSelect(goal.name)}
              >
                <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                <View style={styles.goalTextContainer}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                </View>
                <View style={[styles.checkbox, selectedGoals.includes(goal.name) && styles.checked]}>
                  {selectedGoals.includes(goal.name) && <View style={styles.check} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>Complete Setup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleComplete}>
            <Text style={styles.skipButtonText}>Skip - No specific goals</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
