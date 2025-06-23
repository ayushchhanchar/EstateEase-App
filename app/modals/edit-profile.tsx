import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../store/useUserStore';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfile() {
  const router = useRouter();

  const { name: storedName, email: storedEmail, image: storedImage, setUser } = useUserStore();

const [name, setName] = useState(storedName || '');
const [email, setEmail] = useState(storedEmail || '');
const [image, setImage] = useState(storedImage || '');


  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow photo access to change profile picture.');
      return;
    }

    // Open picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
  setUser({ name, email, image });
  router.push('/tabs/profile'); // Navigate back to Profile
};


  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
        <TouchableOpacity onPress={() => router.push('/tabs/profile')} className="p-2 mr-2">
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      <Text className="text-2xl font-bold mb-6 text-center">Edit Profile</Text>

      {/* Profile Picture */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri: image || 'https://i.pravatar.cc/150?img=12',
          }}
          className="w-24 h-24 mb-2 rounded-full border border-gray-300"
        />
        <TouchableOpacity onPress={pickImage} className="bg-lime-500 px-4 py-2 rounded-full">
          <Text className="text-white font-semibold text-sm">Change Picture</Text>
        </TouchableOpacity>
      </View>

      {/* Name and Email */}
      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-1">Name</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-lime-500 mt-8 py-4 rounded-full items-center"
      >
        <Text className="text-white font-semibold">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
