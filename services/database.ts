
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getCurrentUser } from './auth';

// USER PROFILE MANAGEMENT

export const createUserProfile = async (uid: string, data: any) => {
  try {
    await setDoc(doc(db, 'users', uid), data);
  } catch (e) {
    console.error('Error creating user profile: ', e);
  }
};

export const getUserProfile = async (uid: string) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (e) {
    console.error('Error getting user profile: ', e);
    return null;
  }
};

export const updateUserProfile = async (uid: string, data: any) => {
  try {
    const docRef = doc(db, 'users', uid);
    await setDoc(docRef, data, { merge: true });
  } catch (e) {
    console.error('Error updating user profile: ', e);
  }
};

// FOOD INVENTORY MANAGEMENT (USER-SPECIFIC)

const getFoodInventoryCollection = () => {
  const user = getCurrentUser();
  if (!user) return null;
  return collection(db, 'users', user.uid, 'foodInventory');
};

export const addFoodItem = async (item: any) => {
  const foodInventoryCollection = getFoodInventoryCollection();
  if (!foodInventoryCollection) return null;

  try {
    const docRef = await addDoc(foodInventoryCollection, item);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    return null;
  }
};

export const getFoodItems = async () => {
  const foodInventoryCollection = getFoodInventoryCollection();
  if (!foodInventoryCollection) return [];

  try {
    const querySnapshot = await getDocs(foodInventoryCollection);
    const items: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (e) {
    console.error('Error getting documents: ', e);
    return [];
  }
};

export const deleteFoodItem = async (id: string) => {
  const foodInventoryCollection = getFoodInventoryCollection();
  if (!foodInventoryCollection) return;

  try {
    await deleteDoc(doc(foodInventoryCollection, id));
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
