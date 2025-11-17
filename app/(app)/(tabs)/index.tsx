import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChefHat, Sparkles, BookOpen, TrendingUp, Clock, Heart } from 'lucide-react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import Colors from '../../../constants/Colors';

function getStyles(colors: typeof Colors.light) {
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
      paddingBottom: 32,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primaryForeground,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    headerText: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primaryForeground,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.primaryForeground,
      opacity: 0.8,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    statsContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
    },
    statIcon: {
      marginBottom: 8,
    },
    statValue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 16,
    },
    quickActionsContainer: {
      gap: 12,
      marginBottom: 24,
    },
    quickActionButton: {
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    quickActionPrimary: {
      backgroundColor: colors.primary,
    },
    quickActionSecondary: {
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    quickActionIcon: {
      marginRight: 16,
    },
    quickActionText: {
      flex: 1,
    },
    quickActionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    quickActionTitlePrimary: {
      color: colors.primaryForeground,
    },
    quickActionTitleSecondary: {
      color: colors.primary,
    },
    quickActionDescription: {
      fontSize: 14,
    },
    quickActionDescriptionPrimary: {
      color: colors.primaryForeground,
      opacity: 0.8,
    },
    quickActionDescriptionSecondary: {
      color: colors.mutedForeground,
    },
    recommendedContainer: {
      marginBottom: 24,
    },
    recommendedCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      overflow: 'hidden',
    },
    recommendedImage: {
      width: '100%',
      height: 200,
      backgroundColor: colors.muted,
    },
    recommendedInfo: {
      padding: 16,
    },
    recommendedTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.cardForeground,
      marginBottom: 8,
    },
    recommendedMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    recommendedMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    recommendedMetaText: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
  });
}

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { user } = useAuth();

  // Mock data - in real app, fetch from Firebase
  const stats = {
    dayStreak: 7,
    mealsLogged: 18,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <ChefHat size={24} color={colors.primary} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Welcome Back!</Text>
            <Text style={styles.headerSubtitle}>What would you like to cook today?</Text>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <TrendingUp size={24} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{stats.dayStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Clock size={24} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{stats.mealsLogged}</Text>
              <Text style={styles.statLabel}>Meals Logged</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={[styles.quickActionButton, styles.quickActionPrimary]}
              onPress={() => router.push('/(app)/ask-ai')}
            >
              <View style={styles.quickActionIcon}>
                <Sparkles size={24} color={colors.primaryForeground} />
              </View>
              <View style={styles.quickActionText}>
                <Text style={[styles.quickActionTitle, styles.quickActionTitlePrimary]}>
                  Ask AI
                </Text>
                <Text style={[styles.quickActionDescription, styles.quickActionDescriptionPrimary]}>
                  Get recipe ideas and more
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionButton, styles.quickActionSecondary]}
              onPress={() => router.push('/(app)/(tabs)/pantry')}
            >
              <View style={styles.quickActionIcon}>
                <BookOpen size={24} color={colors.primary} />
              </View>
              <View style={styles.quickActionText}>
                <Text style={[styles.quickActionTitle, styles.quickActionTitleSecondary]}>
                  Browse Recipes
                </Text>
                <Text style={[styles.quickActionDescription, styles.quickActionDescriptionSecondary]}>
                  Discover new meal ideas
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <View style={styles.recommendedContainer}>
            <TouchableOpacity style={styles.recommendedCard}>
              <View style={styles.recommendedImage}>
                {/* Placeholder for recipe image */}
                <View style={{ flex: 1, backgroundColor: colors.muted, justifyContent: 'center', alignItems: 'center' }}>
                  <ChefHat size={48} color={colors.mutedForeground} />
                </View>
              </View>
              <View style={styles.recommendedInfo}>
                <Text style={styles.recommendedTitle}>Grilled Chicken Salad Bowl</Text>
                <View style={styles.recommendedMeta}>
                  <View style={styles.recommendedMetaItem}>
                    <Clock size={16} color={colors.mutedForeground} />
                    <Text style={styles.recommendedMetaText}>25 min</Text>
                  </View>
                  <View style={styles.recommendedMetaItem}>
                    <Heart size={16} color={colors.mutedForeground} />
                    <Text style={styles.recommendedMetaText}>320 cal</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
