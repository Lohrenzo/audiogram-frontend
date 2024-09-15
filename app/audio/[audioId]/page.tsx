"use client";

import { useSession } from "next-auth/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Unauthorized from "../../unauthorized";
import Loading from "../../loading";

// zustand
import { useIsSidebarOpenStore } from "../../store/store";

// Icons
import playImage from "../../../public/img/icons/play.png";
import pauseImage from "../../../public/img/icons/pause.png";


import getAudioDetails from "@/app/lib/getAudioDetails";
import ListItem from "@/app/components/listItem";
import Error from "@/app/error";
import humanizeDate from "@/app/lib/humanizeDate";

type Params = {
    params: {
        audioId: string;
    };
};

export default function AudioDetails({ params: { audioId } }: Params) {
    const { data: session, status } = useSession();
    const { isSidebarOpen } = useIsSidebarOpenStore();
    const [audioDetails, setAudioDetails] = useState<Song>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            (async () => {
                try {
                    const fetchedAudio = await getAudioDetails(audioId);
                    setAudioDetails(fetchedAudio);
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

    return (
        <main
            className={ `flex flex-col items-center justify-start p-2` }
        >
            <div className="flex flex-col gap-0 w-full h-full overflow-hidden">
                <div className="grid grid-cols-1 gap-4 relative">
                    { audioDetails?.cover && (
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
                                <div className="grid place-items-center h-[90px] w-[90px] p-3 bg-black/60 rounded-full">
                                    <Image
                                        className="object-cover object-center"
                                        loading="lazy"
                                        alt={ `play ${audioDetails?.title}` }
                                        src={ playImage }
                                        width={ 60 }
                                        height={ 60 }
                                    // priority
                                    />
                                </div>
                            </div>
                        </div>
                    ) }

                    <div className="flex flex-col gap-2 items-start justify-between text-left">
                        <div className="flex items-end justify-between gap-x-4 gap-y-2 md:flex-row md:flex-nowrap flex-wrap w-full">
                            <h1 className="w-full text-4xl font-bold">
                                { audioDetails?.title }
                            </h1>
                            <p className="text-sm text-slate-400">{ audioDetails?.artist }</p>
                        </div>
                        <p className="text-sm">Prod. { audioDetails?.producer }</p>
                        <p className="text-sm text-slate-400">{ humanizeDate(audioDetails?.released as string) }</p>
                        <p className="absolute top-2 right-4 bg-white/40 backdrop-blur p-2 rounded-xl font-bold text-black text-sm">{ audioDetails?.genre }</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
