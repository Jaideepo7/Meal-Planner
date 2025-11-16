import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  TextInput,
} from 'react-native';
import { Heart, Search, Clock, Flame, Star } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

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
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 24,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.cardForeground,
    },
    recipeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    recipeCard: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 12,
    },
    recipeImage: {
      width: '100%',
      height: 150,
      backgroundColor: colors.muted,
      position: 'relative',
    },
    favoriteIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    recipeInfo: {
      padding: 12,
    },
    recipeTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardForeground,
      marginBottom: 8,
    },
    recipeMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
    },
    recipeMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    recipeMetaText: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    recipeRating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    recipeRatingText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.rating,
    },
  });
}

export default function FavoritesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  // Mock data - in real app, fetch from Firebase
  const favorites = [
    {
      id: '1',
      title: 'Grilled Chicken Salad',
      time: '25 min',
      calories: '320 cal',
      rating: '4.5',
      image: null,
      isFavorite: true,
    },
    {
      id: '2',
      title: 'Veggie Stir Fry',
      time: '20 min',
      calories: '250 cal',
      rating: '4.3',
      image: null,
      isFavorite: true,
    },
    {
      id: '3',
      title: 'Greek Salad',
      time: '12 min',
      calories: '175 cal',
      rating: '4.7',
      image: null,
      isFavorite: true,
    },
    {
      id: '4',
      title: 'Salmon with Asparagus',
      time: '30 min',
      calories: '380 cal',
      rating: '4.2',
      image: null,
      isFavorite: true,
    },
  ];

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
          <View style={styles.searchBar}>
            <Search size={20} color={colors.mutedForeground} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search favorites"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>

          <View style={styles.recipeGrid}>
            {favorites.map((recipe) => (
              <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
                <View style={styles.recipeImage}>
                  <View style={styles.favoriteIcon}>
                    <Heart size={16} color="#F44336" fill="#F44336" />
                  </View>
                </View>
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <View style={styles.recipeMeta}>
                    <View style={styles.recipeMetaItem}>
                      <Clock size={14} color={colors.mutedForeground} />
                      <Text style={styles.recipeMetaText}>{recipe.time}</Text>
                    </View>
                    <View style={styles.recipeMetaItem}>
                      <Flame size={14} color={colors.mutedForeground} />
                      <Text style={styles.recipeMetaText}>{recipe.calories}</Text>
                    </View>
                  </View>
                  <View style={styles.recipeRating}>
                    <Star size={14} color={colors.rating} fill={colors.rating} />
                    <Text style={styles.recipeRatingText}>{recipe.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
