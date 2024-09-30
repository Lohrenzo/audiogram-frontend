"use client";

import ListItem from "@/app/components/listItem";
import Skeleton from "@/app/components/skeletons/skeleton";
import getPlaylistDetails from "@/app/lib/getPlaylistDetails";
import humanizeDate from "@/app/lib/humanizeDate";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useRef, useState } from "react";

type Params = {
    params: {
        playlistId: string;
    };
};

export default function PlaylistDetailsPage({ params: { playlistId } }: Params) {
    const { data: session, status } = useSession();
    const [playlistDetails, setPlaylistDetails] = useState<Playlist>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            (async () => {
                try {
                    const fetchedAudio = await getPlaylistDetails(playlistId);
                    setPlaylistDetails(fetchedAudio);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [playlistId, status, session])

    if (status === "loading") return <Loading />;


    return (
        <div className="py-2 sm:px-10 px-4">
            <div className="px-2 py-4 border-b border-slate-800">
                <p>Title: { playlistDetails?.title }</p>
                <p>Description: { playlistDetails?.description }</p>
                <p>Created By: { playlistDetails?.creator }</p>
                <p>Date Created: { humanizeDate(playlistDetails?.created as string) }</p>
            </div>
            { loading ? (
                <div className="w-full h-full mt-2">
                    <h3 className="text-xl font-bold mb-2 text-center w-full">Tracks</h3>
                    <ul className="space-y-2 overflow-y-auto h-[inherit] px-2">
                        <Skeleton height="50px" width="100%" variant="p-2" />
                        <Skeleton height="50px" width="100%" variant="p-2" />
                    </ul>
                </div>
            )
                : playlistDetails?.audios && playlistDetails.audios.length > 0 ? (
                    <div className="w-full h-full mt-2">
                        <h3 className="text-xl font-bold mb-2 text-center w-full">{ playlistDetails.audios.length > 1 ? "Tracks" : "Track" }</h3>
                        <ul className="space-y-2 overflow-y-auto h-[inherit] px-2">
                            { playlistDetails.audios.map((song) => (
                                <ListItem
                                    key={ song.id }
                                    id={ song.id }
                                    title={ song.title }
                                    src={ song.cover }
                                    artist={ song.artist }
                                    type="Single"
                                    audioFile={ song.audio }
                                />
                            )) }
                        </ul>
                    </div>
                ) : (
                    <div className="w-full h-full mt-2">
                        <h3 className="text-xl font-bold mb-2 text-center w-full">Tracks</h3>
                        <p className="text-center">No tracks available in this playlist.</p>
                    </div>
                ) }
        </div>
    )
}
