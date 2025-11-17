'use client';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Plus, X, Package, Trash2, Edit3, ChevronDown } from 'lucide-react-native';
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
      backgroundColor: colors.card,
      paddingHorizontal: 24,
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      color: colors.text,
      fontSize: 24,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
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
    inputRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    inputContainer: {
        flex: 1,
    },
    inputLabel: {
        color: colors.mutedForeground,
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 6,
    },
    input: {
        backgroundColor: colors.background,
        borderRadius: 12,
        padding: 12,
        color: colors.text,
        fontSize: 14,
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
        marginTop: 8,
    },
    addButtonText: {
        color: colors.primaryForeground,
        fontSize: 16,
        fontWeight: '600',
    },
    emptyState: {
        textAlign: 'center',
        color: colors.mutedForeground,
        marginTop: 48,
        fontSize: 16,
    },
    itemList: {
        marginTop: 16,
    },
    itemCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        marginBottom: 12,
        overflow: 'hidden',
    },
    itemCardContent: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        marginTop: 4,
    },
    itemActions: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        padding: 8,
    },
    editForm: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        padding: 20,
    }
  });
}

export default function PantryScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [items, setItems] = useState<FoodItem[]>([]);
  const [foodItem, setFoodItem] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [quantity, setQuantity] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const foodItems = await getFoodItems();
      foodItems.sort((a, b) => a.name.localeCompare(b.name));
      setItems(foodItems as FoodItem[]);
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
                setIsFormVisible(false);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add item. Please try again.');
        } finally {
            setIsAdding(false);
        }
    }
  };

  const handleUpdateItem = async () => {
    if (editingItemId && foodItem && category && quantity) {
        setIsAdding(true);
        try {
            const updatedItem = {
                name: foodItem,
                category,
                quantity,
            };
            await updateFoodItem(editingItemId, updatedItem);
            const updatedItems = items.map(item => item.id === editingItemId ? { ...item, ...updatedItem } : item);
            updatedItems.sort((a, b) => a.name.localeCompare(b.name));
            setItems(updatedItems);
            setEditingItemId(null);
            setFoodItem('');
            setCategory(null);
            setQuantity('');
        } catch (error) {
            Alert.alert('Error', 'Failed to update item. Please try again.');
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
                        setItems(items.filter(item => item.id !== id));
                    } catch (error) {
                        Alert.alert('Error', 'Failed to delete item. Please try again.');
                    }
                },
            },
        ],
    );
  };

  const startEditing = (item: FoodItem) => {
    setEditingItemId(item.id);
    setFoodItem(item.name);
    setCategory(item.category);
    setQuantity(item.quantity);
  }

  const cancelEditing = () => {
    setEditingItemId(null);
    setFoodItem('');
    setCategory(null);
    setQuantity('');
  }

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      ...styles.input,
      paddingRight: 40,
    },
    inputAndroid: {
      ...styles.input,
      paddingRight: 40,
    },
    iconContainer: {
      top: 12,
      right: 12,
    },
    placeholder: {
      color: colors.mutedForeground,
    },
  });

  const renderItemCard = (item: FoodItem) => (
    <View key={item.id} style={styles.itemCard}>
        <View style={styles.itemCardContent}>
            <View style={styles.itemText}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>{categoryLabelMap[item.category] || item.category} • {item.quantity}</Text>
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
        {editingItemId === item.id && renderEditForm()}
    </View>
  );

  const renderEditForm = () => (
    <View style={styles.editForm}>
        {renderForm(true)}
    </View>
  );

  const renderForm = (isEdit = false) => (
    <View>
        <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{Strings.foodInventory.foodItem}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Chicken breast"
                    value={foodItem}
                    onChangeText={setFoodItem}
                />
            </View>
        </View>

        <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{Strings.foodInventory.category}</Text>
                <RNPickerSelect
                    onValueChange={(value: string) => setCategory(value)}
                    items={categories}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Select category', value: null }}
                    value={category}
                />
            </View>
            <View style={[styles.inputContainer, {flex: 0.6}]}>
                <Text style={styles.inputLabel}>{Strings.foodInventory.quantity}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., 500g"
                    value={quantity}
                    onChangeText={setQuantity}
                />
            </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={isEdit ? handleUpdateItem : handleAddItem} disabled={isAdding}>
            {isAdding ? (
                <ActivityIndicator color={colors.primaryForeground} />
            ) : (
                <Plus size={20} color={colors.primaryForeground} />
            )}
            <Text style={styles.addButtonText}>{isEdit ? 'Update Item' : Strings.foodInventory.addItem}</Text>
        </TouchableOpacity>
        {isEdit && <TouchableOpacity onPress={cancelEditing}><Text style={{textAlign: 'center', marginTop: 12, color: colors.mutedForeground}}>Cancel</Text></TouchableOpacity>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <Text style={styles.title}>{Strings.foodInventory.title}</Text>
        </View>
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
            {isFormVisible ? (
                <View style={styles.form}>
                    {renderForm()}
                    <TouchableOpacity onPress={() => setIsFormVisible(false)}>
                        <Text style={{textAlign: 'center', marginTop: 12, color: colors.mutedForeground}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.addButton} onPress={() => setIsFormVisible(true)}>
                    <Plus size={20} color={colors.primaryForeground} />
                    <Text style={styles.addButtonText}>Add New Item</Text>
                </TouchableOpacity>
            )}

            {items.length === 0 ? (
                <Text style={styles.emptyState}>Your pantry is empty. Add items to get started!</Text>
            ) : (
                <View style={styles.itemList}>
                    <Text style={{fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 12}}>Your Items ({items.length})</Text>
                    {items.map(renderItemCard)}
                </View>
            )}
        </ScrollView>
    </SafeAreaView>
  );
}
