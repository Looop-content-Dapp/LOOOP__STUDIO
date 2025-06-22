import { create } from 'zustand';

interface UserData {
  artist: string | null;
  [key: string]: any;
}

interface AuthState {
  userdata: UserData | null;
  channel: 'google' | 'apple' | 'xion' | 'argent' | undefined;
  claimId: string | null;
  setUserData: (user: UserData | null) => void;
  setChannel: (channel: 'google' | 'apple' | 'xion' | 'argent' | undefined) => void;
  setClaimId: (claimId: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userdata: null,
  channel: undefined,
  claimId: null,
  setUserData: (userdata) => set({ userdata }),
  setChannel: (channel) => set({ channel }),
  setClaimId: (claimId) => set({ claimId }),
}));
