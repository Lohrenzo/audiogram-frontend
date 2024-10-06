// import Link from "next/link";
import Image from "next/image";

// zustand
import { useAudioStore, usePlaylistStore } from "../store/store";

import playImage from "../../public/img/icons/play.png";
import pauseImage from "../../public/img/icons/pause.png";
import { SlOptions } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import TransitionLink from "./transitionLink";
import secondsToTime from "../lib/secondsToTime";

type Props = {
  id: number;
  title: string;
  audioFile: any;
  src: string;
  type: string;
  artist: string;
  // time: any;
};

export default function ListItem({
  id,
  title,
  audioFile,
  src,
  type,
  artist,
  // time,
}: Props) {
  const { isPlaying, togglePause, togglePlay, enQueue, nowPlaying } = useAudioStore();
  const { addToPlaylistPopup, openAddToPlaylistPopup } = usePlaylistStore();
  const [optionsPop, setOptionsPop] = useState(false);
  const [duration, setDuration] = useState<string | null>(null); // State to store the audio duration
  const audioRef = useRef<HTMLAudioElement>(null); // Ref to access the audio element


  // Ref for the options div to track clicks outside of it
  const optionsRef = useRef<HTMLDivElement>(null);

  // Determine if the current song is playing
  const isCurrentPlaying = nowPlaying?.id === id && isPlaying;

  // Effect to handle clicks outside the options div
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the options div, hide the options
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setOptionsPop(false);
      }
    };

    // Add the event listener for the entire document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to load the audio metadata and get the duration
  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      // Add event listener to get the duration once the metadata is loaded
      const handleLoadedMetadata = () => {
        const seconds = audioElement.duration;
        setDuration(secondsToTime(seconds)); // Set the formatted duration
      };


      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      // Clean up the event listener on component unmount
      return () => {
        audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  const handlePlay = () => {
    const song = { id, cover: src, title, artist, audioFile };
    if (isPlaying && nowPlaying?.id === id) {
      togglePause();
    } else {
      togglePlay(song);
    }
  };

  const addToQueue = () => {
    enQueue({ id, cover: src, title, artist, audioFile })
    setOptionsPop(false)
  }

  const addToPlaylist = () => {
    openAddToPlaylistPopup(id)
    setOptionsPop(false)
  }

  return (
    <li key={ id } className="p-2 audio-list-item relative gap-x-3 w-full hover:scale-[1.02] duration-200 transition-all even:bg-slate-700/10">
      <div className="flex flex-row justify-start items-center gap-x-3 w-[100%]">
        <Image
          src={ src }
          alt="Cover Image"
          width={ 50 }
          height={ 50 }
          className="object-cover object-center rounded-lg w-[50px] h-[50px]"
          loading="lazy"
        />
        <div className="flex flex-col">
          <TransitionLink href={ `/audio/${id}` } className="w-full sm:text-base text-[0.9rem] font-bold capitalize">{ title }</TransitionLink>
          <div className="text-sm opacity-50">{ artist }</div>
        </div>
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-2 items-center justify-between sm:gap-x-1 gap-x-2">
        <p className="sm:inline-block hidden">
          { duration || "00:00" } {/* Show duration or "00:00" */ }
        </p>
        <div className="flex items-center justify-center">
          <div
            className="hover:bg-white/5 p-2 h-[40px] w-[40px] rounded-full cursor-pointer"
            onClick={ handlePlay
            }
          >
            <Image
              alt={ isCurrentPlaying ? `Pause ${title}` : `Play ${title}` }
              title={ isCurrentPlaying ? `Pause ${title}` : `Play ${title}` }
              height={ 30 }
              width={ 30 }
              src={ isCurrentPlaying ? pauseImage : playImage }
              className="play"
              loading="lazy"
            />
          </div>
        </div>
        <div className="sm:inline-block hidden">
          <p className="">{ type }</p>
        </div>
        <div className="cursor-pointer"
          onClick={ () => setOptionsPop(!optionsPop) }
        >
          <SlOptions size={ 20 } />
        </div>
      </div>
      <audio className="hidden" ref={ audioRef } src={ audioFile } />

      { optionsPop &&
        <>
          <div
            ref={ optionsRef } // Ref to the options div
            className="absolute right-3 top-1 rounded-lg bg-white/15 backdrop-blur px-1 py-2 z-50">
            <p className="px-2 cursor-pointer hover:bg-black/40" onClick={ addToQueue }>Add To Queue</p>
            <p className="px-2 cursor-pointer hover:bg-black/40" onClick={ addToPlaylist }>Add To Playlist</p>
          </div>
        </>
      }
    </li>
  );
}
