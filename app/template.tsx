'use client'

import { motion } from 'framer-motion'
import { useSession } from "next-auth/react";

// Zustand store
import { usePlaylistStore } from './store/store'
import { useState, useEffect, FormEvent, ChangeEvent, MouseEvent } from 'react';
import getUserPlaylists from './lib/getUserPlaylists';
import { toast } from 'sonner';

export default function Template({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const { addToPlaylistPopup, closeAddToPlaylistPopup, audioIdToAddToPlaylist } = usePlaylistStore();
    const [loading, setLoading] = useState(false);
    const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
    const [jwt, setJwt] = useState("");

    useEffect(() => {
        if (status === "authenticated") {
            setJwt(session?.access);
        }
    }, [status, session]);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            (async () => {
                try {
                    const fetchedUserPlaylists: Playlist[] = await getUserPlaylists();
                    setUserPlaylists(fetchedUserPlaylists);
                    console.log("User Playlists: ", userPlaylists);
                } catch (error) {
                    throw new Error();
                }
            })();
        }
    }, [status, session]);

    const handleAddToPlaylist = async (playlist: Playlist) => {
        setLoading(true);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}api/playlist/${playlist.id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ audio_id: audioIdToAddToPlaylist }),
            }
        );

        if (res.status !== 200 && res.status !== 201) {
            toast.error(`Audio is already in the playlist`);
            setLoading(false);
            throw new Error("Playlist Update Failed");
        } else {
            // Update the playlist state to reflect the added song
            const fetchedUserPlaylists: Playlist[] = await getUserPlaylists();
            setUserPlaylists(fetchedUserPlaylists);

            toast.success(`Successfully added to the playlist named: ${playlist.title}`);

            setLoading(false);
        }
    };

    const handleCheckboxClick = (e: MouseEvent<HTMLInputElement>, playlist: Playlist) => {
        // Prevent the default toggle behavior
        e.preventDefault();

        // Only call the function if the checkbox is not already checked
        if (!playlist.audios.some(song => song.id === audioIdToAddToPlaylist)) {
            handleAddToPlaylist(playlist);
        }
    }


    return (
        <motion.div
            initial={ { y: 20, opacity: 0 } }
            animate={ { y: 0, opacity: 1 } }
            transition={ { ease: 'easeInOut', duration: 0.75 } }
        >
            { children }
            { addToPlaylistPopup &&
                <motion.div
                    className='absolute top-0 left-0 w-screen h-screen bg-black/75 backdrop-blur-lg z-50'
                    initial={ { x: 20, opacity: 0 } }
                    animate={ { x: 0, opacity: 1 } }
                    transition={ { ease: 'easeInOut', duration: 0.75 } }
                >
                    <div className="px-4 h-[16vh] flex items-center justify-between bg-gray-950 shadow-md shadow-blue-500/10">
                        <h2 className='capitalize'>add to playlist</h2>
                        <button
                            className="p-2 rounded-lg border border-slate-800 bg-black hover:text-slate-400 hover:scale-110 transition-all ease-in-out duration-150"
                            onClick={ closeAddToPlaylistPopup }
                        >
                            Close
                        </button>
                    </div>
                    <div className="h-[78vh] border-b border-slate-800 overflow-y-auto overflow-x-hidden">
                        <p className='text-center py-2 sm:text-base text-sm text-gray-400 w-full'>Your playlists</p>

                        { userPlaylists.map((playlist) => (
                            <div key={ playlist.id } className="md:w-[60%] w-[80%] mx-auto p-3 mb-4 flex flex-row items-center justify-between border-b border-slate-800">
                                <p className="text-gray-400 w-full p-2 text-sm">
                                    { playlist.title }:
                                </p>
                                <div className='p-2'>
                                    <input
                                        className='sm:size-5 size-3 cursor-pointer disabled:opacity-65'
                                        disabled={ loading ? true : false }
                                        type="checkbox"
                                        id={ `${playlist.id}` }
                                        name="add"
                                        // value={ playlist.id }
                                        onClick={ (e) => handleCheckboxClick(e, playlist) }
                                        checked={ playlist.audios.some(song => song.id === audioIdToAddToPlaylist) } // Check if the current audio is in this playlist
                                    />
                                </div>
                            </div>
                        )) }


                    </div>
                </motion.div>
            }
        </motion.div>
    )
}