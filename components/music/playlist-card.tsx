import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Playlist } from './types';

interface PlaylistCardProps {
  playlist: Playlist;
}

interface PlaylistInfoRowProps {
  label: string;
  value: string;
}

function PlaylistInfoRow({ label, value }: PlaylistInfoRowProps) {
  return (
    <View className="flex-row items-center">
      <Text className="font-PlusJakartaSansMedium text-[14px] text-[#63656b]">{label}:</Text>
      <Text className="ml-1 font-PlusJakartaSansBold text-[14px] text-white">{value}</Text>
    </View>
  );
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <View className="mb-6 flex-row items-center">
      <Image source={playlist.imageUrl} className="h-36 w-36 rounded-md" />
      <View className="ml-4 flex-1">
        <Text
          className="font-TankerRegular text-[24px] tracking-tight text-white"
          numberOfLines={2}>
          {playlist.title}
        </Text>
        <View className="mt-3 space-y-1">
          <PlaylistInfoRow label="Songs on playlist" value={playlist.songsOnPlaylist.toString()} />
          <PlaylistInfoRow label="Listeners" value={playlist.listeners} />
          <PlaylistInfoRow label="Total streams" value={playlist.totalStreams} />
        </View>
      </View>
    </View>
  );
}

export function PlaylistSection({
  title,
  description,
  playlists,
}: {
  title: string;
  description: string;
  playlists: Playlist[];
}) {
  return (
    <View className="my-4">
      <Text className="font-PlusJakartaSansMedium text-[20px] tracking-tight text-white">
        {title}
      </Text>
      <Text className="mt-1 font-PlusJakartaSansRegular text-[14px] text-[#63656b]">
        {description}
      </Text>
      <View className="mt-6">
        {playlists.map((playlist, index) => (
          <View key={playlist.id}>
            <PlaylistCard playlist={playlist} />
            {index < playlists.length - 1 && <View className="my-4 border-b border-[#202227]" />}
          </View>
        ))}
      </View>
      <TouchableOpacity className="mt-2 flex-row items-end justify-end">
        <Text className="font-PlusJakartaSansMedium text-[16px] text-[#d2d3d5]">See all</Text>
        <Ionicons name="arrow-forward" size={20} color="#d2d3d5" />
      </TouchableOpacity>
    </View>
  );
}
