'use client';

import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, 
    TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import {
    Plus, Trash2, Edit3, ChevronDown, Package, Apple, Beef, Carrot, Fish, Milk, Cookie, CookingPot, GlassWater,
    LucideProps
} from 'lucide-react-native';
import Colors from '../../../constants/Colors';
import { Strings } from '../../../constants/Strings';
import { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { addFoodItem, getFoodItems, deleteFoodItem, updateFoodItem } from '../../../services/database';
import { useTheme } from '../../../context/ThemeContext';

interface FoodItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
}

const categories = [
    { label: 'Vegetables', value: 'vegetables', icon: Carrot },
    { label: 'Fruits', value: 'fruits', icon: Apple },
    { label: 'Meat & Poultry', value: 'meat-poultry', icon: Beef },
    { label: 'Seafood', value: 'seafood', icon: Fish },
    { label: 'Dairy', value: 'dairy', icon: Milk },
    { label: 'Grains & Pasta', value: 'grains-pasta', icon: CookingPot },
    { label: 'Canned Goods', value: 'canned-goods', icon: GlassWater },
    { label: 'Spices & Condiments', value: 'spices-condiments', icon: CookingPot },
    { label: 'Snacks', value: 'snacks', icon: Cookie },
    { label: 'Frozen Foods', value: 'frozen-foods', icon: Package },
];

const categoryInfoMap = categories.reduce((acc, cat) => {
    acc[cat.value] = { label: cat.label, icon: cat.icon };
    return acc;
}, {} as Record<string, {label: string, icon: React.FC<LucideProps>}>);

function getStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1 },
    header: {
        backgroundColor: colors.primary,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 32,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
    title: { color: colors.primaryForeground, fontSize: 24, fontWeight: 'bold' },
    content: { flex: 1 },
    contentContainer: { padding: 24, paddingBottom: 100 },
    form: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: colors.border,
    },
    inputRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    inputContainer: { flex: 1 },
    inputLabel: { color: colors.mutedForeground, fontSize: 12, fontWeight: '500', marginBottom: 8 },
    input: {
        backgroundColor: colors.background,
        borderRadius: 12,
        padding: 12,
        color: colors.text,
        fontSize: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 8,
    },
    buttonText: { color: colors.primaryForeground, fontSize: 16, fontWeight: '600' },
    cancelButton: { textAlign: 'center', marginTop: 16, color: colors.mutedForeground, fontWeight: '500' },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 48,
    },
    emptyStateIcon: { marginBottom: 24 },
    emptyStateTitle: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
    emptyStateText: { fontSize: 16, color: colors.mutedForeground, textAlign: 'center' },
    itemList: { marginTop: 16 },
    listTitle: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 16 },
    itemCard: {
        backgroundColor: colors.card,
        borderRadius: 20,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    itemIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    itemTextContainer: { flex: 1 },
    itemName: { color: colors.cardForeground, fontSize: 16, fontWeight: '600' },
    itemDetails: { color: colors.mutedForeground, fontSize: 14, marginTop: 4 },
    itemActions: { flexDirection: 'row', gap: 0 },
    iconButton: { padding: 8, borderRadius: 20 },
  });
}

