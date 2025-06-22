import { View } from 'react-native';

import NowListeningBanner from './NowListeningBanner';
import StatCard from '../streamsView/StatCard';
import AgeDistributionCard from './AgeDistributionCard';
import GenderDistributionCard from './GenderDistributionCard';
import LocationsDistributionCard from './LocationsDistributionCard';

const ListenersView = () => {
  return (
    <View>
      <NowListeningBanner />
      <View className="flex-row flex-wrap justify-between">
        <StatCard title="Unique Audience" value="1.09M" unit="Listeners" change="+23.58%" />
        <StatCard
          title="New Audience"
          value="120.32K"
          unit="Listeners"
          change="-3.93%"
          changeColor="text-[#ff8d8d]"
        />
      </View>
      <View className="h-6" />
      <AgeDistributionCard />
      <GenderDistributionCard />
      <LocationsDistributionCard />
    </View>
  );
};

export default ListenersView;
