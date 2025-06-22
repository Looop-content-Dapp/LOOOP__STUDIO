import { Text, View } from 'react-native';

interface AgeGroup {
  range: string;
  percentage: string;
  progress: number;
}

const ageGroups: AgeGroup[] = [
  { range: '13-17', percentage: '18.0%', progress: 18 },
  { range: '18-24', percentage: '72.4%', progress: 72.4 },
  { range: '25-45', percentage: '8.6%', progress: 8.6 },
  { range: '45 & up', percentage: '2.0%', progress: 2 },
];

const ProgressBar = ({ progress }: { progress: number }) => (
  <View className="h-2 w-40 rounded-[10px] bg-[#202227]">
    <View className="h-2 rounded-[10px] bg-[#b9a5c8]" style={{ width: `${progress}%` }} />
  </View>
);

const AgeDistributionCard = () => {
  return (
    <View className="mb-6 h-[300px] w-full rounded-3xl border border-[#202227] bg-[#111318] p-5">
      <Text className="text-[20px] font-PlusJakartaSansMedium leading-[22px] tracking-[-0.6px] text-[#63656b]">
        Age distribution
      </Text>
      <View className="mt-6">
        <Text className="text-[40px] leading-[44px] font-TankerRegular tracking-[-1.6px] text-[#f4f4f4]">22</Text>
        <Text className="text-[14px] leading-[18px] font-PlusJakartaSansMedium tracking-[-0.28px] text-[#63656b]">
          Avg. age of listeners
        </Text>
      </View>
      <View className="mt-6">
        {ageGroups.map((group) => (
          <View key={group.range} className="mb-3 flex-row items-center justify-between">
            <Text className="text-[14px] font-PlusJakartaSansMedium leading-[18px] tracking-[-0.28px] text-[#63656b]">
              {group.range}
            </Text>
            <ProgressBar progress={group.progress} />
            <Text className="text-[14px] leading-[18px] font-PlusJakartaSansBold tracking-[-0.28px] text-[#d2d3d5]">
              {group.percentage}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AgeDistributionCard;
