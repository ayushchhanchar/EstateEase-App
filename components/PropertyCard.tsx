import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFilterStore } from '../store/useFilterStore';

interface PropertyCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  location: string;
  category?: string;
  bedrooms?: number;
  bathrooms?: number;
  rating?: number;
  area?: string;
}

export default function PropertyCard({
  id,
  image,
  title,
  price,
  location,
  category,
  bedrooms,
  bathrooms,
  rating = 4.5,
  area = '1200 sqft',
}: PropertyCardProps) {
  const { favorites, toggleFavorite } = useFilterStore();
  const isFavorite = favorites.includes(id);

  return (
    <Link href={{ pathname: '/modals/details/[id]', params: { id } }} asChild>
      <TouchableOpacity className="bg-white rounded-2xl p-3 mb-4 shadow">
        {/* Image + Category Badge + Favorite */}
        <View className="relative">
          <Image source={{ uri: image }} className="w-full h-40 rounded-2xl" />

          {/* Category Badge */}
          {category && (
            <View className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full shadow">
              <Text className="text-xs font-medium text-gray-800 capitalize">{category}</Text>
            </View>
          )}

          {/* Favorite Heart */}
          <TouchableOpacity
            onPress={() => toggleFavorite(id)}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>

        {/* Metadata */}
        <View className="flex-row items-center mt-3 mb-1">
          <Text className="text-xs text-gray-500">{bathrooms} Baths</Text>
          <Text className="text-xs text-gray-500 mx-1">•</Text>
          <Text className="text-xs text-gray-500">{bedrooms} Beds</Text>
          <Text className="text-xs text-gray-500 mx-1">•</Text>
          <Text className="text-xs text-gray-500">{area}</Text>
        </View>

        {/* Title */}
        <Text className="text-base font-semibold mb-1">{title}</Text>

        {/* Price + Rating */}
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-black text-lg font-bold">
              ${price}
              <Text className="text-sm text-gray-500"> /month</Text>
            </Text>
            <Text className="text-xs text-gray-500">{location}</Text>
          </View>

          <View className="flex-row items-center">
            <Text className="text-sm text-gray-700 mr-1">{rating}</Text>
            <Ionicons name="star" size={14} color="gold" />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
