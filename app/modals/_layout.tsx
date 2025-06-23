import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'card', // or 'modal' if you prefer
      }}
    />
  );
}
