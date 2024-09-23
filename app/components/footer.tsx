"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import playIcon from "../../public/img/icons/play.png";

import SongsQueue from "./songsQueue";

export default function Footer() {
  const { data: session } = useSession();
  const pathname = usePathname();
  // const items = Array.from({ length: 15 });

  if (session) {
    if (pathname === "/login" || pathname === "/register") {
      return null;
    } else {
      return (
        <section className="border border-slate-800 border-b-0 rounded-t-lg bg-black h-[15vh] w-full bottom-0 z-50 p-2">
          <SongsQueue />
        </section>
      );
    }
  } else return null;
}




// "use client";
// import { useEffect, useRef } from "react";
// import { useSession } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// // zustand
// import { useAudioStore } from "../store/store";

// // Icons for controls
// import { IoPlay, IoPause, IoShuffle, IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";

// // SongsQueue Component
// import SongsQueue from "./songsQueue";

// export default function Footer() {
//   const { data: session } = useSession();
//   const pathname = usePathname();

//   // Zustand state
//   const {
//     queue,
//     currentSongIndex,
//     isPlaying,
//     playSong,
//     pauseSong,
//     nextSong,
//     previousSong,
//     shuffleQueue,
//     setAudioElement
//   } = useAudioStore();

//   // Ref for the audio element
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   // Update the current audio element in the store
//   useEffect(() => {
//     if (audioRef.current) {
//       setAudioElement(audioRef.current);
//     }
//   }, [setAudioElement]);

//   // Handle song end event to auto-play the next song
//   const handleSongEnd = () => {
//     nextSong();
//   };

//   if (session && queue && queue.length > 0) {
//     // If the current page is login or register, don't show the footer
//     if (pathname === "/login" || pathname === "/register") {
//       return null;
//     } else {
//       const currentSong = queue[currentSongIndex];

//       return (
//         <section className="border border-slate-800 border-b-0 rounded-t-lg bg-black h-[15vh] w-full bottom-0 z-50 p-2">
//           <div className="flex justify-between items-center h-full">
//             {/* Song Info */ }
//             <div className="flex items-center gap-3">
//               { currentSong?.cover && (
//                 <Image
//                   src={ currentSong.cover }
//                   alt={ currentSong.title }
//                   width={ 50 }
//                   height={ 50 }
//                   className="object-cover object-center rounded-lg"
//                 />
//               ) }
//               <div className="flex flex-col">
//                 <span className="font-bold text-white capitalize">{ currentSong?.title }</span>
//                 <span className="text-sm text-slate-400">{ currentSong?.artist }</span>
//               </div>
//             </div>

//             {/* Audio controls */ }
//             <div className="flex items-center gap-4">
//               {/* Previous Button */ }
//               <IoPlaySkipBack
//                 className="text-white cursor-pointer hover:scale-125 transition-transform"
//                 size={ 24 }
//                 onClick={ previousSong }
//               />

//               {/* Play/Pause Button */ }
//               { isPlaying ? (
//                 <IoPause
//                   className="text-white cursor-pointer hover:scale-125 transition-transform"
//                   size={ 32 }
//                   onClick={ pauseSong }
//                 />
//               ) : (
//                 <IoPlay
//                   className="text-white cursor-pointer hover:scale-125 transition-transform"
//                   size={ 32 }
//                   onClick={ playSong }
//                 />
//               ) }

//               {/* Next Button */ }
//               <IoPlaySkipForward
//                 className="text-white cursor-pointer hover:scale-125 transition-transform"
//                 size={ 24 }
//                 onClick={ nextSong }
//               />

//               {/* Shuffle Button */ }
//               <IoShuffle
//                 className="text-white cursor-pointer hover:scale-125 transition-transform"
//                 size={ 24 }
//                 onClick={ shuffleQueue }
//               />
//             </div>
//           </div>

//           {/* Audio element */ }
//           { currentSong?.url && (
//             <audio
//               ref={ audioRef }
//               src={ currentSong.url }
//               onEnded={ handleSongEnd }
//               autoPlay={ isPlaying }
//             />
//           ) }

//           {/* Render Songs Queue */ }
//           <SongsQueue />
//         </section>
//       );
//     }
//   } else {
//     return null; // Don't show the footer if there's no session or the queue is empty
//   }
// }
