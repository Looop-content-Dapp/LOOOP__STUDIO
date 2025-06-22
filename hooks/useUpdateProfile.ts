import { useAuthStore } from '@/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import api from '../config/apiConfig';

export const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').readonly(),
  email: z.string().email('Invalid email address').readonly(),
  fullname: z.string().optional(),
  age: z.string().optional().readonly(),
  gender: z.enum(['male', 'female']).optional().readonly(),
  bio: z.string().nullable().default(null),
  tel: z.string().nullable().default(null),
  location: z
    .object({
      country: z.string().nullable().default(null),
      state: z.string().nullable().default(null),
      city: z.string().nullable().default(null),
    })
    .default({
      country: null,
      state: null,
      city: null,
    }),
  socialLinks: z
    .object({
      instagram: z.string().nullable().default(null),
      twitter: z.string().nullable().default(null),
      facebook: z.string().nullable().default(null),
      website: z.string().nullable().default(null),
    })
    .default({
      instagram: null,
      twitter: null,
      facebook: null,
      website: null,
    }),
  preferences: z
    .object({
      favoriteGenres: z.array(z.string()).default([]),
      language: z.string().default('en'),
      notifications: z
        .object({
          email: z.boolean().default(false),
          push: z.boolean().default(false),
        })
        .default({
          email: false,
          push: false,
        }),
      currency: z.enum(['USD', 'EUR', 'GBP', 'NGN', 'GHS', 'KES', 'ZAR']).default('USD'),
      chain: z.enum(['XION', 'STARKNET']).default('XION'),
      theme: z.enum(['light', 'dark', 'system']).default('system'),
      displayMode: z.enum(['compact', 'comfortable']).default('comfortable'),
    })
    .default({
      favoriteGenres: [],
      language: 'en',
      notifications: {
        email: false,
        push: false,
      },
      currency: 'USD',
      chain: 'XION',
      theme: 'system',
      displayMode: 'comfortable',
    }),
  profileImage: z.string().nullable().default(null),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

type UpdateProfileInput = {
  fullname?: string;
  username?: string;
  bio?: string;
  dob?: string;
  gender?: string;
  location?: string;
  website?: string;
  profilePicture?: string;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUserData } = useAuthStore();

  return useMutation({
    mutationFn: async (input: UpdateProfileInput) => {
      const { data } = await api.put('/api/user/updateprofile', input);
      return data;
    },
    onSuccess: (data) => {
      setUserData(data.user);
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
