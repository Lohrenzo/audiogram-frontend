import { create } from "zustand";

type SidebarStore = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export const useIsSidebarOpenStore = create<SidebarStore>()((set) => ({
  isSidebarOpen: true,
  setIsSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));

type AudioStore = {
  audioRef: HTMLAudioElement | null; // Store audio element
  volume: number;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  nowPlaying: any;
  setNowPlaying: (nowPlaying: any) => void;
  togglePlay: (song: any) => void;
  togglePause: () => void;
  queue: any[];
  enQueue: (song: any) => void;
};

export const useAudioStore = create<AudioStore>()((set, get) => ({
  audioRef: null,
  volume: 50,
  setVolume: (volume: number) => set({ volume }),
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  nowPlaying: null,
  setNowPlaying: (nowPlaying: any) => {
    const { audioRef, isPlaying } = get();

    if (audioRef) {
      // Stop current playing song if any
      audioRef.pause();
    }

    // Create a new audio element with the selected song
    const newAudio = new Audio(nowPlaying.audioFile);
    newAudio.volume = get().volume / 100;

    newAudio.play(); // Play the new song

    set({ nowPlaying, audioRef: newAudio, isPlaying: true });
  },
  togglePlay: (song: any) => {
    const { audioRef, isPlaying, nowPlaying, enQueue } = get();

    // enqueue the song
    enQueue(song);

    if (nowPlaying?.id === song.id) {
      // If the same song is already playing, toggle between play and pause
      if (isPlaying) {
        audioRef?.pause();
        set({ isPlaying: false });
      } else {
        audioRef?.play();
        set({ isPlaying: true });
      }
    } else {
      // If a different song is selected, set it as the new playing song
      get().setNowPlaying(song);
    }
  },
  togglePause: () => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.pause();
      set({ isPlaying: false });
    }
  },
  queue: [],
  enQueue: (song: any) => {
    const { queue } = get();
    const isSongInQueue = queue.some((item) => item.id === song.id);

    if (!isSongInQueue) {
      set({ queue: [...queue, song] });
    }
  },
}));
