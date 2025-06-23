import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../store/useUserStore';

export default function Profile() {
  const { name, email, image, resetUser } = useUserStore();
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10">
      {/* Profile Header */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri: image || 'https://i.pravatar.cc/150?img=12',
          }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-2xl font-bold">{name || 'Your Name'}</Text>
        <Text className="text-gray-500 mt-1">{email || 'your@email.com'}</Text>
      </View>

      {/* Actions */}
      <View className="space-y-4">
        <TouchableOpacity
          onPress={() => router.push('/modals/edit-profile')}
          className="flex-row items-center bg-gray-100 p-4 rounded-xl shadow-sm my-2"
        >
          <Ionicons name="create-outline" size={20} color="gray" />
          <Text className="text-base font-medium ml-3">Edit Profile</Text>
        </TouchableOpacity>

        

        <TouchableOpacity
          className="flex-row items-center bg-gray-100 p-4 rounded-xl shadow-sm my-2"
          onPress={() => router.push('/tabs/favorites')}
        >
          <Ionicons name="heart-outline" size={20} color="gray" />
          <Text className="text-base font-medium ml-3">Your Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-gray-100 p-4 rounded-xl shadow-sm my-2">
          <Ionicons name="home-outline" size={20} color="gray" />
          <Text className="text-base font-medium ml-3">Your Listings</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-gray-100 p-4 rounded-xl shadow-sm my-2">
          <Ionicons name="settings-outline" size={20} color="gray" />
          <Text className="text-base font-medium ml-3">Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={resetUser}
          className="flex-row items-center bg-red-100 p-4 rounded-xl shadow-sm my-2"
        >
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text className="text-base font-medium ml-3 text-red-500">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
