import { usePlayerStore } from '@/store/playerStore';
import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  artwork?: string;
  duration?: number;
}

export const useMusicPlayer = () => {
  const { isPlaying, currentTrack, play, pause, nextTrack, previousTrack, setQueue } =
    usePlayerStore();

  const soundRef = useRef<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    const loadSound = async () => {
      if (currentTrack) {
        setIsLoading(true);
        await soundRef.current?.unloadAsync();
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: currentTrack.url },
            { shouldPlay: isPlaying },
            onPlaybackStatusUpdate
          );
          soundRef.current = sound;
        } catch (error) {
          console.error('Error loading sound:', error);
        }
        setIsLoading(false);
      }
    };
    loadSound();
  }, [currentTrack]);

  useEffect(() => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.playAsync();
      } else {
        soundRef.current.pauseAsync();
      }
    }
  }, [isPlaying]);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      if (status.didJustFinish) {
        nextTrack();
      }
    }
  };

  const seek = async (millis: number) => {
    if (soundRef.current) {
      setIsSeeking(true);
      await soundRef.current.setPositionAsync(millis);
      setIsSeeking(false);
    }
  };

  return {
    isPlaying,
    isLoading,
    currentTrack,
    position,
    duration,
    play,
    pause,
    nextTrack,
    previousTrack,
    seek,
    setQueue,
  };
};
