import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { properties } from '../../constants/dummyData'; // Adjust path if needed

export default function Contact() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const property = properties.find((p) => p.id === Number(id));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const handleSubmit = () => {
    if (!firstName || !lastName || !phone || !email || !message) {
      Alert.alert('Missing Fields', 'Please fill in all the fields.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    Alert.alert('Message Sent', 'Your inquiry has been sent to the agent.');
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  if (!property) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Property not found.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Image */}
        <View className="relative">
          <Image source={{ uri: property.image }} className="w-full h-52" />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-4 bg-white p-1 rounded-full"
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Property Info */}
        <View className="bg-white -mt-6 rounded-t-3xl px-4 pt-6 pb-12">
          <Text className="text-gray-400 text-xs mb-1">📍 {property.location}</Text>
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-lg font-bold">{property.title}</Text>
            <Text className="text-lg font-semibold text-gray-800">${property.price}<Text className="text-sm text-gray-400"> /month</Text></Text>
          </View>
          <Text className="text-sm text-gray-500 mb-6">
            {property.bathrooms} Baths • {property.bedrooms} Beds • {property.sqft || '1200'} sqft
          </Text>

          {/* Form Inputs */}
          <View className="flex-row gap-4 mb-4">
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 bg-white"
            />
            <TextInput
              placeholder="Sec Name"
              value={lastName}
              onChangeText={setLastName}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 bg-white"
              placeholderTextColor="#999"
            />
          </View>

          <TextInput
            placeholder="You Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white mb-4"
          />

          <TextInput
            placeholder="You Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white mb-4"
          />

          <TextInput
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            placeholderTextColor="#999"
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white h-32 mb-6"
          />

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-lime-400 py-4 rounded-full items-center"
          >
            <Text className="text-black font-bold">Send Inquiry</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
