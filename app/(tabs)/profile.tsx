
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme } from 'react-native';
import { User, Mail, ChevronRight, Bell, Shield, HelpCircle, LogOut } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

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
      paddingVertical: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      alignItems: 'center',
    },
    profileIconContainer: {
      backgroundColor: colors.primaryForeground,
      borderRadius: 60,
      padding: 24,
      marginBottom: 12,
    },
    userName: {
      color: colors.primaryForeground,
      fontSize: 24,
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
      fontSize: 14,
      opacity: 0.8,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: 24,
      paddingBottom: 100,
    },
    statsCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
    },
    statsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardForeground,
      marginBottom: 16,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.cardForeground,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    menuSection: {
      gap: 12,
      marginBottom: 24,
    },
    menuItem: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    menuIconContainer: {
      backgroundColor: colors.accent,
      borderRadius: 30,
      padding: 12,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardForeground,
      marginBottom: 2,
    },
    menuDescription: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    logoutButton: {
      backgroundColor: colors.destructive,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    logoutButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });
}

export default function ProfileScreen() {
  const { logout } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  const menuItems = [
    { icon: User, title: 'Edit Profile', description: 'Update your personal information' },
    { icon: Bell, title: 'Notifications', description: 'Manage your notification preferences' },
    { icon: Shield, title: 'Privacy & Security', description: 'Password and security settings' },
    { icon: HelpCircle, title: 'Help & Support', description: 'Get help with the app' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.profileIconContainer}>
            <User size={48} color={colors.primary} />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <View style={styles.userEmailContainer}>
            <Mail size={16} color={colors.primaryForeground} />
            <Text style={styles.userEmail}>john.doe@example.com</Text>
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
                  <Icon size={20} color={colors.accentForeground} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
                <ChevronRight size={20} color={colors.mutedForeground} />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color="white" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
