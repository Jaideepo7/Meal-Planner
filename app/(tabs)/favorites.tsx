
import { StyleSheet, View, Text, SafeAreaView, useColorScheme, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

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
      padding: width * 0.06,
    },
    title: {
      fontSize: width * 0.06,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: width * 0.04,
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
