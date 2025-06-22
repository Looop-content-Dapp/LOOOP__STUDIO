import { Text, TouchableOpacity, View } from 'react-native';

const tabs = ['Releases', 'Songs', 'Playlists'];

interface MusicTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MusicTabs({ activeTab, setActiveTab }: MusicTabsProps) {
  return (
    <View className="my-4 flex-row space-x-2">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          className={`rounded-full px-4 py-3 ${
            activeTab === tab ? 'bg-[#202227]' : 'bg-transparent'
          }`}>
          <Text
            className={`text-base font-medium ${
              activeTab === tab ? 'text-white' : 'text-[#63656b]'
            }`}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
