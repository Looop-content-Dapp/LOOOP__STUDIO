import { Text, View } from 'react-native';

interface GenderStat {
  gender: string;
  percentage: string;
  progress: number;
}

const genderStats: GenderStat[] = [
  { gender: 'Male', percentage: '32.7%', progress: 32.7 },
  { gender: 'Female', percentage: '54.3%', progress: 54.3 },
  { gender: 'Non-Binary', percentage: '10.0%', progress: 10 },
];

const GenderProgressBar = ({ progress }: { progress: number }) => (
  <View className="h-2.5 w-48 rounded-[10px] border border-[#202227] bg-transparent">
    <View className="h-full rounded-[10px] bg-[#ff8a49]" style={{ width: `${progress}%` }} />
  </View>
);

const GenderDistributionCard = () => {
  return (
    <View className="mb-6 h-[215px] w-full rounded-3xl border border-[#202227] bg-[#111318] p-5">
      <Text className="text-[20px] font-PlusJakartaSansMedium leading-[22px] tracking-[-0.6px] text-[#63656b]">
        Gender distribution
      </Text>
      <View className="mt-6">
        {genderStats.map((stat) => (
          <View key={stat.gender} className="mb-4 flex-row items-center justify-between">
            <Text className="w-20 text-[14px] font-PlusJakartaSansMedium leading-[18px] tracking-[-0.28px] text-[#63656b]">
              {stat.gender}
            </Text>
            <GenderProgressBar progress={stat.progress} />
            <Text className="text-[14px] font-PlusJakartaSansBold leading-[18px] tracking-[-0.28px] text-[#f4f4f4]">
              {stat.percentage}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default GenderDistributionCard;
