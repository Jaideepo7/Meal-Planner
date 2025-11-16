
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme, Dimensions, ActivityIndicator } from 'react-native';
import { User, Mail, ChevronRight, Bell, Shield, HelpCircle, LogOut } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('window');

function getStyles(colors: any) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: width * 0.06,
      paddingVertical: height * 0.05,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      alignItems: 'center',
    },
    profileIconContainer: {
      backgroundColor: colors.primaryForeground,
      borderRadius: width * 0.15,
      padding: width * 0.06,
      marginBottom: height * 0.015,
    },
    userName: {
      color: colors.primaryForeground,
      fontSize: width * 0.06,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    userEmailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    userEmail: {
      color: colors.primaryForeground,
      fontSize: width * 0.035,
      opacity: 0.8,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      paddingBottom: 100,
    },
    statsCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: width * 0.05,
      marginBottom: height * 0.03,
    },
    statsTitle: {
      fontSize: width * 0.04,
      fontWeight: '600',
      color: colors.cardForeground,
      marginBottom: height * 0.02,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: width * 0.06,
      fontWeight: 'bold',
      color: colors.cardForeground,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: width * 0.03,
      color: colors.mutedForeground,
    },
    menuSection: {
      gap: width * 0.03,
      marginBottom: height * 0.03,
    },
    menuItem: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: width * 0.05,
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.04,
    },
    menuIconContainer: {
      backgroundColor: colors.accent,
      borderRadius: 30,
      padding: width * 0.03,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuTitle: {
      fontSize: width * 0.04,
      fontWeight: '600',
      color: colors.cardForeground,
      marginBottom: 2,
    },
    menuDescription: {
      fontSize: width * 0.03,
      color: colors.mutedForeground,
    },
    logoutButton: {
      backgroundColor: colors.destructive,
      borderRadius: 16,
      padding: width * 0.04,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: width * 0.02,
    },
    logoutButtonText: {
      color: 'white',
      fontSize: width * 0.04,
      fontWeight: '600',
    },
  });
}

export default function ProfileScreen() {
  const { logout, user } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const menuItems = [
    { icon: User, title: 'Edit Profile', description: 'Update your personal information' },
    { icon: Bell, title: 'Notifications', description: 'Manage your notification preferences' },
    { icon: Shield, title: 'Privacy & Security', description: 'Password and security settings' },
    { icon: HelpCircle, title: 'Help & Support', description: 'Get help with the app' },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.profileIconContainer}>
            <User size={width * 0.12} color={colors.primary} />
          </View>
          <Text style={styles.userName}>{user.name || 'Anonymous'}</Text>
          <View style={styles.userEmailContainer}>
            <Mail size={width * 0.04} color={colors.primaryForeground} />
            <Text style={styles.userEmail}>{user.email || 'No email provided'}</Text>
          </View>
        </View>

        <View style={{marginTop: -30, paddingHorizontal: 24, paddingBottom: 24}}>
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Recipes Saved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Meals Logged</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <Icon size={width * 0.05} color={colors.accentForeground} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
                <ChevronRight size={width * 0.05} color={colors.mutedForeground} />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={width * 0.05} color="white" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
