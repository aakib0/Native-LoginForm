import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@user_data';


export const saveUser = async (userData) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const users = existing ? JSON.parse(existing) : [];

    const alreadyExists = users.some(user => user.phone === userData.phone);
    if (alreadyExists) return false;

  
    users.push(userData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return true;
  } catch (err) {
    console.error('Error saving user:', err);
    return false;
  }
};


export const loginUser = async (phone, password) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    if (!existing) return null;

    const users = JSON.parse(existing);
    const user = users.find(u => u.phone === phone && u.password === password);
    return user || null;
  } catch (err) {
    console.error('Error logging in:', err);
    return null;
  }
};


export const getAllUsers = async () => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.error('Error fetching users:', err);
    return [];
  }
};
