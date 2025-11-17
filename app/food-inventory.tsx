
'use client';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme, TextInput, Alert, ActivityIndicator } from 'react-native';
import { ChevronLeft, Plus, X, Archive, ChevronDown } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { Strings } from '../constants/Strings';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { addFoodItem, getFoodItems, deleteFoodItem } from '../services/database';

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

const categoryLabelMap = categories.reduce((acc, cat) => {
    acc[cat.value] = cat.label;
    return acc;
}, {} as Record<string, string>);

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
      paddingTop: 60,
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
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 12,
        color: colors.text,
        fontSize: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    pickerContainer: {
        backgroundColor: colors.background,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
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
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
    },
    addButtonText: {
        color: colors.primaryForeground,
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButtonText: {
        color: colors.text,
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
  });
}

export default function FoodInventoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);

  const [items, setItems] = useState<FoodItem[]>([]);
  const [foodItem, setFoodItem] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [quantity, setQuantity] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const foodItems = await getFoodItems();
        foodItems.sort((a, b) => a.name.localeCompare(b.name));
        setItems(foodItems as FoodItem[]);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch items.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (foodItem && category && quantity) {
        setIsAdding(true);
        try {
            const newItem = {
                name: foodItem,
                category,
                quantity,
            };
            const id = await addFoodItem(newItem);
            if (id) {
                const updatedItems = [...items, { ...newItem, id }];
                updatedItems.sort((a, b) => a.name.localeCompare(b.name));
                setItems(updatedItems);
                setFoodItem('');
                setCategory(null);
                setQuantity('');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add item. Please try again.');
        } finally {
            setIsAdding(false);
        }
    }
  };

  const handleDeleteItem = async (id: string) => {
    Alert.alert(
        'Delete Item',
        'Are you sure you want to delete this item?',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteFoodItem(id);
                        setItems(prevItems => prevItems.filter(item => item.id !== id));
                    } catch (error) {
                        Alert.alert('Error', 'Failed to delete item. Please try again.');
                    }
                },
            },
        ],
    );
  };

  const handleCancel = () => {
    setFoodItem('');
    setCategory(null);
    setQuantity('');
  };

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 12,
      paddingHorizontal: 12,
      color: colors.text,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 12,
        paddingVertical: 12,
        color: colors.text,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
      top: 12,
      right: 12,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={{position: 'absolute', left: 24, top: 60}}>
                    <ChevronLeft size={24} color={colors.primaryForeground} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <View style={styles.iconContainer}>
                        <Archive size={32} color={colors.primaryForeground} />
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
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value: string) => setCategory(value)}
                                items={categories}
                                style={pickerSelectStyles}
                                placeholder={{ label: 'Select category', value: null }}
                                value={category}
                                Icon={() => <ChevronDown size={20} color={colors.mutedForeground} />}
                            />
                        </View>

                        <Text style={styles.inputLabel}>{Strings.foodInventory.quantity}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., 500g, 2 pieces"
                            value={quantity}
                            onChangeText={setQuantity}
                        />

                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity style={[styles.addButton, styles.cancelButton, { flex: 1 }]} onPress={handleCancel}>
                                <Text style={[styles.addButtonText, styles.cancelButtonText]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.addButton, { flex: 1 }]} onPress={handleAddItem} disabled={isAdding}>
                                {isAdding ? (
                                    <ActivityIndicator color={colors.primaryForeground} />
                                ) : (
                                    <Plus size={20} color={colors.primaryForeground} />
                                )}
                                <Text style={styles.addButtonText}>{Strings.foodInventory.addItem}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {loading ? (
                        <ActivityIndicator style={{ marginTop: 24 }} />
                    ) : items.length === 0 ? (
                        <Text style={styles.emptyState}>No items added yet. Start adding your food inventory above.</Text>
                    ) : (
                        <View style={styles.itemList}>
                            <Text style={{fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 12,}}>Your Items ({items.length})</Text>
                            {items.map(item => (
                                <View key={item.id} style={styles.itemCard}>
                                    <View style={styles.itemText}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemDetails}>{categoryLabelMap[item.category] || item.category} • {item.quantity}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                                        <X size={20} color={'#ef4444'} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}
