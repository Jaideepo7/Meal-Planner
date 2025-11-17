import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Heart, ChefHat, Clock } from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import { Favorite, useFavorites } from '../../../context/FavoritesContext';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
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
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
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
      opacity: 0.9,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    recipeCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      marginBottom: 20,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    recipeImage: {
        width: '100%',
        height: 200,
        backgroundColor: colors.muted,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recipeContent: {
        padding: 20,
    },
    metaContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        color: colors.mutedForeground,
        fontSize: 14,
        fontWeight: '500',
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    emptyStateIcon: {
        marginBottom: 24,
    },
    emptyStateTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: colors.mutedForeground,
        textAlign: 'center',
        marginBottom: 24,
    },
    browseButton: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    browseButtonText: {
        color: colors.primaryForeground,
        fontSize: 16,
        fontWeight: 'bold',
    }
  });
}

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const styles = getStyles(colors);
  const { favorites } = useFavorites();

  const markdownIt = MarkdownIt(); 

  const markdownStyles = {
    body: {
      color: colors.cardForeground,
      fontSize: 16,
    },
    heading1: {
        fontSize: 22,
        fontWeight: 'bold' as const,
        color: colors.primary,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 5,
    },
    strong: {
        fontWeight: 'bold' as const,
        color: colors.text,
    }
  };

  const renderRecipeMeta = (recipe: Favorite) => {
      const timeMatch = recipe.content.match(/\*\*Time:\*\* (.*?\n)/);
      const difficultyMatch = recipe.content.match(/\*\*Difficulty:\*\* (.*?\n)/);

      return (
          <View style={styles.metaContainer}>
              {timeMatch && (
                  <View style={styles.metaItem}>
                      <Clock size={16} color={colors.mutedForeground} />
                      <Text style={styles.metaText}>{timeMatch[1].trim()}</Text>
                  </View>
              )}
              {difficultyMatch && (
                  <View style={styles.metaItem}>
                      <ChefHat size={16} color={colors.mutedForeground} />
                      <Text style={styles.metaText}>{difficultyMatch[1].trim()}</Text>
                  </View>
              )}
          </View>
      )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Heart size={28} color={colors.primary} fill={colors.primary} />
          </View>
          <Text style={styles.title}>My Favorites</Text>
          <Text style={styles.subtitle}>{favorites.length} saved recipes</Text>
        </View>

        {favorites.length > 0 ? (
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {favorites.map((recipe: Favorite) => (
                <View key={recipe.id} style={styles.recipeCard}>
                    <View style={styles.recipeImage}>
                        <ChefHat size={60} color={colors.mutedForeground}/>
                    </View>
                    <View style={styles.recipeContent}>
                        <Markdown markdownit={markdownIt} style={markdownStyles}>{recipe.content}</Markdown>
                        {renderRecipeMeta(recipe)}
                    </View>
                </View>
            ))}
            </ScrollView>
        ) : (
            <View style={styles.emptyStateContainer}>
                <View style={styles.emptyStateIcon}>
                    <Heart size={64} color={colors.mutedForeground} />
                </View>
                <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
                <Text style={styles.emptyStateText}>You haven't saved any recipes. Start exploring and save your favorites!</Text>
                <TouchableOpacity style={styles.browseButton} onPress={() => {}}>
                    <Text style={styles.browseButtonText}>Browse Recipes</Text>
                </TouchableOpacity>
            </View>
        )}
    </SafeAreaView>
  );
}
