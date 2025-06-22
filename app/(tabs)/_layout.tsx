import {
  HeadphonesIcon,
  Home01Icon,
  PlusSignIcon,
  UserGroup02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Tabs } from 'expo-router';
import { Platform, Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#A187B5',
        tabBarInactiveTintColor: '#787A80',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#040405',
          height: Platform.OS === 'android' ? 70 : 80,
          borderTopWidth: 0.5,
        },
        tabBarIconStyle: { marginTop: Platform.OS === 'android' ? 10 : 8 },
        headerStyle: {
          backgroundColor: '#040405',
          height: 109,
          borderBottomColor: '#1D2029',
        },
        tabBarPosition: 'bottom',
        sceneStyle: {
          backgroundColor: '#040405',
        },
      }}
      initialRouteName="(overview)">
      <Tabs.Screen
        name="(overview)"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color }) => <HugeiconsIcon icon={Home01Icon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(music)"
        options={{
          title: 'Music',
          tabBarIcon: ({ color }) => <HugeiconsIcon icon={HeadphonesIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="uploadMusic"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => <HugeiconsIcon icon={PlusSignIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(tribes)"
        options={{
          title: 'Tribes',
          tabBarIcon: ({ color }) => <HugeiconsIcon icon={UserGroup02Icon} color={color} />,
        }}
      />
       <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/images/rema.jpg')}
              style={{
                width: 24,
                height: 24,
                borderRadius: 50,
                tintColor: focused ? '#A187B5' : '#787A80'
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
