
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView, useColorScheme, Dimensions } from 'react-native';
import { useState } from 'react';
import { Search, Heart, Clock, Flame, Star } from 'lucide-react-native'; // Import Star icon
import { ImageWithFallback } from '../../components/ImageWithFallback';
import Colors from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

type Recipe = {
  id: string;
  title: string;
  image: string;
  time: number;
  calories: number;
  rating: number;
  isFavorite: boolean;
};

const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    time: 25,
    calories: 320,
    rating: 4.5,
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Quinoa Buddha Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    time: 15,
    calories: 180,
    rating: 4.8,
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Veggie Stir Fry',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b72a6?w=400&h=300&fit=crop',
    time: 20,
    calories: 250,
    rating: 4.3,
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Zucchini Noodles',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop',
    time: 10,
    calories: 150,
    rating: 4.6,
    isFavorite: false,
  },
];

// Correctly define styles outside the component, accepting colors as an argument
const getStyles = (colors: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.025,
    paddingBottom: height * 0.03,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  title: {
    color: colors.primaryForeground,
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: colors.primaryForeground,
    fontSize: width * 0.035,
    opacity: 0.8,
  },
  searchContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 16,
    fontSize: width * 0.04,
    color: colors.text,
    borderColor: colors.border,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: width * 0.04,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  recipeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    width: '48%',
    borderColor: colors.border,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 4/3,
    backgroundColor: colors.muted,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: `${colors.card}99`,
    borderRadius: 20,
    padding: 8,
  },
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: colors.cardForeground,
    marginBottom: 12,
    minHeight: 34, 
  },
  recipeStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: width * 0.03,
    color: colors.mutedForeground,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: width * 0.035,
    fontWeight: '500',
    color: colors.cardForeground,
  },
});

export default function RecipesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState(MOCK_RECIPES);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    ));
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeCard}>
      <View style={styles.imageContainer}>
        <ImageWithFallback 
          source={{ uri: item.image }}
          style={styles.recipeImage}
        />
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          style={styles.favoriteButton}
        >
          <Heart
            size={width * 0.04}
            color={item.isFavorite ? colors.destructive : colors.mutedForeground}
            fill={item.isFavorite ? colors.destructive : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.recipeStats}>
          <View style={styles.stat}>
            <Clock size={width * 0.035} color={colors.mutedForeground} />
            <Text style={styles.statText}>{item.time} min</Text>
          </View>
          <View style={styles.stat}>
            <Flame size={width * 0.035} color={colors.mutedForeground} />
            <Text style={styles.statText}>{item.calories} cal</Text>
          </View>
        </View>

        <View style={styles.rating}>
          {/* Use the Star icon and theme color */}
          <Star size={width * 0.04} color={colors.rating} fill={colors.rating} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Recipes</Text>
            <Text style={styles.subtitle}>{filteredRecipes.length} recipes found</Text>
          </View>

          <View style={styles.searchContainer}>
            <Search size={width * 0.05} color={colors.mutedForeground} style={styles.searchIcon} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search recipes"
              placeholderTextColor={colors.mutedForeground}
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.content}>
          <FlatList
            data={filteredRecipes}
            renderItem={renderRecipe}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
