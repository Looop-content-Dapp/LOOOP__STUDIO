import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { HeadphonesIcon, UserGroupIcon } from '@hugeicons/core-free-icons';

interface EarningsProps {
  timeFrame: string;
  onTimeFrameChange: (timeFrame: string) => void;
}

const Earnings: React.FC<EarningsProps> = ({ timeFrame, onTimeFrameChange }) => {
  const earningsData = [
    {
      title: 'Music streams',
      amount: '$11,382.38',
      icon: <HugeiconsIcon icon={HeadphonesIcon} size={24} color="#FFFFFF" />,
      bgColor: '#FF7A00',
    },
    {
      title: 'Tribe subscriptions',
      amount: '$11,382.38',
      icon: <HugeiconsIcon icon={UserGroupIcon} size={24} color="#FFFFFF" />,
      bgColor: '#8E44AD',
    },
  ];

  return (
    <View className="mt-6 px-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-TankerRegular text-[24px] text-white">Earnings</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="mr-2 text-[#787A80]">{timeFrame}</Text>
          <Text className="text-[#787A80]">▼</Text>
        </TouchableOpacity>
      </View>

      {earningsData.map((item, index) => (
        <View key={index} className="mb-3 flex-row items-center rounded-xl bg-[#0A0B0F] p-4">
          <View
            className={`mr-4 h-12 w-12 items-center justify-center rounded-xl`}
            style={{ backgroundColor: item.bgColor }}>
            {item.icon}
          </View>
          <View className="flex-1">
            <Text className="font-PlusJakartaSansMedium text-sm text-[#787A80]">{item.title}</Text>
            <Text className="font-PlusJakartaSansBold text-lg text-white">{item.amount}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Earnings;
