import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Bell, Lock, HelpCircle, Mail, ChevronRight } from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import { useAuth } from '../../../context/AuthContext';

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
      paddingBottom: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      alignItems: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primaryForeground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    avatarIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primaryForeground,
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      color: colors.primaryForeground,
      opacity: 0.8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    settingsSection: {
      marginBottom: 24,
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    settingsIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.muted,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    settingsText: {
      flex: 1,
    },
    settingsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardForeground,
      marginBottom: 4,
    },
    settingsDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    statsSection: {
      marginTop: 24,
      marginBottom: 24,
    },
    statsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: 'center',
    },
  });
}

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const { user } = useAuth();

  // Mock data - in real app, fetch from Firebase
  const stats = {
    recipesSaved: 24,
    mealsLogged: 18,
    dayStreak: 7,
  };

  const settingsItems = [
    {
      icon: User,
      title: 'Edit Profile',
      description: 'Update your personal information',
      onPress: () => {},
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      onPress: () => {},
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Password and security settings',
      onPress: () => {},
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help with the app',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <View style={styles.avatarIcon}>
              <User size={40} color={colors.primaryForeground} />
            </View>
          </View>
          <Text style={styles.name}>
            {user?.displayName || user?.email?.split('@')[0] || 'John Doe'}
          </Text>
          <View style={styles.email}>
            <Mail size={16} color={colors.primaryForeground} />
            <Text style={{ color: colors.primaryForeground, opacity: 0.8 }}>
              {user?.email || 'john.doe@example.com'}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingsItem}
              onPress={item.onPress}
            >
              <View style={styles.settingsIcon}>
                <item.icon size={20} color={colors.primary} />
              </View>
              <View style={styles.settingsText}>
                <Text style={styles.settingsTitle}>{item.title}</Text>
                <Text style={styles.settingsDescription}>{item.description}</Text>
              </View>
              <ChevronRight size={20} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}

          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>Your Stats</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{stats.recipesSaved}</Text>
                <Text style={styles.statLabel}>Recipes Saved</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{stats.mealsLogged}</Text>
                <Text style={styles.statLabel}>Meals Logged</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{stats.dayStreak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
