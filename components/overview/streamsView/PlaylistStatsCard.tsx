import { Text, View } from 'react-native';

const PlaylistStatsCard = () => {
  return (
    <View className="h-60 w-[48%] justify-between rounded-3xl border border-[#202227] bg-[#111318] p-4">
      <View>
        <Text className="text-[16px] font-semibold leading-[22px] tracking-[-0.32px] text-[#f4f4f4]">
          Playlist stats
        </Text>
      </View>

      <View>
        <Text className="text-[14px] leading-[18px] tracking-[-0.28px] text-[#63656b]">
          You appeared on
        </Text>
        <Text className="text-[28px] font-bold leading-[38px] font-TankerRegular tracking-[-1.12px] text-[#f4f4f4]">
          349
        </Text>
        <Text className="text-[12px] leading-[16px] tracking-[-0.24px] text-[#63656b]">
          Playlists
        </Text>
      </View>

      <View>
        <View className="flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full bg-[#ff7a1b]" />
          <Text className="text-xs text-white font-PlusJakartaSansBold text-[14px]">
            <Text className="font-PlusJakartaSansBold text-[14px]">223</Text> User Playlists
          </Text>
        </View>
        <View className="mt-1 flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full bg-[#a187b5]" />
          <Text className="text-xs text-white font-PlusJakartaSansBold text-[14px]">
            <Text className="font-PlusJakartaSansBold text-[14px]">126</Text> Editorial Playlists
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PlaylistStatsCard;
