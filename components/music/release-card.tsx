import { Image, Text, View } from 'react-native';
import { Release } from './types';

interface ReleaseCardProps {
  release: Release;
}

function Dot() {
  return <View className="mx-2 h-1 w-1 rounded-full bg-gray-500" />;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <View className="mb-4 rounded-3xl border border-[#202227] bg-[#111318] p-4">
      <View className="flex-row items-center">
        <Image source={{ uri: release.imageUrl }} className="h-[84px] w-[84px] rounded-lg" />
        <View className="ml-4 flex-1">
          <Text className="font-PlusJakartaSansBold text-[16px] text-white" numberOfLines={1}>
            {release.title}
          </Text>
          <View className="mt-1 flex-row items-center">
            <Text className="font-PlusJakartaSansBold text-[12px] text-gray-500">
              {release.type}
            </Text>
            <Dot />
            <Text className="font-PlusJakartaSansBold text-[12px] text-gray-500">
              {release.releaseDate}
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-5 flex-row items-end justify-between">
        <View>
          <Text className="font-PlusJakartaSansRegular text-[14px] text-gray-500">
            {release.trackCount} Track{release.trackCount > 1 ? 's' : ''}
          </Text>
          <Text className="font-PlusJakartaSansBold text-[14px] text-gray-500">
            {release.duration}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-PlusJakartaSansRegular text-[14px] text-gray-500">
            Total Streams
          </Text>
          <Text className="font-TankerRegular text-[24px] text-white">
            {release.totalStreams}
          </Text>
        </View>
      </View>
    </View>
  );
}
