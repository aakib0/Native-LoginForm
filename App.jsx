import { View, Text, Pressable } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-3xl font-bold text-blue-600 mb-4">
        Hello Tailwind 
      </Text>
      <Pressable className="bg-blue-500 px-4 py-2 rounded-lg">
        <Text className="text-white text-lg">Click Me</Text>
      </Pressable>
    </View>
  );
}
