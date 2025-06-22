import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import { AppBackButton } from '@/components/app-components/back-btn';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
];

const CurrencyPreference = () => {
  const navigation = useNavigation();
  const { mutate } = useUpdateProfile();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name='Currency' onBackPress={() => router.back()} />,
      headerRight: () => null
    });
  });

  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    mutate({
      data: {
        preferences: {
          currency: currencyCode,
          chain: 'xion',
          theme: 'system',
          displayMode: 'comfortable',
          favoriteGenres: [],
          language: 'en',
          notifications: {
            email: false,
            push: false
          }
        }
      }
    });
  };

  return (
    <ScrollView className='px-[24px] pt-[20px]'>
      <Text className='text-[14px] text-[#787A80] font-PlusJakartaSansMedium mb-[24px]'>
        Select your preferred currency for displaying prices and transactions.
      </Text>
      <View className='gap-y-[12px]'>
        {currencies.map((currency) => (
          <TouchableOpacity
            key={currency.code}
            className={`bg-[#0A0B0F] border-2 ${
              selectedCurrency === currency.code ? 'border-[#FF5454]' : 'border-[#12141B]'
            } p-[16px] rounded-[10px]`}
            onPress={() => handleCurrencySelect(currency.code)}
          >
            <View className='flex-row items-center justify-between'>
              <View>
                <Text className='text-[16px] font-PlusJakartaSansMedium text-[#f4f4f4]'>
                  {currency.name}
                </Text>
                <Text className='text-[14px] font-PlusJakartaSansMedium text-[#787A80]'>
                  {currency.symbol} - {currency.code}
                </Text>
              </View>
              {selectedCurrency === currency.code && (
                <View className='w-[24px] h-[24px] rounded-full bg-[#FF5454] items-center justify-center'>
                  <Text className='text-white'>✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CurrencyPreference;
