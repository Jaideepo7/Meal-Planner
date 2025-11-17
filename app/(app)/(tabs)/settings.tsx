
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Bell, Lock, HelpCircle, Mail, ChevronRight, LogOut, Moon } from 'lucide-react-native';
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
        backgroundColor: colors.card,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 16,
    },
    settingsCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingsItemLast: {
        borderBottomWidth: 0,
    },
    settingsIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
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
    },
    settingsDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginTop: 2,
    },
  });
}

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];
  const styles = getStyles(colors);
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const accountItems = [
    {
      icon: User,
      bgColor: '#3b82f6' + '20',
      iconColor: '#3b82f6',
      title: 'Edit Profile',
      description: 'Update your personal information',
      onPress: () => {},
    },
    {
      icon: Lock,
      bgColor: '#ec4899' + '20',
      iconColor: '#ec4899',
      title: 'Privacy & Security',
      description: 'Password and security settings',
      onPress: () => {},
    },
  ];

  const appItems = [
    {
      icon: Bell,
      bgColor: '#4CAF50' + '20',
      iconColor: '#4CAF50',
      title: 'Notifications',
      description: 'Meal reminders and tips',
      isSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
    },
    {
      icon: Moon,
      bgColor: colors.muted,
      iconColor: colors.mutedForeground,
      title: 'Dark Mode',
      description: 'Toggle dark mode',
      isSwitch: true,
      switchValue: theme === 'dark',
      onSwitchChange: toggleTheme,
    },
  ];

  const supportItems = [
    {
      icon: HelpCircle,
      bgColor: '#8b5cf6' + '20',
      iconColor: '#8b5cf6',
      title: 'Help & Support',
      description: 'Get help with the app',
      onPress: () => {},
    },
    {
      icon: Mail,
      bgColor: '#f97316' + '20',
      iconColor: '#f97316',
      title: 'Contact Us',
      description: 'Send us your feedback',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
        </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.settingsCard}>
                {accountItems.map((item, index) => (
                    <TouchableOpacity key={index} style={[styles.settingsItem, index === accountItems.length - 1 && styles.settingsItemLast]} onPress={item.onPress}>
                        <View style={[styles.settingsIcon, { backgroundColor: item.bgColor }]}>
                            <item.icon size={20} color={item.iconColor} />
                        </View>
                        <View style={styles.settingsText}>
                            <Text style={styles.settingsTitle}>{item.title}</Text>
                            <Text style={styles.settingsDescription}>{item.description}</Text>
                        </View>
                        <ChevronRight size={20} color={colors.mutedForeground} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
        
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Preferences</Text>
            <View style={styles.settingsCard}>
                {appItems.map((item, index) => (
                    <View key={index} style={[styles.settingsItem, index === appItems.length - 1 && styles.settingsItemLast]}>
                        <View style={[styles.settingsIcon, { backgroundColor: item.bgColor }]}>
                            <item.icon size={20} color={item.iconColor} />
                        </View>
                        <View style={styles.settingsText}>
                            <Text style={styles.settingsTitle}>{item.title}</Text>
                            <Text style={styles.settingsDescription}>{item.description}</Text>
                        </View>
                        {item.isSwitch && (
                            <Switch
                                value={item.switchValue}
                                onValueChange={item.onSwitchChange}
                                trackColor={{ false: colors.muted, true: colors.primary }}
                                thumbColor={colors.primaryForeground}
                            />
                        )}
                    </View>
                ))}
            </View>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.settingsCard}>
                {supportItems.map((item, index) => (
                    <TouchableOpacity key={index} style={[styles.settingsItem, index === supportItems.length - 1 && styles.settingsItemLast]} onPress={item.onPress}>
                        <View style={[styles.settingsIcon, { backgroundColor: item.bgColor }]}>
                            <item.icon size={20} color={item.iconColor} />
                        </View>
                        <View style={styles.settingsText}>
                            <Text style={styles.settingsTitle}>{item.title}</Text>
                            <Text style={styles.settingsDescription}>{item.description}</Text>
                        </View>
                        <ChevronRight size={20} color={colors.mutedForeground} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        <TouchableOpacity onPress={async () => await logout()}>
            <Text style={{textAlign: 'center', color: '#ef4444', fontWeight: '600', fontSize: 16, paddingVertical: 16}}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
