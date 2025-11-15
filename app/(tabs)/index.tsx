
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme, Image } from 'react-native';
import { ChefHat, TrendingUp, Clock, Sparkles } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { Strings } from '../../constants/Strings';
import { useRouter } from 'expo-router';

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
      backgroundColor: 'rgba(255,255,255,0.2)',
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
    },
    secondaryActionIcon: {
      backgroundColor: colors.accent,
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
    recommendationCard: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    recommendationImage: {
        width: '100%',
        height: 200,
    }
  });
}

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
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

          <View style={{marginTop: -30, paddingHorizontal: 24, paddingBottom: 24}}>
            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <View style={[styles.statIconBg, { backgroundColor: colors.accent }]}>
                    <TrendingUp size={20} color={colors.accentForeground} />
                    </View>
                    <Text style={styles.statValue}>7</Text>
                    <Text style={styles.statLabel}>{Strings.home.dayStreak}</Text>
                </View>

                <View style={styles.statCard}>
                    <View style={[styles.statIconBg, { backgroundColor: colors.accent}]}>
                    <Clock size={20} color={colors.accentForeground} />
                    </View>
                    <Text style={styles.statValue}>18</Text>
                    <Text style={styles.statLabel}>{Strings.home.mealsLogged}</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>{Strings.home.quickActions}</Text>
            
            <TouchableOpacity style={styles.primaryAction} onPress={() => router.push('/food-preferences')}>
              <View style={styles.primaryActionIcon}>
                <Sparkles size={24} color={colors.primaryForeground} />
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

            <View style={{marginTop: 24}}>
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <View style={styles.recommendationCard}>
                    <Image source={{uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} style={styles.recommendationImage}/>
                </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
