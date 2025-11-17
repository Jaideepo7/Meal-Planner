import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Bell, Lock, HelpCircle, Mail, ChevronRight, LogOut, Settings, Award, TrendingUp, BookHeart } from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

function getStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1 },
    header: {
        backgroundColor: colors.primary,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primaryForeground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      borderWidth: 3,
      borderColor: colors.primary,
    },
    avatarIconContainer: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primaryForeground,
      marginBottom: 8,
    },
    emailContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    emailText: { fontSize: 16, color: colors.primaryForeground, opacity: 0.9 },
    content: { flex: 1, padding: 24 },
    statsSection: {
        marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
    },
    statsContainer: { flexDirection: 'row', gap: 16 },
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
    statValue: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 6 },
    statLabel: { fontSize: 14, color: colors.mutedForeground, textAlign: 'center', fontWeight: '500' },
    
    menuSection: { marginBottom: 24 },
    menuCard: {
        backgroundColor: colors.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemLast: { borderBottomWidth: 0 },
    menuIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    menuTextContainer: { flex: 1 },
    menuTitle: { fontSize: 16, fontWeight: '600', color: colors.cardForeground },
  });
}

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const styles = getStyles(colors);
  const { user, logout } = useAuth();

  // Mock data
  const stats = {
    recipesSaved: 24,
    mealsLogged: 18,
    dayStreak: 7,
  };

  const menuItems = [
    { icon: User, bgColor: '#3b82f6', title: 'Edit Profile', screen: '/(app)/(tabs)/settings' },
    { icon: BookHeart, bgColor: '#ec4899', title: 'Favorite Recipes', screen: '/(app)/(tabs)/favorites' },
    { icon: Settings, bgColor: '#8b5cf6', title: 'Settings', screen: '/(app)/(tabs)/settings' },
    { icon: HelpCircle, bgColor: '#f97316', title: 'Help & Support', screen: '/(app)/(tabs)/settings' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <View style={styles.avatarIconContainer}>
              <User size={50} color={colors.primary} />
            </View>
          </View>
          <Text style={styles.name}>
            {user?.displayName || user?.email?.split('@')[0] || 'John Doe'}
          </Text>
          <View style={styles.emailContainer}>
            <Mail size={16} color={colors.primaryForeground} />
            <Text style={styles.emailText}>
              {user?.email || 'john.doe@example.com'}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
            <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>Your Stats</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <View style={styles.statIcon}><BookHeart size={24} color={colors.primary} /></View>
                        <Text style={styles.statValue}>{stats.recipesSaved}</Text>
                        <Text style={styles.statLabel}>Recipes Saved</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={styles.statIcon}><TrendingUp size={24} color={colors.primary} /></View>
                        <Text style={styles.statValue}>{stats.dayStreak}</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={styles.statIcon}><Award size={24} color={colors.primary} /></View>
                        <Text style={styles.statValue}>{stats.mealsLogged}</Text>
                        <Text style={styles.statLabel}>Meals Logged</Text>
                    </View>
                </View>
            </View>

            <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Menu</Text>
                <View style={styles.menuCard}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={[styles.menuItem, index === menuItems.length - 1 && styles.menuItemLast]} onPress={() => router.push(item.screen as any)}>
                            <View style={[styles.menuIcon, { backgroundColor: item.bgColor + '20' }]}>
                                <item.icon size={20} color={item.bgColor} />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                            </View>
                            <ChevronRight size={20} color={colors.mutedForeground} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity onPress={async () => await logout()} style={{alignItems: 'center', marginVertical: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.card, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 30}}>
                    <LogOut size={20} color={'#ef4444'} />
                    <Text style={{color: '#ef4444', fontWeight: '600', fontSize: 16}}>Sign Out</Text>
                </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
