import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#040405',
        },
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#040405',
        },
      }}
      initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="createTribes" />
    </Stack>
  );
}
