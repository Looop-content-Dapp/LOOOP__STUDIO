import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router, useNavigation } from 'expo-router';
import { AppBackButton } from '@/components/app-components/back-btn';
import { MaterialIcons } from '@expo/vector-icons';
import { useClerkAuthentication } from '@/hooks/useClerkAuthentication';
import {
    ArrowRight01Icon,
  Notification02Icon,
  Search01Icon,
  Settings01Icon,
  Shield02Icon,
  UserCircleIcon,
} from '@hugeicons/core-free-icons';

const Index = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { width, height } = useWindowDimensions();

  // Responsive padding calculation based on screen size
  const horizontalPadding = width < 768 ? 24 : 32;
  const itemPadding = width < 768 ? 16 : 24;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name="Settings" onBackPress={() => router.back()} />,
      headerRight: () => null,
    });
  });

  const { handleLogout } = useClerkAuthentication();

  const settingsMenuItems = [
    {
      title: 'Account Info',
      description: 'Update your account details, change your password, or deactivate your account.',
      icon: <HugeiconsIcon icon={UserCircleIcon} size={24} color="#787A80" variant="stroke" />,
      route: '/settings/(account-info)',
    },
    {
      title: 'Account Security',
      description:
        'Protect your account with 2FA, manage logged-in devices, and customize security settings to keep your data safe.',
      icon: <HugeiconsIcon icon={Shield02Icon} size={24} color="#787A80" variant="stroke" />,
      route: '/settings/(accountSecurity)',
    },
    {
      title: 'Notification',
      description:
        'Decide how and when you receive alerts. Customize email, push, and in-app notifications to stay updated.',
      icon: <HugeiconsIcon icon={Notification02Icon} size={24} color="#787A80" variant="stroke" />,
      route: '/settings/(notification)',
    },
    {
      title: 'Languages & Display',
      description:
        'Adjust your preferred language, text size, and display settings to improve usability.',
      icon: <MaterialIcons name="accessibility" size={24} color="#787A80" />,
      route: '/settings/(languages&display)',
    },
    {
      title: 'Preferences',
      description: 'Customize your app experience with personal preferences and default settings.',
      icon: <HugeiconsIcon icon={Settings01Icon} size={24} color="#787A80" variant="stroke" />,
      route: '/settings/(preference)',
    },
  ];

  const filteredSettings = settingsMenuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}>
        <View className="relative">
          <TextInput
            className="mb-[16px] mt-[24px] rounded-[10px] border-2 border-[#12141B] bg-[#0A0B0F] text-[#f4f4f4]"
            style={{
              padding: itemPadding,
              paddingLeft: 40,
              fontSize: width < 768 ? 14 : 16,
            }}
            placeholder="Search settings..."
            placeholderTextColor="#787A80"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={{ position: 'absolute', left: 12, top: height < 668 ? 39 : 36 }}>
            <HugeiconsIcon icon={Search01Icon} size={20} color="#787A80" variant="stroke" />
          </View>
        </View>
        <View className="gap-y-[12px]">
          {filteredSettings.map((menu, key) => (
            <TouchableOpacity
              onPress={() => router.navigate(menu.route)}
              key={key}
              className="flex-row items-center justify-between rounded-[10px] border-2 border-[#12141B] bg-[#0A0B0F]"
              style={{ padding: itemPadding, gap: 16 }}>
              <View className="w-[24px]">{menu.icon}</View>
              <View className="flex-1">
                <Text
                  style={{
                    fontSize: width < 768 ? 16 : 18,
                    fontFamily: 'PlusJakartaSansMedium',
                    color: '#f4f4f4',
                  }}>
                  {menu.title}
                </Text>
                <Text
                  style={{
                    fontSize: width < 768 ? 14 : 16,
                    fontFamily: 'PlusJakartaSansMedium',
                    color: '#787A80',
                  }}>
                  {menu.description}
                </Text>
              </View>
              <View className="w-[24px]">
                <HugeiconsIcon icon={ArrowRight01Icon} size={24} color="#787A80" variant="stroke" />
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="mx-auto items-center justify-center rounded-[10px] bg-[#12141B]"
            style={{
              padding: width < 768 ? 10 : 12,
              marginTop: 12,
            }}
            onPress={handleLogout}>
            <Text
              style={{
                fontSize: width < 768 ? 14 : 16,
                fontFamily: 'PlusJakartaSansMedium',
                color: '#787A80',
              }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
