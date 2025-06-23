import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { properties } from '../../../constants/dummyData';
import { Ionicons } from '@expo/vector-icons';

export default function PropertyDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const numericId = Number(id);
  const property = properties.find((p) => p.id === numericId);

  if (!id || isNaN(numericId) || !property) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-lg">Property not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1  bg-white">
      {/* Property Image + Back Button */}
      <View className="relative">
        <Image source={{ uri: property.image }} className="w-full h-64" />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-10 left-4 bg-white/80 p-2 rounded-full z-10"
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="px-4 py-4 -mt-6 rounded-t-3xl bg-white">
        {/* Title & Location */}
        <Text className="text-2xl font-bold mb-1">{property.title}</Text>
        <Text className="text-gray-600 text-sm mb-2">{property.location}</Text>

        {/* Price */}
        <Text className="text-xl font-semibold text-lime-600 mb-4">
          ${property.price}{' '}
          <Text className="text-sm text-gray-500">/month</Text>
        </Text>

        {/* Category, Bedrooms, Bathrooms */}
        <View className="flex-row gap-4 mb-4">
          <Text className="text-sm text-gray-600 capitalize">{property.category}</Text>
          <Text className="text-sm text-gray-600">{property.bedrooms} Bed</Text>
          <Text className="text-sm text-gray-600">{property.bathrooms} Bath</Text>
        </View>

        {/* Description */}
        <Text className="text-sm text-gray-700 leading-6 mb-4">
          {property.description ||
            'A beautiful property located in the heart of the city with all the essential amenities nearby. Perfect for families or individuals looking for comfort and convenience.'}
        </Text>

        {/* Facilities */}
        {property.facilities?.length > 0 && (
          <View className="mb-6">
            <Text className="font-semibold mb-2">Facilities</Text>
            <View className="flex-row flex-wrap gap-2">
              {property.facilities.map((f) => (
                <View key={f} className="bg-gray-200 px-3 py-1 rounded-full">
                  <Text className="text-sm text-gray-700">{f}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Agent Info */}
        <View className="mt-6 bg-gray-100 rounded-xl p-4">
          <Text className="font-semibold text-lg mb-2">Agent</Text>
          <View className="flex-row items-center gap-4">
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=10' }}
              className="w-12 h-12 rounded-full"
            />
            <View>
              <Text className="font-semibold">Sarah Williams</Text>
              <Text className="text-gray-500 text-xs">Senior Property Advisor</Text>
            </View>
          </View>
        </View>

        {/* Contact Agent Button */}
        <TouchableOpacity
        onPress={() => router.push(`/modals/contact?id=${property.id}`)}
        className="bg-lime-400 py-4 rounded-full items-center mt-6"
      >
        <Text className="text-white font-semibold">Contact Agent</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
