// import Link from "next/link";
import Image from "next/image";

// zustand
import { useAudioStore } from "../store/store";

import playImage from "../../public/img/icons/play.png";
import pauseImage from "../../public/img/icons/pause.png";
import { SlOptions } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import TransitionLink from "./transitionLink";

type Props = {
  id: number;
  title: string;
  audioFile: any;
  src: string;
  type: string;
  artist: string;
  time: any;
};

export default function ListItem({
  id,
  title,
  audioFile,
  src,
  type,
  artist,
  time,
}: Props) {
  const { isPlaying, togglePause, togglePlay, enQueue, nowPlaying } = useAudioStore();
  const [optionsPop, setOptionsPop] = useState(false);

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

  function secondsToTime(seconds: any) {
    //const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    //const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(1, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const addToQueue = () => {
    enQueue({ id, cover: src, title, artist, audioFile })
    setOptionsPop(false)
  }

  const addToPlaylist = () => {
    setOptionsPop(false)
  }

  return (
    <li key={ id } className="p-2 relative flex flex-row justify-between items-center gap-x-3 hover:scale-[1.02] duration-200 transition-all even:bg-slate-700/10">
      <div className="flex flex-row justify-start items-center gap-x-3 w-[60%]">
        <Image
          src={ src }
          alt="Cover Image"
          width={ 50 }
          height={ 50 }
          className="object-cover object-center rounded-lg w-[50px] h-[50px]"
          loading="lazy"
        />
        <div className="flex flex-col">
          <TransitionLink href={ `/audio/${id}` } className="w-full font-bold capitalize">{ title }</TransitionLink>
          <div className="text-sm opacity-50">{ artist }</div>
        </div>
      </div>
      <div className="">
        <p className="">{ time }</p>
      </div>
      <div
        className="hover:bg-white/5 p-2 rounded-full cursor-pointer"
        onClick={
          isPlaying
            ? () => togglePause()
            : () => togglePlay({ id, cover: src, title, audioFile })
        }
      >
        <Image
          alt={ isCurrentPlaying ? "Pause" : "Play" }
          height={ 30 }
          width={ 30 }
          src={ isCurrentPlaying ? pauseImage : playImage }
          className="play"
          loading="lazy"
        />
      </div>
      <div className="">
        <p className="">{ type }</p>
      </div>
      <div className="cursor-pointer"
        onClick={ () => setOptionsPop(!optionsPop) }
      >
        <SlOptions size={ 20 } />
      </div>
      <audio src={ audioFile } />

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
