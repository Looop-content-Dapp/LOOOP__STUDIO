import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

const OverviewHeader = () => {
  return (
    <View className="relative mb-6 w-full flex-row items-start justify-between p-0">
      <View>
        <Text className="text-[28px] font-medium leading-[36px] tracking-[-1.12px] text-white">
          Overview
        </Text>
        <Text className="text-[14px] leading-[18px] tracking-[-0.28px] text-[#63656b]">
          Overall stats
        </Text>
      </View>
      <TouchableOpacity className="rounded-[10px] border-2 border-[#202227] bg-[#040405]">
        <View className="flex-row items-center gap-1 px-3 py-2">
          <Text className="text-[14px] leading-[18px] tracking-[-0.28px] text-[#d2d3d5]">
            Last 30 days
          </Text>
          {/* Placeholder for arrow-down icon */}
          <Ionicons name="chevron-down" size={24} color="#d2d3d5" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OverviewHeader;
