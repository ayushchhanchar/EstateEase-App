import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import PropertyCard from '../../components/PropertyCard';
import { properties } from '../../constants/dummyData';
import { Ionicons } from '@expo/vector-icons';
import { useFilterStore } from '../../store/useFilterStore';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../store/useUserStore';

export default function Home() {
  const router = useRouter();
  const {image } = useUserStore();

   const {
    type,
    city,
    category,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    facilities,
    setCategory,
  } = useFilterStore();

  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Apartment', 'House', 'Villa', 'Hotel', 'Land'];

  const filteredProperties = properties.filter((item) => {
  const matchesType = type ? item.type?.toLowerCase() === type.toLowerCase() : true;
  const matchesCity = city ? item.city?.toLowerCase().includes(city.toLowerCase()) : true;
  const matchesCategory = category
    ? item.category?.toLowerCase() === category.toLowerCase()
    : true;
  const matchesPrice = Number(item.price) >= minPrice && Number(item.price) <= maxPrice;
  const matchesBedrooms = bedrooms > 0 ? item.bedrooms >= bedrooms : true;
  const matchesBathrooms = bathrooms > 0 ? item.bathrooms >= bathrooms : true;
  const matchesFacilities =
    facilities.length > 0 ? facilities.every((f) => item.facilities?.includes(f)) : true;
  const matchesSearch =
    !searchTerm ||
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.zip && item.zip.toString().includes(searchTerm));

  return (
    matchesType &&
    matchesCity &&
    matchesCategory &&
    matchesPrice &&
    matchesBedrooms &&
    matchesBathrooms &&
    matchesFacilities &&
    matchesSearch
  );
});

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10 pb-20">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View className='flex flex-row items-center'>
          <Image
          source={{ uri: 'https://png.pngtree.com/element_our/png/20181214/real-estate-house-logo-design-template-vector-illustration-png_269520.jpg' }}
          className="w-10 h-16 rounded-full"
          />
          <Text className="text-2xl font-bold">EstateEase</Text>
        </View>
        
        <TouchableOpacity onPress={() => router.push('/tabs/profile')}>
        <Image
          source={{
            uri: image || 'https://i.pravatar.cc/150?img=12',
          }}
          className="w-12 h-12 rounded-full border border-gray-300"
        />
      </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="bg-white rounded-full flex-row items-center px-6 py-4 mb-4 shadow">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
            placeholder="Search address, city, zip..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="ml-2 flex-1 text-sm text-black"
            placeholderTextColor="#999"
        />
        <Link href="/modals/filters">
          <Ionicons name="filter" size={20} color="gray" />
        </Link>
      </View>

      {/* Category Navbar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 -mx-2 px-2">
        {categories.map((cat) => {
          const normalized = cat.toLowerCase();
          const isAll = normalized === 'all';
          const isActive = isAll ? category === '' : category.toLowerCase() === normalized;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(isAll ? '' : normalized)}
              className={`px-4 py-2 rounded-full mr-2 ${
                isActive ? 'bg-lime-400' : 'bg-gray-200'
              }`}
            >
              <Text className={isActive ? 'text-white font-medium capitalize' : 'text-gray-800 capitalize'}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Property List */}
      {filteredProperties.length > 0 ? (
        filteredProperties.map((item) => (
          <PropertyCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            location={item.location}
            category={item.category}
            bedrooms={item.bedrooms}
            bathrooms={item.bathrooms}
          />
        ))
      ) : (
        <Text className="text-center text-gray-400 mt-10">No properties match your search.</Text>
      )}
    </ScrollView>
  );
}
