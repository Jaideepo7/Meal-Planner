
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch, useColorScheme } from 'react-native';
import { ChevronRight, Package, Globe2, ShieldAlert, Target } from 'lucide-react-native';
import Colors from '../../constants/Colors';

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
      position: 'relative',
      overflow: 'hidden',
    },
    headerBg1: {
        position: 'absolute',
        top: -128,
        right: -128,
        width: 256,
        height: 256,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 128,
    },
    headerBg2: {
        position: 'absolute',
        bottom: -96,
        left: -96,
        width: 192,
        height: 192,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 96,
    },
    headerContent: {
      alignItems: 'center',
      zIndex: 10,
    },
    title: {
      color: colors.primaryForeground,
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    subtitle: {
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
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    settingsSection: {
      gap: 12,
      marginBottom: 24,
    },
    settingItem: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    settingIconContainer: {
      borderRadius: 30,
      padding: 12,
    },
    settingTextContainer: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardForeground,
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    preferencesCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
    },
    preferencesTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardForeground,
      marginBottom: 16,
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
      fontSize: 14,
      fontWeight: '500',
      color: colors.cardForeground,
      marginBottom: 2,
    },
    preferenceDescription: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
  });
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  const settingsItems = [
    {
      icon: Package,
      title: 'Food Inventory',
      description: 'Manage your available ingredients',
      color: '#dbeafe',
      iconColor: '#2563eb',
    },
    {
      icon: Globe2,
      title: 'Cuisine Preferences',
      description: 'Update your favorite cuisines',
      color: '#e9d5ff',
      iconColor: '#9333ea',
    },
    {
      icon: ShieldAlert,
      title: 'Dietary Restrictions',
      description: 'Manage allergies and restrictions',
      color: '#fee2e2',
      iconColor: '#dc2626',
    },
    {
      icon: Target,
      title: 'Health Goals',
      description: 'Update your dietary goals',
      color: '#dcfce7',
      iconColor: '#16a34a',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerBg1} />
            <View style={styles.headerBg2} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage your preferences</Text>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Your Profile Settings</Text>
          
          <View style={styles.settingsSection}>
            {settingsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity key={index} style={styles.settingItem}>
                  <View style={[styles.settingIconContainer, { backgroundColor: item.color }]}>
                    <Icon size={20} color={item.iconColor} />
                  </View>
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                  <ChevronRight size={20} color={colors.mutedForeground} />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.preferencesCard}>
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Notifications</Text>
                <Text style={styles.preferenceDescription}>Meal reminders and tips</Text>
              </View>
              <Switch
                value={true}
                trackColor={{ false: '#d1d5db', true: colors.primary }}
                thumbColor="white"
              />
            </View>

            <View style={[styles.preferenceItem, styles.preferenceItemBorder]}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Dark Mode</Text>
                <Text style={styles.preferenceDescription}>Coming soon</Text>
              </View>
              <Switch
                value={false}
                disabled={true}
                trackColor={{ false: '#e5e7eb', true: colors.primary }}
                thumbColor="white"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
