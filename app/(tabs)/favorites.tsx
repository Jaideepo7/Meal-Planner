
import { StyleSheet, View, Text, SafeAreaView, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

function getStyles(colors: any) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
      textAlign: 'center',
    },
  });
}

export default function FavoritesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>You haven't saved any favorite recipes yet.</Text>
      </View>
    </SafeAreaView>
  );
}
