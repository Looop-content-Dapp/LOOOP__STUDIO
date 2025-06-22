import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import api from '../config/apiConfig';

interface SignContractParams {
  fullName: string;
}

export const useSignArtistContract = () => {
  const { userdata } = useAuthStore();

  return useMutation({
    mutationFn: async (contractId: string) => {
      if (!userdata?._id) {
        throw new Error('User not authenticated');
      }
      const { data } = await api.post(`/api/contract/sign/${contractId}`, {
        userId: userdata._id,
      });
      return data;
    },
  });
};
