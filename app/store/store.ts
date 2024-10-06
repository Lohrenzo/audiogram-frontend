import { create } from "zustand";
import { axiosAuth } from "../lib/axios";

type SidebarStore = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export const useIsSidebarOpenStore = create<SidebarStore>()((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));

type PlaylistStore = {
  createPlaylistPopup: boolean;
  openCreatePlaylistPopup: () => void;
  closeCreatePlaylistPopup: () => void;
  addToPlaylistPopup: boolean;
  audioIdToAddToPlaylist: null | number;
  openAddToPlaylistPopup: (audioId: number) => void;
  closeAddToPlaylistPopup: () => void;
};

export const usePlaylistStore = create<PlaylistStore>()((set) => ({
  createPlaylistPopup: false,
  openCreatePlaylistPopup: () => set({ createPlaylistPopup: true }),
  closeCreatePlaylistPopup: () => set({ createPlaylistPopup: false }),
  addToPlaylistPopup: false,
  audioIdToAddToPlaylist: null,
  openAddToPlaylistPopup: (audioId) =>
    set({ addToPlaylistPopup: true, audioIdToAddToPlaylist: audioId }),
  closeAddToPlaylistPopup: () => set({ addToPlaylistPopup: false }),
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
  playNext: () => void;
  // streamCountSent: boolean;
  // setStreamCountSent: (sent: boolean) => void;
};

export const useAudioStore = create<AudioStore>()((set, get) => ({
  audioRef: null,
  volume: 50,
  setVolume: (volume: number) => {
    const { audioRef } = get();

    set({ volume });
    if (audioRef) {
      audioRef.volume = volume / 100;
    }
  },
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  // streamCountSent: false,
  // setStreamCountSent: (sent: boolean) => set({ streamCountSent: sent }),
  nowPlaying: null,
  setNowPlaying: (nowPlaying: any) => {
    const { audioRef } = get();

    const handleTimeUpdate = () => {
      if (newAudio.currentTime > newAudio.duration / 2 && !streamCountSent) {
        axiosAuth
          .post("rev/stream", { audio: nowPlaying.id })
          .then(() => {
            streamCountSent = true;
          })
          .catch((error) =>
            console.error("Error sending stream count:", error)
          );
      }
    };

    if (audioRef) {
      // Stop current playing song if any
      audioRef.pause();
      audioRef.removeEventListener("ended", get().playNext);
      audioRef.removeEventListener("timeupdate", handleTimeUpdate);
    }

    // Create a new audio element with the selected song
    const newAudio = new Audio(nowPlaying.audioFile);
    newAudio.volume = get().volume / 100;

    let streamCountSent = false;

    newAudio.addEventListener("ended", get().playNext);
    newAudio.addEventListener("timeupdate", handleTimeUpdate);
    // newAudio.addEventListener("ended", () => {
    //   get().playNext();
    // });

    // newAudio.addEventListener("timeupdate", () => {
    //   if (
    //     newAudio.currentTime > newAudio.duration / 2 &&
    //     !get().streamCountSent
    //   ) {
    //     axiosAuth
    //       .post("rev/stream", { audio: nowPlaying.id })
    //       .then(() => setStreamCountSent(true))
    //       .catch((error) =>
    //         console.error("Error sending stream count:", error)
    //       );
    //   }
    // });

    newAudio.play(); // Play the new song

    set({
      nowPlaying,
      audioRef: newAudio,
      isPlaying: true,
    });
  },
  togglePlay: (song: any) => {
    const { audioRef, isPlaying, nowPlaying, enQueue, setNowPlaying } = get();

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
      setNowPlaying(song);
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
    const { queue, nowPlaying, setNowPlaying } = get();

    if (!nowPlaying) {
      set({ nowPlaying: song });
      // setNowPlaying(song);
    } else {
      const isSongInQueue = queue.some((item) => item.id === song.id);

      if (!isSongInQueue) {
        set({ queue: [...queue, song] });
      }
    }
  },
  playNext: () => {
    const { queue, audioRef } = get();
    if (queue.length > 0) {
      const nextSong = queue[0];
      set({ queue: queue.slice(1) });
      get().setNowPlaying(nextSong);
    } else {
      audioRef?.pause();
      set({ nowPlaying: null, isPlaying: false });
    }
  },
}));
