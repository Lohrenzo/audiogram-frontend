import Image from "next/image";

// zustand
import { useAudioStore } from "../store/store";

import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

export default function songsQueue() {
  const { queue } = useAudioStore();
  return (
    <div>
      <h3 className="capitalize mb-2">Queue</h3>
      <div className="overflow-y-auto max-h-[53vh] grid grid-cols-1 gap-2 border-t border-slate-800 py-2">
        { queue && queue.length > 0 ?
          queue.map((song, index) => (
            <li
              key={ index }
              className="px-2 overflow-x-hidden flex flex-row justify-between items-center gap-x-3"
            >
              <div className="flex flex-row gap-x-2">
                <Image
                  src={ song.cover }
                  alt="Cover Image"
                  width={ 50 }
                  height={ 50 }
                  className="object-cover object-center rounded-lg w-[50px] h-[50px]"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <div className="w-full font-bold capitalize">
                    { song.title }
                  </div>
                  <div className="text-sm opacity-50">{ song.artist }</div>
                </div>
              </div>

              <div className="grid grid-cols-1 overflow-hidden">
                <IoChevronUpOutline
                  className="hover:scale-125 duration-200 ease-in-out transition-all"
                  size={ 24 }
                />
                <IoChevronDownOutline
                  className="hover:scale-125 duration-200 ease-in-out transition-all"
                  size={ 24 }
                />
              </div>
            </li>
          )) :
          <p>Queue is empty</p>
        }
      </div>
    </div>
  )
}
