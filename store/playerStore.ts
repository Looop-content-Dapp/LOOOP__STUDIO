import { Track } from '@/types';
import { create } from 'zustand';

interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  queue: Track[];
  play: (track?: Track) => void;
  pause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setQueue: (tracks: Track[]) => void;
  setCurrentTrack: (track: Track) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentTrack: null,
  queue: [],

  setQueue: (tracks) => set({ queue: tracks, currentTrack: tracks[0] || null }),

  setCurrentTrack: (track) => set({ currentTrack: track }),

  play: (track) => {
    const { currentTrack, queue } = get();
    if (track) {
      const trackExistsInQueue = queue.some((item) => item.id === track.id);
      if (!trackExistsInQueue) {
        set({ queue: [track, ...queue], currentTrack: track, isPlaying: true });
      } else {
        set({ currentTrack: track, isPlaying: true });
      }
    } else if (currentTrack) {
      set({ isPlaying: true });
    }
  },

  pause: () => set({ isPlaying: false }),

  nextTrack: () => {
    const { currentTrack, queue } = get();
    if (currentTrack) {
      const currentIndex = queue.findIndex((item) => item.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % queue.length;
      set({ currentTrack: queue[nextIndex], isPlaying: true });
    }
  },

  previousTrack: () => {
    const { currentTrack, queue } = get();
    if (currentTrack) {
      const currentIndex = queue.findIndex((item) => item.id === currentTrack.id);
      const previousIndex = (currentIndex - 1 + queue.length) % queue.length;
      set({ currentTrack: queue[previousIndex], isPlaying: true });
    }
  },
}));
