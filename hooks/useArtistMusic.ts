import api from "@/config/apiConfig";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

type Release = {
  _id: string;
  title: string;
  type: string;
  artwork: string;
  releaseDate: string;
  totalTracks: number;
};

type Song = {
  _id: string;
  title: string;
  duration: string;
  releaseDate: string;
  artwork: string;
  totalStreams: string;
  release: {
    _id: string;
    title: string;
    type: string;
  };
};

type Playlist = {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  totalTracks: number;
  followerCount: number;
};

type ArtistMusicResponse = {
  success: boolean;
  message: string;
  data: {
    releases: {
      total: number;
      items: Release[];
    };
    songs: {
      total: number;
      items: Song[];
    };
    playlists: {
      total: number;
      items: Playlist[];
    };
  };
};

export const useArtistMusic = (artistId?: string) => {
  const queryClient = useQueryClient();

  // Prefetch next page of data
  const prefetchNextArtistData = async (id: string) => {
    await queryClient.prefetchQuery({
      queryKey: ['artistMusic', id],
      queryFn: async () => {
        const { data } = await api.get(`/api/artists/music/${id}`);
        return data;
      },
    });
  };

  return {
    ...useQuery<ArtistMusicResponse>({
      queryKey: ['artistMusic', artistId],
      queryFn: async () => {
        const { data } = await api.get(`/api/artists/music/${artistId}`);
        return data;
      },
      enabled: !!artistId,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    }),
    prefetchNextArtistData,
  };
};
