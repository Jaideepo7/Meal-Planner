
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme } from 'react-native';
import { User, Mail, Bell, Lock, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../constants/Colors';

const getStyles = (colors) => StyleSheet.create({
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
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: colors.secondary,
    borderRadius: 60,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: colors.primaryForeground,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  email: {
    color: colors.primaryForeground,
    fontSize: 14,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIconContainer: {
    backgroundColor: colors.secondary,
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
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
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
  logoutButton: {
    backgroundColor: colors.destructive,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  logoutText: {
    color: '#fff', // Destructive actions usually have white text
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.mutedForeground,
  },
});

export default function ProfileScreen() {
  const { logout } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  const menuItems = [
    { icon: User, title: 'Edit Profile', description: 'Update your personal information' },
    { icon: Bell, title: 'Notifications', description: 'Manage your notification preferences' },
    { icon: Lock, title: 'Privacy & Security', description: 'Password and security settings' },
    { icon: HelpCircle, title: 'Help & Support', description: 'Get help with the app' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User size={64} color={colors.secondaryForeground} />
              </View>
            </View>
            <Text style={styles.name}>John Doe</Text>
            <View style={styles.emailContainer}>
              <Mail size={16} color={colors.primaryForeground} style={{ opacity: 0.8 }} />
              <Text style={styles.email}>john.doe@example.com</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.menuSection}>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity key={index} style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                      <Icon size={20} color={colors.secondaryForeground} />
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

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <LogOut size={20} color="#fff" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            <Text style={styles.version}>MealMind AI v1.0.0</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
