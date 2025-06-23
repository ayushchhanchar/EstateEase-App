import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="absolute left-4 right-4 bottom-4 z-50 rounded-full">
      <BlurView
        intensity={50}
        tint="dark"
        className={`rounded-full flex-row items-center justify-around bg-black/30`}
        style={{ paddingBottom: insets.bottom ? insets.bottom : 12 }}
      >
        {state.routes.map((route, idx) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === idx;
          const color = isFocused ? '#84cc16' : '#ccc';

          const icon =
            route.name === 'home'
              ? <Ionicons name={isFocused ? 'home' : 'home-outline'} size={24} color={color} />
            : route.name === 'favorites'
              ? <Ionicons name={isFocused ? 'heart' : 'heart-outline'} size={24} color={color} />
            : route.name === 'messages'
              ? <Feather name="message-circle" size={24} color={color} />
            : route.name === 'profile'
              ? <Ionicons name={isFocused ? 'person' : 'person-outline'} size={24} color={color} />
            : null;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => {
                if (!isFocused) navigation.navigate(route.name);
              }}
              activeOpacity={0.8}
              className="flex-1 items-center p-2"
            >
              {icon}
              <Text className={`text-xs ${isFocused ? 'text-lime-400 font-medium' : 'text-gray-300'}`}>
                {options.title || route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}
