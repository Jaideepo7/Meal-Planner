
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, useColorScheme } from 'react-native';
import { usePantry } from '../../context/PantryContext';
import Colors from '../../constants/Colors';
import { Plus, X } from 'lucide-react-native';

function getStyles(colors: any) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 24,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 24,
    },
    input: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
    },
    addButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      marginLeft: 12,
      justifyContent: 'center',
    },
    item: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    itemText: {
      fontSize: 16,
      color: colors.cardForeground,
    },
  });
}

export default function PantryScreen() {
  const { pantry, setPantry } = usePantry();
  const [newItem, setNewItem] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  const addItem = () => {
    if (newItem.trim()) {
      setPantry([...pantry, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (itemToRemove: string) => {
    setPantry(pantry.filter(item => item !== itemToRemove));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Pantry</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add an item..."
            value={newItem}
            onChangeText={setNewItem}
            placeholderTextColor={colors.mutedForeground}
          />
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Plus size={20} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={pantry}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => removeItem(item)}>
                <X size={20} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
