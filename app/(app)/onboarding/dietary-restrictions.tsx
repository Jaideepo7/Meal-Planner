'use client';

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Leaf, WheatOff, MilkOff, Banana, FishOff, Star, Moon, MinusCircle, Brain, Shield } from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { usePreferences } from '../../../context/PreferencesContext';
import { updateUserProfile } from '../../../services/database';

const restrictions = [
  { name: 'Vegetarian', icon: Leaf },
  { name: 'Vegan', icon: Leaf },
  { name: 'Gluten-Free', icon: WheatOff },
  { name: 'Dairy-Free', icon: MilkOff },
  { name: 'Nut Allergy', icon: Banana },
  { name: 'Shellfish Allergy', icon: FishOff },
  { name: 'Kosher', icon: Star },
  { name: 'Halal', icon: Moon },
  { name: 'Low Sodium', icon: MinusCircle },
  { name: 'Keto', icon: Brain },
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
        width: '32%',
        aspectRatio: 1,
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 10,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
      },
      selectedCard: {
        borderColor: colors.primaryForeground,
      },
      cardIcon: { marginBottom: 8 },
      cardText: { color: colors.primaryForeground, fontSize: 12, fontWeight: '600', textAlign: 'center' },
    footer: { padding: 24, paddingTop: 12 },
    button: {
        backgroundColor: colors.card,
        borderRadius: 50,
        padding: 18,
        alignItems: 'center',
      },
      buttonText: { color: colors.cardForeground, fontSize: 16, fontWeight: 'bold' },
  });
}

export default function DietaryRestrictionsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const styles = getStyles(colors);
  const router = useRouter();
  const { user } = useAuth();
  const { setDietaryRestrictions } = usePreferences();
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);

  const toggleRestriction = (restriction: string) => {
    setSelectedRestrictions(prev => 
      prev.includes(restriction) ? prev.filter(r => r !== restriction) : [...prev, restriction]
    );
  };

  const handleContinue = async () => {
    if (user) {
      await updateUserProfile(user.uid, { dietaryRestrictions: selectedRestrictions });
    }
    setDietaryRestrictions(selectedRestrictions);
    router.push('./goals');
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
                        <Shield size={32} color={colors.primaryForeground} />
                    </View>
                    <Text style={styles.title}>Dietary Restrictions</Text>
                    <Text style={styles.subtitle}>Tell us about any dietary needs</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.selectedCount}>Selected: {selectedRestrictions.length} restrictions</Text>
                <View style={styles.grid}>
                {restrictions.map(restriction => {
                    const isSelected = selectedRestrictions.includes(restriction.name);
                    return (
                    <TouchableOpacity 
                        key={restriction.name} 
                        style={[styles.card, isSelected && styles.selectedCard]} 
                        onPress={() => toggleRestriction(restriction.name)}
                    >
                        <restriction.icon size={28} color={colors.primaryForeground} style={styles.cardIcon} />
                        <Text style={styles.cardText}>{restriction.name}</Text>
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