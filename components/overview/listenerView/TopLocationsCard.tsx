import { Text, View } from 'react-native';

interface LocationStat {
  name: string;
  percentage: string;
}

const locations: LocationStat[] = [
  { name: 'Nigeria', percentage: '84.23%' },
  { name: 'USA', percentage: '10.02%' },
  { name: 'UK', percentage: '5.75%' },
];

const TopLocationsCard = () => {
  return (
    <View className="h-60 w-[48%] rounded-3xl border border-[#202227] bg-[#111318] p-4">
      <View>
        <Text className="font-PlusJakartaSansBold text-[16px] leading-[22px] tracking-[-0.32px] text-[#f4f4f4]">
          Top Locations
        </Text>
        <Text className="mt-1 font-PlusJakartaSansMedium text-[12px] leading-[16px] tracking-[-0.24px] text-[#63656b]">
          Most of your streams came from Nigeria
        </Text>
      </View>

      <View className="mt-9">
        {locations.map((location) => (
          <View key={location.name} className="mb-2 flex-row font items-center gap-2">
            {/* Placeholder for flag */}
            <View className="h-6 w-6 rounded-full bg-gray-500" />
            <Text className="text-[12px] font-PlusJakartaSansMedium leading-[16px] text-[#d2d3d5]">
              {location.name}:
            </Text>
            <Text className="text-[14px] font-PlusJakartaSansBold leading-[18px] text-[#f4f4f4]">
              {location.percentage}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TopLocationsCard;
