import api from '@/config/apiConfig';
import { useAuthStore } from '@/store/authStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

export type Media = {
  type: string;
  url: string;
  mimeType: string;
  width: number;
  height: number;
  _id: string;
};

export type ArtistId = {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  verified: boolean;
};

export type CommunityId = {
  _id: string;
  description: string;
  coverImage: string;
};

type UserLike = {
  _id: string;
  userId: {
    _id: string;
    email: string;
    username: string;
    profileImage: string | null;
    bio: string | null;
  };
  postId: string;
  itemType: 'post';
  createdAt: string;
  __v: number;
};

export type Post = {
  _id: string;
  content: string;
  title: string;
  postType: string;
  type: string;
  media: Media[];
  artistId: ArtistId;
  communityId: CommunityId;
  tags: string[];
  category: string;
  visibility: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  status: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  comments: any[];
  likes: UserLike[];
  hasLiked: boolean;
};

export type UserFeedResponse = {
  message: string;
  data: {
    posts: Post[];
    currentPage: number;
    totalPages: number;
    totalPosts: number;
  };
};

export const useUserFeed = () => {
  const { userdata } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['userFeed', userdata?._id],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get(`/api/feed?page=${pageParam}&limit=10`);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    enabled: !!userdata?._id,
  });
};

type Artist = {
  _id: string;
  name: string;
  profileImage: string;
  verified: boolean;
  followers: string[];
};

type Track = {
  _id: string;
  title: string;
  duration: number;
  artist: {
    _id: string;
    name: string;
    profileImage: string;
    verified: boolean;
  };
  release: {
    _id: string;
    title: string;
    image: string;
    type: string;
  };
  isFromFollowedArtist: boolean;
};

type UserDashbaordResponse = {
  status: string;
  message: string;
  data: {
    followedArtists: Artist[];
    recentReleases: any[];
    recommendedArtists: Artist[];
    suggestedTracks?: Track[];
  };
};

export const useUserDashboard = () => {
  const { userdata } = useAuthStore();
  const [loading, setIsLoading] = useState(true);

  return useQuery({
    queryKey: ['userDashboard', userdata?._id],
    queryFn: async () => {
      if (!userdata?._id) {
        throw new Error('User ID not found');
      }
      const { data } = await api.get<UserDashbaordResponse>(`/api/user/feed/${userdata._id}`);
      setIsLoading(false);
      return data; // Return just the data, not an object with data and loading
    },
    enabled: !!userdata?._id,
    refetchOnWindowFocus: true,
    gcTime: 60 * 60 * 1000,
    staleTime: 10000,
    refetchIntervalInBackground: false,
  });
};
