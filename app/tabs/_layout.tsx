import { Tabs } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide the default tab bar
      }}
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View
            className={`absolute left-5 right-5 bottom-5 bg-slate-100 rounded-full flex-row justify-around items-center shadow-md px-5 py-3 ${
              Platform.OS === 'android' ? 'elevation-5' : 'shadow-lg'
            }`}
            style={{
              paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
            }}
          >
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;
              const { options } = descriptors[route.key];

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const color = isFocused ? '#84cc16' : '#888';
              const size = 24;

              let icon;
              switch (route.name) {
                case 'index':
                  icon = <Ionicons name={isFocused ? 'home' : 'home-outline'} size={size} color={color} />;
                  break;
                case 'favorites':
                  icon = <Ionicons name={isFocused ? 'heart' : 'heart-outline'} size={size} color={color} />;
                  break;
                case 'messages':
                  icon = <Feather name="message-circle" size={size} color={color} />;
                  break;
                case 'profile':
                  icon = <Ionicons name={isFocused ? 'person' : 'person-outline'} size={size} color={color} />;
                  break;
                default:
                  icon = <Ionicons name="ellipse-outline" size={size} color={color} />;
              }

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  activeOpacity={0.8}
                  className="items-center flex-1"
                >
                  {icon}
                  <Text className={`text-xs mt-1 ${isFocused ? 'text-lime-500 font-medium' : 'text-gray-500'}`}>
                    {options.title || route.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites' }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
