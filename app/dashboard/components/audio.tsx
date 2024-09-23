import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SlOptions } from "react-icons/sl";
import humanizeDate from "@/app/lib/humanizeDate";

type Props = {
    audio: Song;
}
export default function Audio({ audio }: Props) {
    const [showOptions, setShowOptions] = useState(false);

    // Ref for the options div to track clicks outside of it
    const optionsRef = useRef<HTMLDivElement>(null);

    // Effect to handle clicks outside the options div
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If the click is outside the options div, hide the options
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        };

        // Add the event listener for the entire document
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Clean up the event listener on component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <li
            className="relative overflow-hidden grid grid-cols-4 items-center place-items-start w-full gap-1 hover:scale-[0.98] duration-200 transition-all"
        >
            <Link href={ `/audio/${audio.id}` } className="col-span-2 flex gap-x-3 flex-nowrap flex-row items-center justify-start w-full">
                <Image
                    src={ audio.cover || "https://placehold.co/400" }
                    className=" object-cover object-center rounded-md size-[50px]"
                    alt={ `${audio.title} cover` }
                    width={ 50 }
                    height={ 50 }
                />
                <p className="text-sm">{ audio.title }</p>
            </Link>
            <p className="text-xs">
                { humanizeDate(audio.released) }
            </p>
            <div className="flex w-full items-center justify-center gap-x-3 text-sm">
                <SlOptions className="cursor-pointer" size={ 20 } onClick={ () => setShowOptions(!showOptions) } />
            </div>
            { showOptions &&
                <>
                    <div
                        ref={ optionsRef } // Ref to the options div
                        className="absolute right-16 rounded-lg bg-slate-800/95 backdrop-blur-sm px-1 py-0 z-50"
                    >
                        <p className="px-2 cursor-pointer hover:bg-black/40"
                        // onClick={ addToQueue }
                        >Add To Queue</p>
                        <p className="px-2 cursor-pointer hover:bg-black/40"
                        // onClick={ addToPlaylist }
                        >Add To Playlist</p>
                    </div>
                </>
            }
        </li>
    )
}
