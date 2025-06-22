import { Text, View } from 'react-native';

interface StreamSource {
  name: string;
  percentage: string;
  streams: string;
  progress: number;
}

const sources: StreamSource[] = [
  {
    name: 'Searches',
    percentage: '43.57%',
    streams: '4,489,232,990 Streams',
    progress: 43.57,
  },
  {
    name: 'Looop editorial playlists',
    percentage: '16.43%',
    streams: '989,657,908 Streams',
    progress: 16.43,
  },
  {
    name: 'Other listener playlists & libraries',
    percentage: '12.15%',
    streams: '989,657,908 Streams',
    progress: 12.15,
  },
  {
    name: "Listener's own playlists",
    percentage: '9.23%',
    streams: '989,657,908 Streams',
    progress: 9.23,
  },
  {
    name: 'Tribes',
    percentage: '7.00%',
    streams: '989,657,908 Streams',
    progress: 7.0,
  },
  {
    name: 'Algorithmic playlists',
    percentage: '6.54%',
    streams: '989,657,908 Streams',
    progress: 6.54,
  },
  {
    name: 'External shares & links',
    percentage: '5.08%',
    streams: '989,657,908 Streams',
    progress: 5.08,
  },
];

const SourceOfStreams = () => {
  return (
    <View className="my-6">
      <Text className="mb-4 font-TankerRegular text-[28px] leading-[30px] tracking-[-0.96px] text-[#f4f4f4]">
        Source of streams
      </Text>
      {sources.map((source) => (
        <View key={source.name} className="mb-6">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-[16px] font-PlusJakartaSansBold leading-[22px] tracking-[-0.32px] text-[#d2d3d5]">
              {source.name}
            </Text>
            <Text className="text-[14px] font-PlusJakartaSansBold leading-[18px] tracking-[-0.28px] text-[#63656b]">
              {source.percentage}
            </Text>
          </View>
          <View className="h-3 w-full rounded-[10px] bg-[#141117]">
            <View
              className="h-3 rounded-[10px] bg-[#a187b5]"
              style={{ width: `${source.progress}%` }}
            />
          </View>
          <Text className="mt-2 text-[16px] font-PlusJakartaSansBold leading-[22px] tracking-[-0.32px] text-[#63656b]">
            {source.streams}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default SourceOfStreams;
