import { View, Text, Pressable, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ route, navigation }) => {
  const userName = route.params?.userName || 'User';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  const clearAllData = async () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all registered users. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'All data cleared!');
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 px-6">
      <View className="mb-6">
        <Text className="text-6xl">✅</Text>
      </View>

      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
          Welcome!
        </Text>
        <Text className="text-xl text-gray-600 text-center">
          Hello, {userName}
        </Text>
      </View>

      <View className="bg-white rounded-lg p-6 mb-6 w-full">
        <Text className="text-base text-gray-700 text-center">
          You have successfully logged in to the app. 
          This is your home screen.
        </Text>
      </View>

      <View className="w-full">
        <Pressable
          className="bg-blue-600 py-3 rounded-lg mb-3"
          onPress={handleLogout}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Logout
          </Text>
        </Pressable>

        <Pressable
          className="bg-red-600 py-3 rounded-lg"
          onPress={clearAllData}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Clear All Data (Testing)
          </Text>
        </Pressable>
      </View>

      <View className="mt-6">
        <Text className="text-sm text-gray-500 text-center">
          Testing Note: Use "Clear All Data" to reset all users
        </Text>
      </View>
    </View>
  );
};

export default Home;
