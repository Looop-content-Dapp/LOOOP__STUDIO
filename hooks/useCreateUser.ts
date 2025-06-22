import api from '@/config/apiConfig';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';

type User = {
  email: string;
  password: string;
  username: string;
  fullname: string;
  age: string;
  gender: string;
  referralCode?: string;
  oauthprovider?: 'google' | 'apple' | 'xion' | 'argent';
  walletAddress?: string;
  bio: string;
};

export const useCreateUser = () => {
  const setUserData = useAuthStore((state) => state.setUserData);
  const setChannel = useAuthStore((state) => state.setChannel);

  return useMutation({
    mutationFn: async (input: User) => {
      console.log('Attempting to create user', input);
      const { data } = await api.post('/api/user/createuser', input);
      return { data, input };
    },
    onSuccess: ({ data, input }) => {
      setUserData(data.data.user);
      setChannel(input.oauthprovider);
    },
  });
};
