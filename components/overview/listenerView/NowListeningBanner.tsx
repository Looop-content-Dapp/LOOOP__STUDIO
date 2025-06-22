import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

const NowListeningBanner = () => {
  return (
    <View className="mb-6 h-[82px] w-full rounded-[10px] border border-[#202227] bg-[#111318] p-5">
      <View className="flex-row items-start gap-3">
        <Ionicons name="pulse" size={32} color="#a187b5" />
        <View>
          <Text className="text-[20px] font-TankerRegular leading-[28px] tracking-[-0.6px] text-[#a187b5]">
            123,902
          </Text>
          <Text className="text-[14px] font-PlusJakartaSansMedium leading-[18px] tracking-[-0.28px] text-[#63656b]">
            people are listening to your music right now
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NowListeningBanner;
