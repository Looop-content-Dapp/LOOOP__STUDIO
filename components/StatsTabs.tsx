import { Text, TouchableOpacity, View } from 'react-native';

interface StatsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs?: string[];
}

const StatsTabs = ({ activeTab, setActiveTab, tabs  = ['Streams', 'Listeners', 'Tribe'] }: StatsTabsProps) => {
  return (
    <View className="relative mb-6 flex-row items-center justify-start gap-2 p-0">
      {tabs?.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          className={`${activeTab === tab ? 'bg-[#202227]' : 'bg-[#040405]'} rounded-3xl`}>
          <View className="items-center justify-center px-4 py-3">
            <Text
              className={`${
                activeTab === tab ? 'text-white' : 'text-[#63656b]'
              } text-[16px] font-medium leading-[22px] tracking-[-0.32px]`}>
              {tab}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StatsTabs;
