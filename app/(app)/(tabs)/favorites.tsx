import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Heart } from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import { useFavorites } from '../../../context/FavoritesContext';
import Markdown from 'react-native-markdown-display';
import { useTheme } from '../../../context/ThemeContext';

function getStyles(colors: typeof Colors.light) {
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
      paddingTop: 60,
      paddingBottom: 32,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      alignItems: 'center',
    },
    headerIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primaryForeground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primaryForeground,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.primaryForeground,
      opacity: 0.8,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    recipeCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
    },
    recipeText: {
      color: colors.cardForeground,
    },
  });
}

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Heart size={28} color={colors.primary} fill={colors.primary} />
          </View>
          <Text style={styles.title}>My Favorites</Text>
          <Text style={styles.subtitle}>{favorites.length} saved recipes</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {favorites.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <Markdown style={{text: styles.recipeText}}>{recipe.content}</Markdown>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
