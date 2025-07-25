import { View, Text, TextInput } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { router, useNavigation } from 'expo-router';
import { AppBackButton } from '@/components/app-components/back-btn';
import { showToast } from '@/components/ShowMessage';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, type EmailSchema } from './validation';

const Email = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name="Email Address" onBackPress={() => router.back()} />,
      headerRight: () => null,
    });
  }, []);

  const onSubmit = async (data: EmailSchema) => {
    try {
      showToast('Email updated successfully', 'success');
      router.back();
    } catch (error) {
      showToast('Failed to update email', 'error');
    }
  };

  return (
    <View className="px-[24px] pt-[20px] ">
      <View className="mb-[45px]">
        <Text className="font-PlusJakartaSansMedium text-[14px] leading-[18px] -tracking-[0.28px] text-[#63656B]">
          Protect your account with 2FA, manage logged-in devices, and customize security settings
          to keep your data safe.
        </Text>
      </View>
      <View className="gap-y-[16px]">
        <Text className="font-PlusJakartaSansMedium text-[16px] text-[#f4f4f4]">Phone Number</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`rounded-[56px] border border-[#202227] bg-transparent py-[22px] pl-[24px] text-[#f4f4f4] ${errors.email ? 'border border-red-500' : ''}`}
              placeholder="+234 9000 000 0000"
              placeholderTextColor="#787A80"
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.email && (
          <Text className="mt-2 text-[12px] text-red-500">{errors.email.message}</Text>
        )}
      </View>
    </View>
  );
};

export default Email;
