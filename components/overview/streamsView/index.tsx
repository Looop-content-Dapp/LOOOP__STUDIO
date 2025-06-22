import TopLocationsCard from '@/components/overview/listenerView/TopLocationsCard';
import PlaylistStatsCard from '@/components/overview/streamsView/PlaylistStatsCard';
import SourceOfStreams from '@/components/overview/streamsView/SourceOfStreams';
import StatCard from '@/components/overview/streamsView/StatCard';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const StreamsView = () => {
  return (
    <>
      <View className="flex-row flex-wrap justify-between gap-4">
        <StatCard title="Total Streams" value="8.5Bn" unit="Streams" change="+43.85%">
          <View className="absolute left-1/2 top-1/2 h-[238px] w-[238px] -translate-x-1/2 -translate-y-1/2 opacity-10">
            <Ionicons name="pulse" size={200} color="white" />
          </View>
        </StatCard>
        <StatCard
          title="New streams"
          subtitle="From new listeners"
          value="324.4M"
          unit="Streams"
          isTwoLiner
        />
        <TopLocationsCard />
        <PlaylistStatsCard />
      </View>
      <View className="h-4" />
      <SourceOfStreams />
    </>
  );
};

export default StreamsView;
