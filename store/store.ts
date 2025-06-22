import { create } from 'zustand';

interface Wallet {
  address: string;
}

interface Wallets {
  xion?: Wallet;
  starknet?: Wallet;
  [key: string]: Wallet | undefined;
}

export interface UserData {
  _id: string;
  wallets?: Wallets;
  [key: string]: any;
}

export interface AuthState {
  userdata: UserData | null;
  setUserData: (data: UserData | null) => void;
}

export const useStore = create<AuthState>((set) => ({
  userdata: null,
  setUserData: (data) => set({ userdata: data }),
}));