export default function PantryScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const styles = getStyles(colors);

  const [items, setItems] = useState<FoodItem[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const foodItems = await getFoodItems();
      foodItems.sort((a, b) => a.name.localeCompare(b.name));
      setItems(foodItems as FoodItem[]);
    };
    fetchItems();
  }, []);

  const resetForm = () => {
      setEditingItem(null);
      setName('');
      setCategory(null);
      setQuantity('');
  }

  const handleSubmit = () => {
      if (editingItem) handleUpdateItem();
      else handleAddItem();
  }

  const handleAddItem = async () => {
    if (name && category && quantity) {
        setIsSubmitting(true);
        try {
            const newItem = { name, category, quantity };
            const id = await addFoodItem(newItem);
            if (id) {
                const updatedItems = [...items, { ...newItem, id }];
                updatedItems.sort((a, b) => a.name.localeCompare(b.name));
                setItems(updatedItems);
                resetForm();
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }
  };

  const handleUpdateItem = async () => {
    if (editingItem && name && category && quantity) {
        setIsSubmitting(true);
        try {
            const updatedItem = { name, category, quantity };
            await updateFoodItem(editingItem.id, updatedItem);
            const updatedItems = items.map(item => item.id === editingItem.id ? { ...item, ...updatedItem } : item);
            updatedItems.sort((a, b) => a.name.localeCompare(b.name));
            setItems(updatedItems);
            resetForm();
        } catch (error) {
            Alert.alert('Error', 'Failed to update item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }
  };

  const handleDeleteItem = async (id: string) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: async () => {
            try {
                await deleteFoodItem(id);
                setItems(items.filter(item => item.id !== id));
            } catch (error) {
                Alert.alert('Error', 'Failed to delete item. Please try again.');
            }
        }},
    ]);
  };

  const startEditing = (item: FoodItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setQuantity(item.quantity);
  }

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: { ...styles.input, paddingRight: 40 },
    inputAndroid: { ...styles.input, paddingRight: 40 },
    iconContainer: { top: 12, right: 12 },
    placeholder: { color: colors.mutedForeground },
  });

  const renderForm = () => (
    <View style={styles.form}>
        <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{Strings.foodInventory.foodItem}</Text>
                <TextInput style={styles.input} placeholder="e.g., Chicken breast" value={name} onChangeText={setName} />
            </View>
        </View>

        <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{Strings.foodInventory.category}</Text>
                <RNPickerSelect
                    onValueChange={(value: string) => setCategory(value)}
                    items={categories.map(c => ({label: c.label, value: c.value}))}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Select category', value: null }}
                    value={category}
                    Icon={() => <ChevronDown size={20} color={colors.mutedForeground} />}
                />
            </View>
            <View style={[styles.inputContainer, {flex: 0.6}]}>
                <Text style={styles.inputLabel}>{Strings.foodInventory.quantity}</Text>
                <TextInput style={styles.input} placeholder="e.g., 500g" value={quantity} onChangeText={setQuantity} />
            </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
                <ActivityIndicator color={colors.primaryForeground} />
            ) : (
                <Plus size={20} color={colors.primaryForeground} />
            )}
            <Text style={styles.buttonText}>{editingItem ? 'Update Item' : Strings.foodInventory.addItem}</Text>
        </TouchableOpacity>
        {editingItem && <TouchableOpacity onPress={resetForm}><Text style={styles.cancelButton}>Cancel</Text></TouchableOpacity>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <Package size={24} color={colors.primaryForeground} />
            <Text style={styles.title}>{Strings.foodInventory.title}</Text>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
                {renderForm()}

                {items.length === 0 ? (
                    <View style={styles.emptyStateContainer}>
                        <View style={styles.emptyStateIcon}><Package size={64} color={colors.muted} /></View>
                        <Text style={styles.emptyStateTitle}>Your Pantry is Empty</Text>
                        <Text style={styles.emptyStateText}>Add items using the form above to get started!</Text>
                    </View>
                ) : (
                    <View style={styles.itemList}>
                        <Text style={styles.listTitle}>Your Items ({items.length})</Text>
                        {items.map((item) => {
                            const Icon = categoryInfoMap[item.category]?.icon || Package;
                            return (
                                <View key={item.id} style={styles.itemCard}>
                                    <View style={[styles.itemIcon, { backgroundColor: colors.primary + '20' }]}>
                                        <Icon size={20} color={colors.primary} />
                                    </View>
                                    <View style={styles.itemTextContainer}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemDetails}>{categoryInfoMap[item.category]?.label || item.category} • {item.quantity}</Text>
                                    </View>
                                    <View style={styles.itemActions}>
                                        <TouchableOpacity onPress={() => startEditing(item)} style={styles.iconButton}>
                                            <Edit3 size={20} color={colors.mutedForeground} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.iconButton}>
                                            <Trash2 size={20} color={'#ef4444'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
