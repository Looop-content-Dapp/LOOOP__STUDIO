import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { router, useNavigation, useLocalSearchParams } from 'expo-router';
import { AppBackButton } from '@/components/app-components/back-btn';
import * as Clipboard from 'expo-clipboard';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@/components/ui/input';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';

const schema = yup.object().shape({
  amount: yup
    .string()
    .required('Amount is required')
    .test('valid-amount', 'Amount must be greater than 0', (val) => Number(val) > 0)
    .test('max-amount', 'Insufficient balance', function (val) {
      const balance = this.parent.maxAmount;
      return Number(val) <= Number(balance);
    }),
  walletAddress: yup
    .string()
    .required('Wallet address is required')
    .min(42, 'Invalid wallet address length')
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address format'),
});

interface FormData extends Record<string, any> {
  amount: string;
  walletAddress: string;
  maxAmount: string;
}

const CryptoWithdrawScreen = () => {
  const navigation = useNavigation();
  const { chain, address } = useLocalSearchParams<{ chain: string; address: string }>();
  const [selectedNetwork, setSelectedNetwork] = useState(chain || 'XION');
  const { data: walletData, isLoading } = useWalletBalance();

  const getAvailableBalance = () => {
    if (!walletData) return '0';
    if (selectedNetwork === 'XION') {
      const usdcBalance = walletData.data.xion.balances.find((b) => b.denom === 'usdc');
      return usdcBalance ? usdcBalance.amountFloat.toString() : '0';
    } else {
      return walletData.data.starknet.balance.balanceFloat.toString();
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: '',
      walletAddress: address || '',
      maxAmount: getAvailableBalance(),
    },
  });

  useEffect(() => {
    setValue('maxAmount', getAvailableBalance());
  }, [walletData, selectedNetwork]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppBackButton name="Send to a new recipient" onBackPress={() => router.back()} />
      ),
    });
  }, [navigation]);

  const handlePaste = async (onChange: (value: string) => void) => {
    const text = await Clipboard.getStringAsync();
    onChange(text);
  };

  const handleMax = () => {
    setValue('amount', getAvailableBalance());
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    router.push({
      pathname: '/wallet/withdraw/confirm' as const,
      params: {
        network: selectedNetwork,
        address: data.walletAddress,
        amount: data.amount,
        crypto: 'USDC',
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D0D0D]">
      <View className="flex-1 px-6">
        <View className="flex-1">
          {/* Header */}
          <View className="mb-8 flex-row items-center justify-between">
            <Text className="font-PlusJakartaSansBold text-[20px] text-white">Transfer USDC</Text>
            <View className="flex-row items-center">
              <Text className="mr-2 text-[14px] text-[#787A80]">Network</Text>
              <TouchableOpacity
                onPress={() => setSelectedNetwork(selectedNetwork === 'XION' ? 'STARKNET' : 'XION')}
                className="flex-row items-center rounded-full bg-[#1A1B1E] px-4 py-2">
                <Image
                  source={
                    selectedNetwork === 'XION'
                      ? require('@/assets/images/XIONB.png')
                      : require('@/assets/images/StarknetB.png')
                  }
                  className="mr-2 h-6 w-6"
                />
                <Text className="font-PlusJakartaSansMedium text-white">
                  {selectedNetwork === 'XION' ? 'XION' : 'Starknet'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Section */}
          <View className="space-y-6">
            {/* Amount Input */}
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text className="mb-3 font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
                    Amount
                  </Text>
                  <View className="rounded-2xl bg-[#1A1B1E] p-6">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-PlusJakartaSansBold text-[36px] text-white">
                        {value || '0'} <Text className="text-[24px]">USDC</Text>
                      </Text>
                      <TouchableOpacity
                        onPress={handleMax}
                        className="rounded-full bg-[#FF6D1B] bg-opacity-20 px-4 py-2">
                        <Text className="font-PlusJakartaSansBold text-[#FF6D1B]">Max</Text>
                      </TouchableOpacity>
                    </View>
                    <Text className="mt-4 font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
                      Available: {getAvailableBalance()} USDC
                    </Text>
                    {errors.amount && (
                      <Text className="mt-2 font-PlusJakartaSansMedium text-sm text-[#FF3B30]">
                        {errors.amount.message}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            />

            {/* Wallet Address Input */}
            <View>
              <Text className="mb-3 font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
                Send to
              </Text>
              <View className="w-full flex-row items-center gap-x-[12px]">
                <View className="flex-1">
                  <Controller
                    control={control}
                    name="walletAddress"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder="Paste or scan address"
                        value={value}
                        onChangeText={onChange}
                        error={errors.walletAddress?.message}
                        placeholderTextColor="#787A80"
                        className="rounded-xl bg-[#1A1B1E] px-4 py-3 text-white"
                        label="Wallet Address"
                      />
                    )}
                  />
                </View>
              </View>
            </View>

            {/**
             *     <TouchableOpacity
                  onPress={() => handlePaste(setValue.bind(null, 'walletAddress'))}
                  className="bg-[#1A1B1E] p-3 rounded-xl"
                >
                  <IrisScanIcon size={24} color="#787A80" />
                </TouchableOpacity>
             */}

            {/* Save Address Option */}
            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <Text className="font-PlusJakartaSansBold text-[14px] text-[#6366F1]">
                Save address
              </Text>
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} color="#6366F1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Button */}
        <View className="py-6">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading || !watch('amount') || !watch('walletAddress')}
            className={`rounded-full p-4 ${
              isLoading || !watch('amount') || !watch('walletAddress')
                ? 'bg-[#2A2A2A]'
                : 'bg-[#FF6D1B]'
            }`}>
            <Text
              className={`text-center font-PlusJakartaSansBold text-[16px] ${
                isLoading || !watch('amount') || !watch('walletAddress')
                  ? 'text-[#787A80]'
                  : 'text-white'
              }`}>
              {isLoading ? 'Loading...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CryptoWithdrawScreen;
