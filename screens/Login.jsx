import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import React, { useState } from 'react';
import { loginUser } from '../utils/storage';

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (phone.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits');
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser(phone, password);

      if (user) {
        Alert.alert('Success', `Welcome ${user.name}!`);
        navigation.replace('Home', { userName: user.name });
      } else {
        Alert.alert(
          'Error',
          'Invalid credentials. Please register first.',
          [
            { text: 'OK' },
            { text: 'Register', onPress: () => navigation.navigate('Register') },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 bg-gray-50">
          
          <View className="mb-8">
            <Text className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </Text>
            <Text className="text-base text-gray-600">
              Login to continue
            </Text>
          </View>

          <View className="mb-6">
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </Text>
              <TextInput
                className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-base"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
                placeholder="Enter 10-digit phone number"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Password
              </Text>
              <TextInput
                className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-base"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter password"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <Pressable
              className={`py-3 rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-white text-center text-lg font-semibold">
                {loading ? 'Logging in...' : 'Login'}
              </Text>
            </Pressable>
          </View>

          <View className="flex-row justify-center">
            <Text className="text-gray-600">Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text className="text-blue-600 font-semibold">Register</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
