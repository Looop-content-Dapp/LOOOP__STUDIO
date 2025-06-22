import { Image, Text, View } from 'react-native';
import { Song } from './types';

interface SongCardProps {
  song: Song;
}

function Dot() {
  return <View className="mx-2 h-1 w-1 rounded-full bg-gray-500" />;
}

export function SongCard({ song }: SongCardProps) {
  return (
    <View className="mb-4 rounded-3xl border border-[#202227] bg-[#111318] p-[24px]">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image source={{ uri: song.imageUrl }} className="h-12 w-12 rounded-md" />
          <View className="ml-3">
            <Text className="font-PlusJakartaSansBold text-[16px] text-white" numberOfLines={1}>
              {song.title}
            </Text>
            <View className="mt-1 flex-row items-center">
              <Text className="font-PlusJakartaSansRegular text-[12px] text-gray-500">
                {song.duration}
              </Text>
              <Dot />
              <Text className="font-PlusJakartaSansRegular text-[12px] text-gray-500">
                {song.releaseDate}
              </Text>
            </View>
          </View>
        </View>
        <View className="items-end">
          <Text className="font-PlusJakartaSansBold text-[12px] text-gray-500">
            Total Streams
          </Text>
          <Text className="font-TankerRegular text-[20px] text-white">
            {song.totalStreams}
          </Text>
        </View>
      </View>
    </View>
  );
}
