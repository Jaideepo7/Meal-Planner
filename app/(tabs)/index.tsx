
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme } from 'react-native';
import { ChefHat, TrendingUp, Clock, Sparkles } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { Strings } from '../../constants/Strings';

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
    },
    greeting: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconContainer: {
      backgroundColor: colors.primaryForeground,
      borderRadius: 40,
      padding: 12,
    },
    title: {
      color: colors.primaryForeground,
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.primaryForeground,
      fontSize: 14,
      marginTop: 2,
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
    statsGrid: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statIconBg: {
      borderRadius: 20,
      padding: 8,
      alignSelf: 'flex-start',
      marginBottom: 8,
    },
    statValue: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.cardForeground,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    primaryAction: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginBottom: 12,
    },
    primaryActionIcon: {
      backgroundColor: colors.primaryForeground,
      borderRadius: 40,
      padding: 12,
    },
    primaryActionText: {
      flex: 1,
    },
    primaryActionTitle: {
      color: colors.primaryForeground,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
    },
    primaryActionSubtitle: {
      color: colors.primaryForeground,
      fontSize: 12,
      opacity: 0.8,
    },
    secondaryAction: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondaryActionIcon: {
      backgroundColor: colors.secondary,
      borderRadius: 40,
      padding: 12,
    },
    secondaryActionText: {
      flex: 1,
    },
    secondaryActionTitle: {
      color: colors.cardForeground,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
    },
    secondaryActionSubtitle: {
      color: colors.mutedForeground,
      fontSize: 12,
    },
  });
}

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.greeting}>
              <View style={styles.iconContainer}>
                <ChefHat size={32} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.title}>{Strings.home.welcome}</Text>
                <Text style={styles.subtitle}>{Strings.home.whatToCook}</Text>
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={[styles.statIconBg, { backgroundColor: colors.accent }]}>
                  <TrendingUp size={20} color={colors.accentForeground} />
                </View>
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>{Strings.home.dayStreak}</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIconBg, { backgroundColor: colors.accent }]}>
                  <Clock size={20} color={colors.accentForeground} />
                </View>
                <Text style={styles.statValue}>18</Text>
                <Text style={styles.statLabel}>{Strings.home.mealsLogged}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>{Strings.home.quickActions}</Text>
            
            <TouchableOpacity style={styles.primaryAction}>
              <View style={styles.primaryActionIcon}>
                <Sparkles size={24} color={colors.primary} />
              </View>
              <View style={styles.primaryActionText}>
                <Text style={styles.primaryActionTitle}>{Strings.home.askAI}</Text>
                <Text style={styles.primaryActionSubtitle}>{Strings.home.askAIDescription}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryAction}>
              <View style={styles.secondaryActionIcon}>
                <ChefHat size={24} color={colors.secondaryForeground} />
              </View>
              <View style={styles.secondaryActionText}>
                <Text style={styles.secondaryActionTitle}>{Strings.home.browseRecipes}</Text>
                <Text style={styles.secondaryActionSubtitle}>{Strings.home.browseRecipesDescription}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
