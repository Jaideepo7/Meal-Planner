
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme, Dimensions, ActivityIndicator, Alert, Switch } from 'react-native';
import { User, Mail, ChevronRight, Bell, Shield, HelpCircle, LogOut, Package, Globe2, ShieldAlert, Target } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

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
    sectionTitle: {
        fontSize: width * 0.035,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 12,
        paddingHorizontal: 24,
      },
      settingsSection: {
        gap: 12,
        marginBottom: 24,
        paddingHorizontal: 24,
      },
      settingItem: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.04,
      },
      settingIconContainer: {
        borderRadius: 30,
        padding: width * 0.03,
      },
      settingTextContainer: {
        flex: 1,
      },
      settingTitle: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: colors.cardForeground,
        marginBottom: 2,
      },
      settingDescription: {
        fontSize: width * 0.03,
        color: colors.mutedForeground,
      },
      preferencesCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: width * 0.05,
        marginHorizontal: 24,
      },
      preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
      },
      preferenceItemBorder: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        marginTop: 4,
      },
      preferenceInfo: {
        flex: 1,
      },
      preferenceTitle: {
        fontSize: width * 0.035,
        fontWeight: '500',
        color: colors.cardForeground,
        marginBottom: 2,
      },
    logoutButton: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: width * 0.04,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: width * 0.02,
      margin: 24,
    },
    logoutButtonText: {
      color: colors.destructive,
      fontSize: width * 0.04,
      fontWeight: '600',
    },
  });
}

export default function ProfileScreen() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleSignOut = () => {
    Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Sign Out',
                style: 'destructive',
                onPress: () => logout(),
            },
        ],
    );
  };

  const settingsItems = [
    {
      icon: Package,
      title: 'Food Inventory',
      description: 'Manage your available ingredients',
      color: '#dbeafe',
      iconColor: '#2563eb',
      route: '/food-inventory',
    },
    {
      icon: Globe2,
      title: 'Cuisine Preferences',
      description: 'Update your favorite cuisines',
      color: '#e9d5ff',
      iconColor: '#9333ea',
      route: '/food-preferences',
    },
    {
      icon: ShieldAlert,
      title: 'Dietary Restrictions',
      description: 'Manage allergies and restrictions',
      color: '#fee2e2',
      iconColor: '#dc2626',
      route: '/dietary-restrictions',
    },
    {
      icon: Target,
      title: 'Health Goals',
      description: 'Update your dietary goals',
      color: '#dcfce7',
      iconColor: '#16a34a',
      route: '/goals',
    },
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

        <View style={{paddingVertical: 24}}>
        <Text style={styles.sectionTitle}>Your Profile Settings</Text>
          <View style={styles.settingsSection}>
            {settingsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity key={index} style={styles.settingItem} onPress={() => router.push(item.route as any)}>
                  <View style={[styles.settingIconContainer, { backgroundColor: item.color }]}>
                    <Icon size={width * 0.05} color={item.iconColor} />
                  </View>
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                  <ChevronRight size={width * 0.05} color={colors.mutedForeground} />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.preferencesCard}>
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Notifications</Text>
              </View>
              <Switch
                value={false}
                onValueChange={() => Alert.alert('Coming Soon!', 'This feature is not yet available.')}
                trackColor={{ false: '#d1d5db', true: colors.primary }}
                thumbColor="white"
              />
            </View>

            <View style={[styles.preferenceItem, styles.preferenceItemBorder]}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Dark Mode</Text>
              </View>
              <Switch
                value={false}
                onValueChange={() => Alert.alert('Coming Soon!', 'This feature is not yet available.')}
                disabled={true}
                trackColor={{ false: '#e5e7eb', true: colors.primary }}
                thumbColor="white"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <LogOut size={width * 0.05} color={colors.destructive} />
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
