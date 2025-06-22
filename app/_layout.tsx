import '../global.css';

import { NotificationProvider } from '@/context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    PlusJakartaSansBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    PlusJakartaSansLight: require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    PlusJakartaSansMedium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    PlusJakartaSansRegular: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    TankerRegular: require('../assets/fonts/Tanker-Regular.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: '#040405',
                },
              }}>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="wallet" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
            </Stack>
          </QueryClientProvider>
        </NotificationProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
