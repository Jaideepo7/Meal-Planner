
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../constants/Colors';
import { ChevronRight, LogOut } from 'lucide-react-native';

function getStyles(colors: any) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: 24,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    userEmail: {
      fontSize: 16,
      color: colors.mutedForeground,
      marginTop: 4,
    },
    menu: {
      gap: 12,
    },
    menuItem: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuItemText: {
      fontSize: 16,
      color: colors.cardForeground,
      fontWeight: '600',
    },
    logoutButton: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
      gap: 8,
    },
    logoutButtonText: {
      fontSize: 16,
      color: colors.destructive,
      fontWeight: '600',
    },
  });
}

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  const menuItems = [
    { name: 'Food Preferences', route: '/food-preferences' },
    { name: 'Dietary Restrictions', route: '/dietary-restrictions' },
    { name: 'Health & Fitness Goals', route: '/goals' },
  ] as const;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          {user && <Text style={styles.userEmail}>{user.email}</Text>}
        </View>

        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={() => router.push(item.route)}>
              <Text style={styles.menuItemText}>{item.name}</Text>
              <ChevronRight size={20} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color={colors.destructive} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
