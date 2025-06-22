import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface LocationStat {
  name: string;
  percentage: string;
  progress: number;
}

const locations: LocationStat[] = [
  { name: 'Nigeria', percentage: '18.0%', progress: 18 },
  { name: 'UK', percentage: '72.4%', progress: 72.4 },
  { name: 'USA', percentage: '8.6%', progress: 8.6 },
  { name: 'India', percentage: '2.0%', progress: 2 },
];

const ProgressBar = ({ progress }: { progress: number }) => (
  <View className="h-2 w-40 rounded-[10px] bg-[#202227]">
    <View className="h-2 rounded-[10px] bg-[#b9a5c8]" style={{ width: `${progress}%` }} />
  </View>
);

const LocationsDistributionCard = () => {
  return (
    <View className="mb-6 h-[343px] w-full rounded-3xl border border-[#202227] bg-[#111318] p-5">
      <Text className="font-PlusJakartaSansMedium text-[20px] leading-[22px] tracking-[-0.6px] text-[#63656b]">
        Locations
      </Text>

      <View className="mt-4">
        <Text className="font-PlusJakartaSansMedium text-[14px] leading-[18px] tracking-[-0.28px] text-[#63656b]">
          You&apos;re currently hot in
        </Text>
        <View className="mt-2 flex-row items-center gap-2">
          <View className="h-8 w-8 rounded-full bg-gray-500" />
          <Text className="font-TankerRegular text-[40px] leading-[44px] tracking-[-1.6px] text-[#f4f4f4]">
            Nigeria
          </Text>
        </View>
      </View>

      <View className="mt-6">
        {locations.map((location) => (
          <View key={location.name} className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="h-4 w-4 rounded-full bg-gray-500" />
              <Text className="font-PlusJakartaSansMedium text-[14px] leading-[18px] tracking-[-0.28px] text-[#63656b]">
                {location.name}
              </Text>
            </View>
            <ProgressBar progress={location.progress} />
            <Text className="font-PlusJakartaSansBold text-[14px] leading-[18px] tracking-[-0.28px] text-[#d2d3d5]">
              {location.percentage}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity className="mt-4 flex-row items-center gap-1 self-end">
        <Text className="font-PlusJakartaSansBold text-[16px] leading-[22px] tracking-[-0.32px] text-[#9a9b9f]">
          See all countries
        </Text>
        <Ionicons name="arrow-forward" size={24} color="#9a9b9f" />
      </TouchableOpacity>
    </View>
  );
};

export default LocationsDistributionCard;
