import { View, Text, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React, { useLayoutEffect } from 'react';
import { router, useNavigation } from 'expo-router';
import { AppBackButton } from '@/components/app-components/back-btn';
import {
  ArrowRight01Icon,
  FaceIdIcon,
  LockKeyIcon,
  Shield02Icon,
} from '@hugeicons/core-free-icons';

const AccountSecurity = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name="Account Security" onBackPress={() => router.back()} />,
      headerRight: () => null,
    });
  }, []);

  const securityOptions = [
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security with Google Authenticator.',
      icon: <HugeiconsIcon icon={Shield02Icon} size={24} color="#787A80" variant="stroke" />,
      route: '/settings/(accountSecurity)/two-factor',
    },
    {
      title: 'App Passcode',
      description: 'Set up a passcode to protect your account.',
      icon: <HugeiconsIcon icon={LockKeyIcon} size={24} color="#787A80" variant="stroke" />,
      route: '/settings/(accountSecurity)/passcode',
    },
    {
      title: 'Face ID',
      description: 'Use Face ID for quick and secure access.',
      icon: <HugeiconsIcon icon={FaceIdIcon} size={24} color="#787A80" variant="stroke" />,
      route: '/settings/(accountSecurity)/face-id',
    },
  ];

  return (
    <View className="gap-y-[36px] px-[24px] pt-[20px]">
      <Text className="font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
        Enhance your account security with additional authentication methods.
      </Text>
      <View className="gap-y-[12px]">
        {securityOptions.map((option, key) => (
          <TouchableOpacity
            key={key}
            className="flex-row items-center justify-between gap-x-[16px] rounded-[10px] border-2 border-[#12141B] bg-[#0A0B0F] p-[16px]"
            onPress={() => router.push(option.route)}>
            <View className="w-[24px]">{option.icon}</View>
            <View className="flex-1">
              <Text className="font-PlusJakartaSansMedium text-[16px] text-[#f4f4f4]">
                {option.title}
              </Text>
              <Text className="font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
                {option.description}
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

export default AccountSecurity;
