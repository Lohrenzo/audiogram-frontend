"use client";
import { useSession } from "next-auth/react";
import DisplayPlaylists from "../components/displayPlaylists";
import Unauthorized from "../unauthorized";

import { usePlaylistStore } from "../store/store";
import SubmitButton from "../components/submitButton";
import { FormEvent, useEffect, useState } from "react";
import createPlaylist from "../lib/createPlaylist";
import { toast } from "sonner";


export default function PlaylistPage() {
    const { data: session, update, status } = useSession();
    const {
        createPlaylistPopup,
        openCreatePlaylistPopup,
        closeCreatePlaylistPopup
    } = usePlaylistStore()
    const [loading, setLoading] = useState(false);
    const [jwt, setJwt] = useState("");

    useEffect(() => {
        if (status === "authenticated") {
            setJwt(session?.access);
        }
    }, [status, session]);



    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;
        const description = (e.currentTarget.elements.namedItem("description") as HTMLInputElement).value;

        // Create JSON payload
        const playlistData = {
            title,
            description,
        };

        try {
            await createPlaylist(playlistData, jwt);
            toast.success(`${title} Created Successfully`)
            window.location.href = "/playlist"; // Redirect on success
            closeCreatePlaylistPopup();
        } catch (error) {
            console.error("Creating playlist failed: ", error);
            toast.error("Playlist Creation Failed!!")
        } finally {
            setLoading(false);
        }
    }

    if (session) {
        if (session?.user) {
            return (
                <div className='p-2 h-[80vh] overflow-x-hidden overflow-y-auto flex items-center justify-center'>
                    <div className="l-full w-full flex flex-col gap-y-3 items-center justify-start">
                        <DisplayPlaylists fetchType="all" />
                        <DisplayPlaylists fetchType="user" />
                        <button
                            onClick={ openCreatePlaylistPopup }
                            className="p-2 rounded-lg border border-slate-800 bg-black hover:text-slate-400 hover:scale-110 transition-all ease-in-out duration-150"
                        >
                            New Playlist
                        </button>
                    </div>

                    { createPlaylistPopup &&
                        <div className="absolute top-0 left-0 w-screen h-screen z-30 px-4 bg-black/75 backdrop-blur overflow-hidden">
                            <div className="h-[12vh] flex items-center justify-between">
                                <h2>Create playlist</h2>
                                <button
                                    className="p-2 rounded-lg border border-slate-800 bg-black hover:text-slate-400 hover:scale-110 transition-all ease-in-out duration-150"
                                    onClick={ closeCreatePlaylistPopup }
                                >
                                    Close
                                </button>
                            </div>
                            <div className="h-[84vh] border-y border-slate-800 overflow-y-auto overflow-x-hidden">
                                <form className="md:w-[60%] w-[80%] mx-auto p-3" onSubmit={ handleSubmit }>
                                    <label className="text-gray-400" htmlFor="title">Title: </label>
                                    <input
                                        className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                    />

                                    <label className="text-gray-400" htmlFor="description">Description: </label>
                                    <input
                                        className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
                                        type="text"
                                        name="description"
                                        id="description"
                                        required
                                    />

                                    <SubmitButton loading={ loading } content="Create" />
                                </form>

                            </div>

                        </div>
                    }
                </div>
            )
        } else return <Unauthorized />
    }
}