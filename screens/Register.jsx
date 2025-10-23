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
import { saveUser } from '../utils/storage';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (name.trim().length < 3) {
      Alert.alert('Error', 'Name must be at least 3 characters');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (phone.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone,
        password,
      };

      const success = await saveUser(userData);

      if (success) {
        Alert.alert(
          'Success',
          'Registration successful! Please login.',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Login'),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Phone number already registered');
      }
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
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
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 bg-gray-50 py-8">
          
          <View className="mb-6">
            <Text className="text-4xl font-bold text-gray-800 mb-2">
              Create Account
            </Text>
            <Text className="text-base text-gray-600">
              Sign up to get started
            </Text>
          </View>

          <View className="mb-6">
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </Text>
              <TextInput
                className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-base"
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
                autoCapitalize="words"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Email
              </Text>
              <TextInput
                className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-base"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
              />
            </View>

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

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Password
              </Text>
              <TextInput
                className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-base"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter password (min 6 characters)"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </Text>
              <TextInput
                className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-base"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder="Re-enter password"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <Pressable
              className={`py-3 rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text className="text-white text-center text-lg font-semibold">
                {loading ? 'Creating Account...' : 'Register'}
              </Text>
            </Pressable>
          </View>

          <View className="flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text className="text-blue-600 font-semibold">Login</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
