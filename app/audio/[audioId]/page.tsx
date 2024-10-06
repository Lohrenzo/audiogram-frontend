"use client";

import { useSession } from "next-auth/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Unauthorized from "../../unauthorized";
import Loading from "../../loading";

// zustand
import { useIsSidebarOpenStore, useAudioStore } from "../../store/store";

// Icons
import playIcon from "../../../public/img/icons/play.png";
import pauseIcon from "../../../public/img/icons/pause.png";


import getAudioDetails from "@/app/lib/getAudioDetails";
import ListItem from "@/app/components/listItem";
import Error from "@/app/error";
import humanizeDate from "@/app/lib/humanizeDate";
import Skeleton from "@/app/components/skeletons/skeleton";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import getAudioStreamCount from "@/app/lib/getAudioStreamCount";

type Params = {
    params: {
        audioId: string;
    };
};

export default function AudioDetails({ params: { audioId } }: Params) {
    const { data: session, status } = useSession();
    const { isSidebarOpen } = useIsSidebarOpenStore();
    const { isPlaying, nowPlaying, togglePause, togglePlay } = useAudioStore();
    const [audioDetails, setAudioDetails] = useState<Song>();
    const [streamCount, setStreamCount] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            (async () => {
                try {
                    const fetchedAudio = await getAudioDetails(audioId);
                    const fetchedStreamCount = await getAudioStreamCount(audioId);
                    setAudioDetails(fetchedAudio);
                    setStreamCount(fetchedStreamCount.stream_count)
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [audioId, status, session])


    if (status === "loading") return <Loading />;

    if (!session) {
        redirect("/");
    }

    if (error) return <Error />

    if (session && !session?.user) {
        return <Unauthorized />;
    }

    const handlePlayPause = () => {
        if (isPlaying && nowPlaying?.id === audioId) {
            // If the current audio is playing, pause it
            togglePause();
        } else {
            // Play this audio
            togglePlay({
                id: audioId,
                cover: audioDetails?.cover,
                title: audioDetails?.title,
                artist: audioDetails?.artist,
                audioFile: audioDetails?.audio,
            });
        }
    };

    return (
        <main
            className={ `relative h-[85vh] flex flex-col items-center justify-start p-2` }
        >
            <div className="flex flex-col gap-0 w-full h-full overflow-hidden">
                <div className="grid grid-cols-1 gap-4 relative">
                    { loading ? <Skeleton height="300px" width="100%" variant="" />
                        : audioDetails?.cover && (
                            <div className="relative h-[300px] w-full group">
                                <Image
                                    className="object-cover object-center h-[300px] w-full"
                                    alt={ `${audioDetails?.title} cover` }
                                    src={ audioDetails?.cover as string }
                                    width={ 100 }
                                    height={ 300 }
                                    priority
                                />
                                <div className="absolute grid place-items-center invisible group-hover:visible top-0 left-0 transition-all duration-150 ease-in-out h-[300px] w-full bg-black/35 backdrop-blur">
                                    <div
                                        onClick={ handlePlayPause }
                                        className="cursor-pointer grid place-items-center h-[90px] w-[90px] p-3 bg-black/60 rounded-full"
                                    >
                                        <Image
                                            className="object-cover object-center"
                                            loading="lazy"
                                            alt={ `play ${audioDetails?.title}` }
                                            src={ isPlaying ? pauseIcon : playIcon }
                                            width={ 60 }
                                            height={ 60 }
                                        // priority
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <div className="flex flex-col gap-2 items-start justify-between text-left">
                        <div className="flex items-end justify-between gap-x-4 gap-y-2 md:flex-row md:flex-nowrap flex-wrap w-full">
                            <h1 className="w-full text-4xl font-bold">
                                { loading ? <Skeleton height="2rem" width="100%" variant="" />
                                    : audioDetails?.title
                                }
                            </h1>
                            <p className="text-sm text-slate-400">{ audioDetails?.artist }</p>
                        </div>
                        <p className="w-full text-sm">
                            { loading ? <Skeleton height="1rem" width="50%" variant="" />
                                : `Producer(s): ${audioDetails?.producer}` }
                        </p>
                        <p className="w-full text-sm text-slate-400">
                            { loading ? <Skeleton height="1rem" width="50%" variant="" />
                                : humanizeDate(audioDetails?.released as string) }
                        </p>
                        { loading
                            ? <Skeleton height="2.4rem" width="100%" variant="border border-slate-800 rounded-lg p-2 shadow font-bold w-full" />
                            : <p className="text-center border border-slate-800 text-slate-300 rounded-lg p-2 shadow font-bold w-full">{ streamCount || 0 } Plays</p>
                        }
                        { loading ? <Skeleton height="38px" width="110px" variant="absolute top-2 right-4 bg-white/40 backdrop-blur p-2 rounded-xl" />
                            : <p className="absolute top-2 right-4 bg-white/40 backdrop-blur p-2 rounded-xl font-bold text-black text-sm">
                                { audioDetails?.genre }
                            </p>
                        }
                    </div>
                </div>
            </div>
            {
                audioDetails?.artist === session.user.username &&
                <div className="absolute left-2 top-2 flex flex-col gap-1 place-items-center">
                    <div className="p-2 bg-black/90 text-white cursor-pointer">
                        <AiFillEdit />
                    </div>
                    <div className="p-2 bg-black/90 text-red-800 cursor-pointer">
                        <AiFillDelete />
                    </div>
                </div>
            }
        </main >
    )
}
