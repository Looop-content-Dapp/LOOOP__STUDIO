import { AppBackButton } from '@/components/app-components/back-btn';
import { ArrowRight01Icon, Money02Icon, Wallet02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const Preference = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name="Preference" onBackPress={() => router.back()} />,
      headerRight: () => null,
    });
  });

  const settingsMenuItems = [
    {
      title: 'Currency Preferences',
      description: 'Choose your preferred currency for transactions and displays.',
      icon: <HugeiconsIcon icon={Money02Icon} size={24} color="#787A80" variant="stroke" />,
      route: '/settings/(preference)/currency',
    },
    {
      title: 'Blockchain Network',
      description: 'Select your preferred blockchain network.',
      icon: <HugeiconsIcon icon={Wallet02Icon} size={24} color="#787A80" variant="stroke" />,
      route: '/settings/(preference)/chain',
    },
  ];

  return (
    <View className="gap-y-[36px] px-[24px] pt-[20px]">
      <Text className="font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
        Customize your app experience, manage preferences, and secure your account.
      </Text>
      <View className="gap-y-[12px]">
        {settingsMenuItems.map((menu, key) => (
          <TouchableOpacity
            key={key}
            className="flex-row items-center justify-between gap-x-[16px] border-2 border-[#12141B] bg-[#0A0B0F] p-[16px]"
            onPress={() => router.push(menu.route)}>
            <View className="w-[24px]">{menu.icon}</View>
            <View className="flex-1">
              <Text className="font-PlusJakartaSansMedium text-[16px] text-[#f4f4f4]">
                {menu.title}
              </Text>
              <Text className="font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
                {menu.description}
              </Text>
            </View>
            <View className="w-[24px]">
              <HugeiconsIcon icon={ArrowRight01Icon} size={24} color="#787A80" variant="stroke" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Preference;
