import { ImageSourcePropType } from 'react-native';

export interface Release {
  id: string;
  title: string;
  type: 'EP' | 'Single' | 'Album';
  releaseDate: string;
  trackCount: number;
  duration: string;
  totalStreams: string;
  imageUrl: string;
}

export interface Song {
  id: string;
  title: string;
  duration: string;
  releaseDate: string;
  totalStreams: string;
  imageUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  songsOnPlaylist: number;
  listeners: string;
  totalStreams: string;
  imageUrl: ImageSourcePropType | undefined;
}
