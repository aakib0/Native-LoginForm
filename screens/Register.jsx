import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { saveUser } from '../utils/storage';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
 
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (phone.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return;
    }

    setLoading(true);

    try {
      const user = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone,
        password,
      };

      const saved = await saveUser(user);

      if (saved) {
        Alert.alert('Success', 'Account created successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login'),
          },
        ]);
      } else {
        Alert.alert('Error', 'Phone number already registered.');
      }
    } catch (err) {
      console.log('Register error:', err);
      Alert.alert('Error', 'Something went wrong.');
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
        <View className="flex-1 justify-center px-6 bg-gray-50 py-8">
          <Text className="text-4xl font-bold text-gray-800 mb-2">
            Create Account
          </Text>
          <Text className="text-base text-gray-600 mb-6">
            Fill in your details to sign up
          </Text>

          <TextInput
            className="bg-white px-4 py-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            className="bg-white px-4 py-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            className="bg-white px-4 py-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            className="bg-white px-4 py-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            className="bg-white px-4 py-3 rounded-lg border border-gray-300 mb-6"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Pressable
            className={`py-3 rounded-lg ${
              loading ? 'bg-blue-400' : 'bg-blue-600'
            }`}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {loading ? 'Registering...' : 'Register'}
            </Text>
          </Pressable>

          <View className="flex-row justify-center mt-4">
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
