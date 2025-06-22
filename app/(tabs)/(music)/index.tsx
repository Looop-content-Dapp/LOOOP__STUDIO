import { Container } from '@/components/Container';
import {
  algorithmicPlaylists,
  listenerPlaylists,
  releases,
  songs,
} from '@/components/music/mock-data';
import { MusicTabs } from '@/components/music/music-tabs';
import { PlaylistSection } from '@/components/music/playlist-card';
import { ReleaseCard } from '@/components/music/release-card';
import { SearchBar } from '@/components/music/search-bar';
import { SongCard } from '@/components/music/song-card';
import { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

const MusicScreen = () => {
  const [activeTab, setActiveTab] = useState('Releases');

  const renderReleases = () => (
    <FlatList
      data={releases}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReleaseCard release={item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Text className="my-4 font-PlusJakartaSansMedium text-[20px] tracking-tight text-[#d2d3d5]">
          All releases ({releases.length})
        </Text>
      }
    />
  );

  const renderSongs = () => (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SongCard song={item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Text className="my-4 font-PlusJakartaSansMedium text-[20px] tracking-tight text-[#d2d3d5]">
          Songs ({songs.length})
        </Text>
      }
    />
  );

  const renderPlaylists = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PlaylistSection
        title="Algorithmic"
        description="Playlists created by Looop algorithms based on listener preferences and activity"
        playlists={algorithmicPlaylists}
      />
      <PlaylistSection
        title="Listener playlists"
        description="Playlists created by the listeners themselves which contain your music"
        playlists={listenerPlaylists}
      />
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Releases':
        return renderReleases();
      case 'Songs':
        return renderSongs();
      case 'Playlists':
        return renderPlaylists();
      default:
        return null;
    }
  };

  return (
    <Container>
      <View className="mb-2 pt-8">
        <Text className="text-3xl font-medium tracking-tighter text-white">My Music</Text>
      </View>
      <MusicTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab !== 'Playlists' && <SearchBar />}
      {renderContent()}
    </Container>
  );
};

export default MusicScreen;
