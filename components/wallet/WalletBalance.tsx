import { HugeiconsIcon } from '@hugeicons/react-native';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { StarknetB } from '@/assets/images/images';
import { useState } from 'react';
import { ArrowDown01Icon, Copy01Icon } from '@hugeicons/core-free-icons';

type WalletBalanceProps = {
  balances?: {
    starknet: number;
    total: number;
  };
  balance?: string;
  addresses: { chain: string; address: string }[];
  isLoading?: boolean;
  onCopyAddress?: (address: string) => void;
  usdcPrice?: number; // Add usdcPrice prop
};

export default function WalletBalance({
  balances,
  balance,
  addresses = [],
  isLoading = false,
  onCopyAddress,
  usdcPrice = 1, // Default to 1 if not provided
}: WalletBalanceProps) {
  const [selectedTab, setSelectedTab] = useState('All balances');
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');

  const exchangeRate = 1450;

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getDisplayBalance = (amount: number | undefined) => {
    if (amount === undefined) return '$0.00';

    const usdAmount = amount * usdcPrice;

    if (currency === 'NGN') {
      return `₦${formatNumber(usdAmount * exchangeRate)}`;
    }
    return `$${formatNumber(usdAmount)}`;
  };

  const getCurrentBalance = () => {
    if (balance) {
      const numericBalance = parseFloat(balance.replace(/[$,₦]/g, '')) || 0;
      const usdAmount = numericBalance * usdcPrice;

      return currency === 'NGN'
        ? `₦${formatNumber(usdAmount * exchangeRate)}`
        : `$${formatNumber(usdAmount)}`;
    }

    switch (selectedTab) {
      case 'Starknet':
        return getDisplayBalance(balances?.starknet);
      default:
        return getDisplayBalance(balances?.total);
    }
  };

  // Rest of the component remains the same
  return (
    <View className="px-4 py-6">
      {/* Tab and Currency Selector */}
      <View className="mx-auto my-4 flex-row gap-x-2 rounded-[24px] border border-[#202227] py-[4px] pl-[5px] pr-[4px]">
        {['Wallet Balance'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            className={`${
              selectedTab === tab ? 'bg-[#202227] px-[12px] py-[6px]' : ''
            } rounded-full px-4 py-2`}>
            <Text className="font-PlusJakartaSansMedium text-[12px] text-[#D2D3D5]">{tab}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => setCurrency(currency === 'USD' ? 'NGN' : 'USD')}
          className="flex-row items-center rounded-full bg-[#202227] px-3 py-[6px]">
          <Text className="text-[12px] text-[#D2D3D5]">{currency === 'USD' ? 'USD' : 'NGN'}</Text>
          <HugeiconsIcon icon={ArrowDown01Icon} size={18} color="#63656B" variant="solid" />
        </TouchableOpacity>
      </View>

      {/* Balance Display */}
      <View className="mx-auto items-center">
        {isLoading ? (
          <View className="items-center justify-center">
            <ActivityIndicator size="large" color="#FF8A49" />
          </View>
        ) : (
          <Text className="font-TankerRegular text-[44px] text-white">
            {getCurrentBalance()}
          </Text>
        )}
      </View>

      {/* Wallet Addresses */}
      <View className="mt-[32px] gap-y-[10px] rounded-[10px] bg-[#202227] p-[16px]">
        <Text className="font-PlusJakartaSansMedium text-[14px] text-[#63656B]">
          Wallet addresses
        </Text>
        <View className="gap-y-[12px]">
          {addresses
            .filter((addr) => addr.chain === 'Starknet')
            .map((addr, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center justify-between"
                onPress={() => addr.address && onCopyAddress?.(addr.address)}>
                <View className="flex-1 flex-row items-center gap-x-2">
                  <Image source={StarknetB} className="h-5 w-5" />
                  <Text
                    className="flex-1 font-PlusJakartaSansMedium text-[16px] text-[#f4f4f4]"
                    numberOfLines={1}>
                    {addr.address ? `${addr.address.slice(0, 35)}...` : 'No address'}
                  </Text>
                </View>
                <HugeiconsIcon icon={Copy01Icon} size={16} color="#63656B" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
}
