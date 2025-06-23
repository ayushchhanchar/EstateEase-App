import { ScrollView, Text } from 'react-native';
import PropertyCard from '../../components/PropertyCard';
import { properties } from '../../constants/dummyData';
import { useFilterStore } from '../../store/useFilterStore';

export default function Favorites() {
  const { favorites } = useFilterStore();
  const favProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10">
      <Text className="text-2xl font-bold mb-4">Favorites</Text>
      {favProperties.length > 0 ? (
        favProperties.map((item) => <PropertyCard key={item.id} {...item} />)
      ) : (
        <Text className="text-center text-gray-400 mt-10">No favorites yet.</Text>
      )}
    </ScrollView>
  );
}