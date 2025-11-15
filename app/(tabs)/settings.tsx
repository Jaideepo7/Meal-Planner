import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch } from 'react-native';
import { ChevronRight, Package, Globe2, ShieldAlert, Target } from 'lucide-react-native';

export default function SettingsScreen() {
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBg1} />
          <View style={styles.headerBg2} />
          
          <View style={styles.headerContent}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage your preferences</Text>
          </View>
        </View>

        {/* Content */}
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
                  <ChevronRight size={20} color="rgba(44,95,45,0.4)" />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* App Preferences */}
          <View style={styles.preferencesCard}>
            <Text style={styles.preferencesTitle}>App Preferences</Text>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Notifications</Text>
                <Text style={styles.preferenceDescription}>Meal reminders and tips</Text>
              </View>
              <Switch
                value={true}
                trackColor={{ false: '#d1d5db', true: '#2C5F2D' }}
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
                trackColor={{ false: '#e5e7eb', true: '#2C5F2D' }}
                thumbColor="white"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#2C5F2D',
    paddingHorizontal: 24,
    paddingVertical: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  headerBg1: {
    position: 'absolute',
    top: -128,
    right: -128,
    width: 256,
    height: 256,
    backgroundColor: '#3D7A3F',
    borderRadius: 128,
    opacity: 0.5,
  },
  headerBg2: {
    position: 'absolute',
    bottom: -96,
    left: -96,
    width: 192,
    height: 192,
    backgroundColor: '#3D7A3F',
    borderRadius: 96,
    opacity: 0.5,
  },
  headerContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#F5EDD1',
    fontSize: 14,
  },
  content: {
    flex: 1,
    backgroundColor: '#F5EDD1',
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C5F2D',
    marginBottom: 12,
  },
  settingsSection: {
    gap: 12,
    marginBottom: 24,
  },
  settingItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    color: '#2C5F2D',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: 'rgba(44,95,45,0.6)',
  },
  preferencesCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  preferencesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C5F2D',
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
    borderTopColor: 'rgba(44,95,45,0.1)',
    marginTop: 4,
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C5F2D',
    marginBottom: 2,
  },
  preferenceDescription: {
    fontSize: 12,
    color: 'rgba(44,95,45,0.6)',
  },
});