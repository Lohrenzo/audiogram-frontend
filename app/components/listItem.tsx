// import Link from "next/link";
import Image from "next/image";

// zustand
import { useAudioStore } from "../store/store";

import playImage from "../../public/img/icons/play.png";
import pauseImage from "../../public/img/icons/pause.png";
import { SlOptions } from "react-icons/sl";
import { useState } from "react";

type Props = {
  id: number;
  title: string;
  audioFile: any;
  src: string;
  type: string;
  artist: string;
  time: any;
};

export default function listItem({
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

  // Determine if the current song is playing
  const isCurrentPlaying = nowPlaying?.id === id && isPlaying;

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
    <li key={ id } className="relative flex flex-row justify-between items-center gap-x-3 hover:scale-[1.02] duration-200 transition-all">
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
          <div className="w-full font-bold capitalize">{ title }</div>
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
          <div className="absolute right-[2.4rem] top-[-1rem] rounded-lg bg-white/15 backdrop-blur px-1 py-2">
            <p className="p-2 cursor-pointer hover:bg-black/40" onClick={ addToQueue }>Add To Queue</p>
            <p className="p-2 cursor-pointer hover:bg-black/40" onClick={ addToPlaylist }>Add To Playlist</p>
          </div>
        </>
      }
    </li>
  );
}
