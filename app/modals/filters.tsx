import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useFilterStore } from '../../store/useFilterStore';
import { Ionicons } from '@expo/vector-icons';


export default function Filters() {
  const router = useRouter();

  const {
    type: storeType,
    city: storeCity,
    bedrooms: storeBedrooms,
    bathrooms: storeBathrooms,
    minPrice: storeMin,
    maxPrice: storeMax,
    facilities: storeFacilities,
    setType,
    setCity,
    setBedrooms,
    setBathrooms,
    setMinPrice,
    setMaxPrice,
    toggleFacility,
    resetFilters,
  } = useFilterStore();

  const [type, setTypeLocal] = useState(storeType);
  const [city, setCityLocal] = useState(storeCity);
  const [bedrooms, setBedroomsLocal] = useState(storeBedrooms);
  const [bathrooms, setBathroomsLocal] = useState(storeBathrooms);
  const [minPrice, setMinPriceLocal] = useState(storeMin);
  const [maxPrice, setMaxPriceLocal] = useState(storeMax);
  const [facilitiesLocal, setFacilitiesLocal] = useState<string[]>([...storeFacilities]);

  const facilitiesList = ['Parking', 'Kitchen', 'Free Wifi', 'Garden', 'Gym', 'Pool'];

  useEffect(() => {
    setTypeLocal(storeType);
    setCityLocal(storeCity);
    setBedroomsLocal(storeBedrooms);
    setBathroomsLocal(storeBathrooms);
    setMinPriceLocal(storeMin);
    setMaxPriceLocal(storeMax);
    setFacilitiesLocal([...storeFacilities]);
  }, []);

  const handleFacilityToggle = (facility: string) => {
    setFacilitiesLocal((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  const handleApply = () => {
    setType(type);
    setCity(city);
    setBedrooms(bedrooms);
    setBathrooms(bathrooms);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);

    facilitiesList.forEach((f) => {
      const selected = facilitiesLocal.includes(f);
      const inStore = storeFacilities.includes(f);
      if (selected !== inStore) toggleFacility(f);
    });

    router.push('/tabs')
  };

  const handleClear = () => {
    resetFilters();
    setTypeLocal('');
    setCityLocal('');
    setBedroomsLocal(0);
    setBathroomsLocal(0);
    setMinPriceLocal(250);
    setMaxPriceLocal(10000);
    setFacilitiesLocal([]);
  };

  return (
    <ScrollView className="flex-1 bg-white p-4 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold flex-1 text-center -ml-6">Filters</Text>
        <TouchableOpacity onPress={handleClear}>
          <Text className="text-gray-400 text-sm">Clear All</Text>
        </TouchableOpacity>
      </View>


      {/* Rent / Buy */}
      <View className="flex-row bg-gray-100 rounded-full p-1 mb-6">
        {['rent', 'buy'].map((val) => (
          <TouchableOpacity
            key={val}
            onPress={() => setTypeLocal(val)}
            className={`flex-1 py-2 items-center rounded-full ${type === val ? 'bg-lime-400' : ''}`}
          >
            <Text className={`${type === val ? 'text-white' : 'text-gray-800'} font-medium capitalize`}>
              {val}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* City Input */}
      <Text className="mb-1 text-sm">City</Text>
      <TextInput
        placeholder="Enter city"
        value={city}
        onChangeText={setCityLocal}
        className="border border-gray-300 rounded-xl px-4 py-2 mb-4"
      />

      {/* Bedrooms & Bathrooms */}
      <View className="flex-row gap-4 mb-4">
        <View className="flex-1">
          <Text className="text-sm mb-1">Bedrooms</Text>
          <TextInput
            value={bedrooms.toString()}
            onChangeText={(v) => setBedroomsLocal(Number(v))}
            keyboardType="number-pad"
            className="border border-gray-300 rounded-xl px-4 py-2"
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm mb-1">Bathrooms</Text>
          <TextInput
            value={bathrooms.toString()}
            onChangeText={(v) => setBathroomsLocal(Number(v))}
            keyboardType="number-pad"
            className="border border-gray-300 rounded-xl px-4 py-2"
          />
        </View>
      </View>

      {/* Price Range */}
      <Text className="text-sm mb-1">Price Range ($)</Text>
      <View className="flex-row gap-4 mb-6">
        <TextInput
          placeholder="Min"
          value={minPrice.toString()}
          onChangeText={(v) => setMinPriceLocal(Number(v))}
          keyboardType="number-pad"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2"
        />
        <TextInput
          placeholder="Max"
          value={maxPrice.toString()}
          onChangeText={(v) => setMaxPriceLocal(Number(v))}
          keyboardType="number-pad"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2"
        />
      </View>

      {/* Facilities */}
      <Text className="text-sm mb-2">Facilities</Text>
      <View className="flex-row flex-wrap gap-2 mb-6">
        {facilitiesList.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => handleFacilityToggle(f)}
            className={`px-4 py-2 rounded-full ${facilitiesLocal.includes(f) ? 'bg-lime-400' : 'bg-gray-200'}`}
          >
            <Text className={facilitiesLocal.includes(f) ? 'text-white' : 'text-gray-800'}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Apply Button */}
      <TouchableOpacity
        onPress={handleApply}
        className="bg-lime-400 py-4 rounded-full items-center mb-8"
      >
        <Text className="text-white font-semibold">Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
