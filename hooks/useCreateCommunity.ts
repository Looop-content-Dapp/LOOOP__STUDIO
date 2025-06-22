import api from '@/config/apiConfig';
import { useAuthStore } from '@/store/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Community = {
  communityName: string;
  description: string;
  coverImage: string;
  collectibleName: string;
  collectibleDescription: string;
  collectibleImage: string;
  collectibleType: string;
  artistId: string;
  communitySymbol: string;
};

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();
  const { userdata } = useAuthStore();

  return useMutation({
    mutationFn: async (data: Community) => {
      if (!userdata?.artist) {
        throw new Error('Artist ID not found');
      }

      const formData = new FormData();
      formData.append('communityName', data.communityName);
      formData.append('description', data.description);
      formData.append('communitySymbol', data.communitySymbol);

      if (data.coverImage) {
        formData.append('coverImage', {
          uri: data.coverImage,
          name: 'cover.jpg',
          type: 'image/jpeg',
        } as any);
      }

      formData.append('artistId', userdata.artist);

      const response = await api.post('/api/community', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artistCommunity'] });
    },
  });
};

export type Media = {
  type: string;
  url: string;
  mimeType: string;
  size: number;
  _id: string;
};

export type Artist = {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
};

export type CommunityInfo = {
  _id: string;
  description: string;
  coverImage: string;
  createdAt: string;
};

export type Post = {
  _id: string;
  content: string;
  title: string;
  postType: string;
  type: string;
  media: Media[];
  artistId: Artist;
  communityId: CommunityInfo;
  tags: string[];
  category: string;
  visibility: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  comments: any[];
  likes: any[];
  id: string;
};

type CommunityPostsResponse = {
  message: string;
  data: {
    posts: Post[];
    announcements: Post[];
    events: Post[];
    currentPage: number;
    totalPages: number;
    counts: {
      posts: number;
      announcements: number;
      events: number;
      total: number;
    };
  };
};

export const useGetCommunityPosts = (communityId: string) => {
  const { userdata } = useAuthStore();
  return useQuery({
    queryKey: ['communityPosts', communityId],
    queryFn: async () => {
      const { data } = await api.get<CommunityPostsResponse>(
        `/api/post/community/${communityId}&userId=${userdata?._id}`
      );
      return data;
    },
    enabled: !!communityId,
    // Refresh every 10 seconds
    refetchInterval: 10000,
    // Only refetch when the window is focused
    refetchOnWindowFocus: true,
    // Automatically revalidate when regaining network connection
    refetchOnReconnect: true,
  });
};

type SinglePostResponse = {
  message: string;
  data: Post;
};

export const useGetPost = (postId: string) => {
  const { userdata } = useAuthStore();
  return useQuery({
    queryKey: ['post', postId, userdata?._id],
    queryFn: async () => {
      const { data } = await api.get<SinglePostResponse>(`/api/post/${postId}`, {
        params: {
          userId: userdata?._id,
        },
      });
      return data;
    },
    enabled: !!postId && !!userdata,
  });
};
