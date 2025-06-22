import api from '@/config/apiConfig';
import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

export const useCheckArtistClaim = () => {
  const { userdata } = useAuthStore();

  return useQuery({
    queryKey: ['artistClaim', userdata?._id],
    queryFn: async () => {
      if (!userdata?._id) return null;
      const { data } = await api.get(`/api/artist/claim/status/${userdata._id}`);
      return data;
    },
    enabled: !!userdata?._id,
  });
};
