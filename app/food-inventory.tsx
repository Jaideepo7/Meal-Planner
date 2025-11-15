
'use client';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme, TextInput } from 'react-native';
import { ChevronLeft, Plus, X, ClipboardList } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { Strings } from '../constants/Strings';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { addFoodItem, getFoodItems, deleteFoodItem } from '../services/database';

// Define a type for our food items
interface FoodItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
}

const categories = [
    { label: 'Vegetables', value: 'vegetables' },
    { label: 'Fruits', value: 'fruits' },
    { label: 'Meat & Poultry', value: 'meat-poultry' },
    { label: 'Seafood', value: 'seafood' },
    { label: 'Dairy', value: 'dairy' },
    { label: 'Grains & Pasta', value: 'grains-pasta' },
    { label: 'Canned Goods', value: 'canned-goods' },
    { label: 'Spices & Condiments', value: 'spices-condiments' },
    { label: 'Snacks', value: 'snacks' },
    { label: 'Frozen Foods', value: 'frozen-foods' },
];

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
      paddingBottom: 60,
      paddingTop: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    headerContent: {
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 40,
      padding: 12,
      alignSelf: 'center',
      marginBottom: 12,
    },
    title: {
      color: colors.primaryForeground,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      color: colors.primaryForeground,
      fontSize: 14,
      marginTop: 2,
      opacity: 0.8,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      marginTop: -40
    },
    contentContainer: {
      padding: 24,
      paddingBottom: 100,
    },
    form: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    inputLabel: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.input,
        borderRadius: 8,
        padding: 12,
        color: colors.text,
        fontSize: 14,
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    addButtonText: {
        color: colors.primaryForeground,
        fontSize: 16,
        fontWeight: '600',
    },
    emptyState: {
        textAlign: 'center',
        color: colors.mutedForeground,
        marginTop: 24,
    },
    itemList: {
        marginTop: 24,
    },
    itemCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    itemText: {
        flex: 1,
    },
    itemName: {
        color: colors.cardForeground,
        fontSize: 16,
        fontWeight: '600',
    },
    itemDetails: {
        color: colors.mutedForeground,
        fontSize: 12,
    },
    deleteButton: {
        padding: 8,
    },
    continueButton: {
        backgroundColor: colors.accent,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    continueButtonText: {
        color: colors.accentForeground,
        fontSize: 16,
        fontWeight: '600',
    }
  });
}

export default function FoodInventoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  const [items, setItems] = useState<FoodItem[]>([]);
  const [foodItem, setFoodItem] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const foodItems = await getFoodItems();
      setItems(foodItems as FoodItem[]);
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (foodItem && category && quantity) {
      const newItem = {
        name: foodItem,
        category,
        quantity,
      };
      const id = await addFoodItem(newItem);
      if (id) {
        setItems([...items, { ...newItem, id }]);
        setFoodItem('');
        setCategory('');
        setQuantity('');
      }
    }
  };

  const handleDeleteItem = async (id: string) => {
    await deleteFoodItem(id);
    setItems(items.filter(item => item.id !== id));
  };

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      ...styles.input,
    },
    inputAndroid: {
      ...styles.input,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={{position: 'absolute', left: 24, top: 40}}>
                    <ChevronLeft size={24} color={colors.primaryForeground} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <View style={styles.iconContainer}>
                        <ClipboardList size={32} color={colors.primaryForeground} />
                    </View>
                    <Text style={styles.title}>{Strings.foodInventory.title}</Text>
                    <Text style={styles.subtitle}>{Strings.foodInventory.subtitle}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.contentContainer}>
                    <View style={styles.form}>
                        <Text style={styles.inputLabel}>{Strings.foodInventory.foodItem}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Chicken breast"
                            value={foodItem}
                            onChangeText={setFoodItem}
                        />

                        <Text style={styles.inputLabel}>{Strings.foodInventory.category}</Text>
                        <RNPickerSelect
                            onValueChange={(value: string) => setCategory(value)}
                            items={categories}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select category', value: null }}
                            value={category}
                        />

                        <Text style={styles.inputLabel}>{Strings.foodInventory.quantity}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., 500g, 2 pieces"
                            value={quantity}
                            onChangeText={setQuantity}
                        />

                        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                            <Plus size={20} color={colors.primaryForeground} />
                            <Text style={styles.addButtonText}>{Strings.foodInventory.addItem}</Text>
                        </TouchableOpacity>
                    </View>

                    {items.length === 0 ? (
                        <Text style={styles.emptyState}>No items added yet. Start adding your food inventory above.</Text>
                    ) : (
                        <View style={styles.itemList}>
                            <Text style={{fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 12,}}>Your Items ({items.length})</Text>
                            {items.map(item => (
                                <View key={item.id} style={styles.itemCard}>
                                    <View style={styles.itemText}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemDetails}>{item.category} • {item.quantity}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                                        <X size={20} color={colors.mutedForeground} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}

                    <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/(tabs)' as any)}>
                        <Text style={styles.continueButtonText}>{Strings.foodInventory.continue}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}
