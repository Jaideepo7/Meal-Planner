import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Box,
  ChefHat,
  Shield,
  Target,
  Bell,
  Moon,
  ChevronRight,
} from 'lucide-react-native';
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
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primaryForeground,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.primaryForeground,
      opacity: 0.8,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.mutedForeground,
      marginBottom: 12,
      marginLeft: 4,
    },
    settingsCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    settingsItemLast: {
      marginBottom: 0,
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
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
}

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const profileSettings = [
    {
      icon: Box,
      title: 'Food Inventory',
      description: 'Manage your available ingredients',
      onPress: () => router.push('/food-inventory'),
      iconColor: '#4285F4',
    },
    {
      icon: ChefHat,
      title: 'Cuisine Preferences',
      description: 'Update your favorite cuisines',
      onPress: () => router.push('/food-preferences'),
      iconColor: '#9C27B0',
    },
    {
      icon: Shield,
      title: 'Dietary Restrictions',
      description: 'Manage allergies and restrictions',
      onPress: () => router.push('/dietary-restrictions'),
      iconColor: '#F44336',
    },
    {
      icon: Target,
      title: 'Health Goals',
      description: 'Update your dietary goals',
      onPress: () => router.push('/goals'),
      iconColor: '#4CAF50',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your preferences</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Profile Settings</Text>
            {profileSettings.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingsCard}
                onPress={item.onPress}
              >
                <View style={styles.settingsItem}>
                  <View style={[styles.settingsIcon, { backgroundColor: item.iconColor + '20' }]}>
                    <item.icon size={20} color={item.iconColor} />
                  </View>
                  <View style={styles.settingsText}>
                    <Text style={styles.settingsTitle}>{item.title}</Text>
                    <Text style={styles.settingsDescription}>{item.description}</Text>
                  </View>
                  <ChevronRight size={20} color={colors.mutedForeground} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Preferences</Text>
            <View style={styles.settingsCard}>
              <View style={[styles.settingsItem, styles.settingsItemLast]}>
                <View style={[styles.settingsIcon, { backgroundColor: '#4CAF50' + '20' }]}>
                  <Bell size={20} color="#4CAF50" />
                </View>
                <View style={styles.settingsText}>
                  <Text style={styles.settingsTitle}>Notifications</Text>
                  <Text style={styles.settingsDescription}>Meal reminders and tips</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: colors.muted, true: colors.primary }}
                  thumbColor={colors.primaryForeground}
                />
              </View>
              <View style={styles.settingsItem}>
                <View style={[styles.settingsIcon, { backgroundColor: colors.muted }]}>
                  <Moon size={20} color={colors.mutedForeground} />
                </View>
                <View style={styles.settingsText}>
                  <Text style={styles.settingsTitle}>Dark Mode</Text>
                  <Text style={styles.settingsDescription}>Coming soon</Text>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: colors.muted, true: colors.primary }}
                  thumbColor={colors.primaryForeground}
                  disabled={true}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
