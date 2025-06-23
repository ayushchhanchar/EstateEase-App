import { ScrollView, Text, Image, View } from 'react-native';
import PropertyCard from '../../components/PropertyCard';
import { properties } from '../../constants/dummyData';
import { useFilterStore } from '../../store/useFilterStore';

export default function Favorites() {
  const { favorites } = useFilterStore();
  const favProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10">
      {/* Header */}
            <View className="flex-row items-center justify-center mb-4">
              <Image
                source={{ uri: 'https://www.f6s.com/content-resource/media/5389243_d2331c7b2d781e932e70341289023d5c3b760951.jpg' }}
                className="w-36 h-20"
              />
              {/* <Text className="text-2xl font-bold ml-2">EstateEase</Text> */}
        </View>
      <Text className="text-2xl font-bold mb-4">Favorites</Text>
      {favProperties.length > 0 ? (
        favProperties.map((item) => <PropertyCard key={item.id} {...item} />)
      ) : (
        <Text className="text-center text-gray-400 mt-10">No favorites yet.</Text>
      )}
    </ScrollView>
  );
}