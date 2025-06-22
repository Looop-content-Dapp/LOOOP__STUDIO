import { Container } from '@/components/Container';
import ListenersView from '@/components/overview/listenerView';
import OverviewHeader from '@/components/overview/OverviewHeader';
import StatsTabs from '@/components/StatsTabs';
import StreamsView from '@/components/overview/streamsView';
import TribeView from '@/components/overview/tribesView';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const OverviewScreen = () => {
  const [activeTab, setActiveTab] = useState('Streams');

  const renderContent = () => {
    switch (activeTab) {
      case 'Streams':
        return <StreamsView />;
      case 'Listeners':
        return <ListenersView />;
      case 'Tribe':
        return <TribeView />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <OverviewHeader />
          <StatsTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={['Streams', 'Listeners', 'Tribe']} />
          {renderContent()}
        </View>
      </ScrollView>
    </Container>
  );
};

export default OverviewScreen;
