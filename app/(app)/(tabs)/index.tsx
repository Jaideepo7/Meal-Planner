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
import { ChefHat, Sparkles, BookOpen, TrendingUp, Clock, Heart, ArrowRight } from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

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
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
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
      opacity: 0.9,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    statsContainer: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 32,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    statIcon: {
      marginBottom: 12,
      backgroundColor: colors.primary + '20',
      borderRadius: 20,
      padding: 10,
    },
    statValue: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 6,
    },
    statLabel: {
      fontSize: 14,
      color: colors.mutedForeground,
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
    },
    quickActionsContainer: {
      gap: 16,
      marginBottom: 32,
    },
    quickActionButton: {
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 3,
    },
    quickActionPrimary: {
      backgroundColor: colors.primary,
    },
    quickActionSecondary: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    quickActionIcon: {
      marginRight: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: 10,
      borderRadius: 22,
    },
    quickActionText: {
      flex: 1,
    },
    quickActionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 6,
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
      opacity: 0.9,
    },
    quickActionDescriptionSecondary: {
      color: colors.mutedForeground,
    },
    arrowIcon: {
        position: 'absolute',
        right: 20,
    },
    recommendedContainer: {
      marginBottom: 24,
    },
    recommendedCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    recommendedImage: {
      width: '100%',
      height: 200,
      backgroundColor: colors.muted,
    },
    recommendedInfo: {
      padding: 20,
    },
    recommendedTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.cardForeground,
      marginBottom: 12,
    },
    recommendedMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 24,
    },
    recommendedMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    recommendedMetaText: {
      fontSize: 14,
      color: colors.mutedForeground,
      fontWeight: '500',
    },
  });
}

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];
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
            <Text style={styles.headerSubtitle}>Ready to cook something amazing?</Text>
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
              onPress={() => router.push('/onboarding/food-preferences')}
            >
              <View style={styles.quickActionIcon}>
                <Sparkles size={24} color={colors.primaryForeground} />
              </View>
              <View style={styles.quickActionText}>
                <Text style={[styles.quickActionTitle, styles.quickActionTitlePrimary]}>
                  Ask AI Chef
                </Text>
                <Text style={[styles.quickActionDescription, styles.quickActionDescriptionPrimary]}>
                  Get recipe ideas, tips, and more
                </Text>
              </View>
              <ArrowRight size={20} color={colors.primaryForeground} style={styles.arrowIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionButton, styles.quickActionSecondary]}
              onPress={() => router.push('/ask-ai')}
            >
              <View style={[styles.quickActionIcon, {backgroundColor: 'transparent'}]}>
                <BookOpen size={24} color={colors.primary} />
              </View>
              <View style={styles.quickActionText}>
                <Text style={[styles.quickActionTitle, styles.quickActionTitleSecondary]}>
                  Browse Recipes
                </Text>
                <Text style={[styles.quickActionDescription, styles.quickActionDescriptionSecondary]}>
                  Discover new and exciting meal ideas
                </Text>
              </View>
              <ArrowRight size={20} color={colors.primary} style={styles.arrowIcon}/>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <View style={styles.recommendedContainer}>
            <TouchableOpacity style={styles.recommendedCard}>
              <Image source={{uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}} style={styles.recommendedImage} />
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
