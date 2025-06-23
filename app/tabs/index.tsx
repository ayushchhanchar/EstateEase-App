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
      <View className="flex-row items-center justify-center mb-4">
        <Image
          source={{ uri: 'https://www.f6s.com/content-resource/media/5389243_d2331c7b2d781e932e70341289023d5c3b760951.jpg' }}
          className="w-36 h-20 "
        />
        {/* <Text className="text-2xl font-bold ml-2">EstateEase</Text> */}
      </View>


      {/* Search Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 mb-4">
          {/* Search Box */}
          <View className="flex-row items-center bg-white rounded-full px-4 py-3 flex-1 mr-3 shadow-sm">
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

          {/* Profile Avatar */}
          <TouchableOpacity onPress={() => router.push('/tabs/profile')}>
            <Image
              source={{
                uri: image || 'https://i.pravatar.cc/150?img=12',
              }}
              className="w-10 h-10 rounded-full border border-gray-200"
            />
          </TouchableOpacity>
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
