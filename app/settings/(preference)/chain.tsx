import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import { AppBackButton } from '@/components/app-components/back-btn';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { XIONB, StarknetB } from '@/assets/images/images';

const blockchains = [
  {
    id: 'XION',
    name: 'XION Network',
    description: 'Fast and scalable Layer 2 blockchain',
    image: XIONB
  },
  {
    id: 'STARKNET',
    name: 'Starknet',
    description: 'Ethereum L2 scaling solution',
    image: StarknetB
  }
];

const ChainPreference = () => {
  const navigation = useNavigation();
  const { mutate } = useUpdateProfile();
  const [selectedChain, setSelectedChain] = useState<string>('XION');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name='Blockchain Network' onBackPress={() => router.back()} />,
      headerRight: () => null
    });
  });

  const handleChainSelect = (chainId: string) => {
    try {
      if (!chainId) {
        console.error('Chain ID is undefined');
        return;
      }

      setSelectedChain(chainId);

      const updatedPreferences = {
        chain: chainId,
        currency: 'USD',
        theme: 'system',
        displayMode: 'comfortable',
        favoriteGenres: [],
        language: 'en',
        notifications: {
          email: false,
          push: false
        }
      };

      mutate({
        data: {
          preferences: updatedPreferences
        }
      });
    } catch (error) {
      console.error('Error in handleChainSelect:', error);
    }
  };

  return (
    <ScrollView className='px-[24px] pt-[20px]'>
      <Text className='text-[14px] text-[#787A80] font-PlusJakartaSansMedium mb-[24px]'>
        Select your preferred blockchain network for transactions.
      </Text>
      <View className='gap-y-[12px]'>
        {blockchains.map((chain) => {
          if (!chain?.id) {
            console.error('Invalid chain item:', chain);
            return null;
          }

          return (
            <TouchableOpacity
              key={chain.id}
              className={`bg-[#0A0B0F] border-2 ${
                selectedChain === chain.id ? 'border-[#FF5454]' : 'border-[#12141B]'
              } p-[16px] rounded-[10px]`}
              onPress={() => handleChainSelect(chain.id)}
            >
              <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center gap-x-[12px]'>
                  <Image
                    source={chain.image}
                    className='w-[32px] h-[32px]'
                    resizeMode='contain'
                  />
                  <View>
                    <Text className='text-[16px] font-PlusJakartaSansMedium text-[#f4f4f4]'>
                      {chain.name}
                    </Text>
                    <Text className='text-[14px] font-PlusJakartaSansMedium text-[#787A80]'>
                      {chain.description}
                    </Text>
                  </View>
                </View>
                {selectedChain === chain.id && (
                  <View className='w-[24px] h-[24px] rounded-full bg-[#FF5454] items-center justify-center'>
                    <Text className='text-white'>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ChainPreference;
