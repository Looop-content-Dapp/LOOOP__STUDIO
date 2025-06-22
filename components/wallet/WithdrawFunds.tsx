import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowRight01Icon, ReverseWithdrawal02Icon } from '@hugeicons/core-free-icons';

interface WithdrawFundsProps {
  onPress: () => void;
}

const WithdrawFunds: React.FC<WithdrawFundsProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="mx-4 mb-4 flex-row items-center rounded-xl bg-[#0A0B0F] p-4"
      onPress={onPress}>
      <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-[#FF7A00]">
        <HugeiconsIcon icon={ReverseWithdrawal02Icon} size={24} color="#FFFFFF" />
      </View>
      <View className="flex-1">
        <Text className="font-TankerRegular text-[20px] text-white">Withdraw Funds</Text>
        <Text className="font-PlusJakartaSansMedium text-sm text-[#787A80]">
          Transfer to other wallets and exchanges
        </Text>
      </View>
      <HugeiconsIcon icon={ArrowRight01Icon} size={20} color="#787A80" />
    </TouchableOpacity>
  );
};

export default WithdrawFunds;
