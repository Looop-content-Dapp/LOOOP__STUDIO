import { AppBackButton } from '@/components/app-components/back-btn';
import FilterButton from '@/components/app-components/FilterButton';
import { useStore } from '@/store/store';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

type ChainType = 'XION' | 'Starknet';

const WithdrawScreen = () => {
  const navigation = useNavigation();
  const [selectedChain, setSelectedChain] = useState<ChainType>('XION');
  const userdata = useStore((state) => state.userdata);

  const chainOptions: ChainType[] = ['XION', 'Starknet'];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name="Withdraw Funds" onBackPress={() => router.back()} />,
    });
  }, [navigation]);

  const handleCryptoWithdraw = () => {
    if (!userdata?.wallets) {
      Alert.alert('Error', 'Wallet information not available');
      return;
    }
    router.push({
      pathname: '/wallet/cryptoWithdraw' as const,
      params: {
        chain: selectedChain,
        address: userdata.wallets[selectedChain.toLowerCase()]?.address || '',
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#040405]">
      <View className="mt-6 px-6">
        <View className="flex-row items-center justify-between px-[16px]">
          <Text className="mb-2 font-PlusJakartaSansBold text-[24px] text-white">
            Withdraw Funds
          </Text>

          <View className="mb-4">
            <FilterButton
              options={chainOptions}
              selectedOption={selectedChain}
              onOptionSelect={(option) => setSelectedChain(option as ChainType)}
            />
          </View>
        </View>

        {/* Send via crypto */}
        <TouchableOpacity
          onPress={handleCryptoWithdraw}
          className="mb-4 flex-row items-center rounded-[10px] bg-[#111318] p-4">
          <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-[#202227]">
            <HugeiconsIcon name="coins-dollar" size={24} color="grey" />
          </View>
          <View className="flex-1">
            <Text className="font-PlusJakartaSansBold text-[16px] text-white">Send via crypto</Text>
            <Text className="font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
              Send crypto through different networks to any wallet
            </Text>
          </View>
          <HugeiconsIcon name="arrow-right-1" size={24} color="#787A80" />
        </TouchableOpacity>

        {/* Send via username */}
        <View className="mb-4">
          <View className="flex-row items-center rounded-[10px] bg-[#111318] p-4 opacity-50">
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-[#202227]">
              <HugeiconsIcon name="user" size={24} color="#FF6D1B" variant="Bold" />
            </View>
            <View className="flex-1">
              <Text className="font-PlusJakartaSansBold text-[16px] text-white">
                Send via username
              </Text>
              <Text className="font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
                Send funds instantly to other users using their username
              </Text>
            </View>
            <View className="items-center">
              <Text className="mb-1 font-PlusJakartaSansBold text-[12px] text-[#FF6D1B]">
                Coming Soon
              </Text>
              <HugeiconsIcon name="arrow-right-1" size={24} color="#787A80" />
            </View>
          </View>
        </View>

        {/* Send to credit card */}
        <View>
          <View className="flex-row items-center rounded-[10px] bg-[#111318] p-4 opacity-50">
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-[#202227]">
              <HugeiconsIcon name="credit-card" size={24} color="#FF6D1B" variant="Bold" />
            </View>
            <View className="flex-1">
              <Text className="font-PlusJakartaSansBold text-[16px] text-white">
                Send to credit card
              </Text>
              <Text className="font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
                Withdraw funds directly to your credit or debit card
              </Text>
            </View>
            <View className="items-center">
              <Text className="mb-1 font-PlusJakartaSansBold text-[12px] text-[#FF6D1B]">
                Coming Soon
              </Text>
              <HugeiconsIcon name="arrow-right-1" size={24} color="#787A80" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawScreen;
