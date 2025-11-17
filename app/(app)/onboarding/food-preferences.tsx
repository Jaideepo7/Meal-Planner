'use client';

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Pizza } from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { usePreferences } from '../../../context/PreferencesContext';
import { updateUserProfile } from '../../../services/database';

const cuisines = [
  { name: 'Italian', image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a' },
  { name: 'Mexican', image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1585850621-01b4461a8486' },
  { name: 'Indian', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641' },
  { name: 'Japanese', image: 'https://images.unsplash.com/photo-1569718212165-fb6926c04c27' },
  { name: 'Thai', image: 'https://images.unsplash.com/photo-1559978137-5caf910b3068' },
  { name: 'Mediterranean', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe' },
  { name: 'American', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828' },
  { name: 'French', image: 'https://images.unsplash.com/photo-1511690656953-29c3629f614b' },
];

function getStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1, justifyContent: 'space-between' },
    header: {
        backgroundColor: colors.background,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      headerContent: {
          alignItems: 'center',
      },
      headerIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
      },
    title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
    subtitle: { fontSize: 16, color: colors.mutedForeground, textAlign: 'center' },
    content: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
    selectedCount: { color: colors.mutedForeground, marginBottom: 16, fontSize: 14 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    card: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 20,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'transparent',
      },
      selectedCard: {
        borderColor: colors.primary,
      },
      cardImage: { width: '100%', height: '100%' },
      cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    footer: { padding: 24, paddingTop: 12 },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        padding: 18,
        alignItems: 'center',
      },
      buttonText: { color: colors.primaryForeground, fontSize: 16, fontWeight: 'bold' },
  });
}

export default function FoodPreferencesScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const styles = getStyles(colors);
  const router = useRouter();
  const { user } = useAuth();
  const { setCuisinePreferences } = usePreferences();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const handleContinue = async () => {
    if (user) {
      await updateUserProfile(user.uid, { cuisinePreferences: selectedCuisines });
    }
    setCuisinePreferences(selectedCuisines);
    router.push('./dietary-restrictions');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 24, top: 60 }}>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <View style={styles.headerIcon}>
                        <Pizza size={32} color={colors.primaryForeground} />
                    </View>
                    <Text style={styles.title}>What do you like to eat?</Text>
                    <Text style={styles.subtitle}>Select your favorite cuisines to get started</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.selectedCount}>Selected: {selectedCuisines.length} cuisines</Text>
                <View style={styles.grid}>
                {cuisines.map(cuisine => {
                    const isSelected = selectedCuisines.includes(cuisine.name);
                    return (
                    <TouchableOpacity 
                        key={cuisine.name} 
                        style={[styles.card, isSelected && styles.selectedCard]} 
                        onPress={() => toggleCuisine(cuisine.name)}
                    >
                        <Image source={{ uri: cuisine.image }} style={styles.cardImage} />
                        <View style={[styles.cardOverlay, isSelected && { backgroundColor: 'rgba(0,0,0,0.6)'}]}>
                            <Text style={styles.cardText}>{cuisine.name}</Text>
                        </View>
                    </TouchableOpacity>
                    );
                })}
                </View>
            </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}