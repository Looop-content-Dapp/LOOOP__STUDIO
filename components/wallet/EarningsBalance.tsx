import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import CurrencySelector from './CurrencySelector';
import { Copy01Icon, ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';

interface WalletBalanceProps {
  balance: string;
  addresses: Array<{
    chain: string;
    address: string;
  }>;
  onCopyAddress: () => void;
  formatBalance: (balance: string, currency: string) => string;
  selectedCurrency: string;
  onCurrencySelect: (currency: string) => void;
  availableCurrencies: Array<{
    value: string;
    icon: string;
    label?: string;
  }>;
  rates: Record<string, any>;
}

const EarningsBalance: React.FC<WalletBalanceProps> = ({
  balance,
  addresses,
  onCopyAddress,
  formatBalance,
  selectedCurrency,
  onCurrencySelect,
  availableCurrencies,
  rates,
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const formattedBalance = formatBalance(balance, selectedCurrency);
  const displayAddress = addresses[0]?.address || '';
  const truncatedAddress =
    displayAddress.length > 20
      ? `${displayAddress.substring(0, 10)}...${displayAddress.substring(displayAddress.length - 10)}`
      : displayAddress;

  return (
    <View className="mx-4 mb-4 rounded-xl bg-[#0A0B0F] p-6">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Text className="mr-2 font-PlusJakartaSansMedium text-base text-[#787A80]">
            Wallet balance
          </Text>
          <CurrencySelector
            availableCurrencies={availableCurrencies}
            selectedCurrency={selectedCurrency}
            onCurrencySelect={onCurrencySelect}
          />
        </View>
        <TouchableOpacity onPress={toggleBalanceVisibility}>
          {isBalanceVisible ? (
            <HugeiconsIcon icon={ViewOffIcon} size={20} color="#787A80" />
          ) : (
            <HugeiconsIcon icon={ViewIcon} size={20} color="#787A80" />
          )}
        </TouchableOpacity>
      </View>

      <Text className="mb-6 font-PlusJakartaSansBold text-3xl text-white">
        {isBalanceVisible ? formattedBalance : '••••••••'}
      </Text>

      <View className="flex-row items-center justify-between rounded-lg bg-[#12141B] p-4">
        <Text className="font-PlusJakartaSansMedium text-sm text-[#787A80]">Wallet address</Text>
        <View className="flex-row items-center">
          <Text className="mr-2 font-PlusJakartaSansMedium text-white">{truncatedAddress}</Text>
          <TouchableOpacity onPress={onCopyAddress}>
            <HugeiconsIcon icon={Copy01Icon} size={18} color="#787A80" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EarningsBalance;
