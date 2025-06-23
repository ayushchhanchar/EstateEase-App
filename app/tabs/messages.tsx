import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function Messages() {
  const chats = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Is this property still available?',
      time: '2h ago',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'Thanks for the info!',
      time: '5h ago',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    {
      id: 3,
      name: 'Michael Williams',
      lastMessage: 'Can we schedule a visit?',
      time: '1d ago',
      avatar: 'https://i.pravatar.cc/150?img=14',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10">
      <Text className="text-2xl font-bold mb-6">Messages</Text>

      {chats.map((chat) => (
        <TouchableOpacity
          key={chat.id}
          className="flex-row items-center mb-4 bg-gray-50 p-3 rounded-xl shadow-sm"
        >
          <Image
            source={{ uri: chat.avatar }}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View className="flex-1">
            <Text className="text-base font-medium">{chat.name}</Text>
            <Text
              className="text-gray-600 text-sm"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {chat.lastMessage}
            </Text>
          </View>
          <Text className="text-gray-400 text-xs ml-2">{chat.time}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
