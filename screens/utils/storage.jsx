import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@user_data';

export const saveUser = async (userData) => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    const users = existingData ? JSON.parse(existingData) : [];

    const phoneExists = users.some(user => user.phone === userData.phone);
    if (phoneExists) return false;

    users.push(userData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

export const loginUser = async (phone, password) => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    if (!existingData) return null;

    const users = JSON.parse(existingData);
    const user = users.find(u => u.phone === phone && u.password === password);
    return user || null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};
