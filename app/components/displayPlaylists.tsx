"use client";

import Card from "@/app/components/card";
import getUserAlbums from "@/app/lib/getUserAlbums";
import getAllAlbums from "@/app/lib/getAllAlbums";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import Skeleton from "./skeletons/skeleton";
import getAllPlaylists from "../lib/getAllPlaylists";
import getUserPlaylists from "../lib/getUserPlaylists";

type Props = {
  fetchType: "user" | "all"; // Determines whether to fetch user albums or all albums
};

export default function DisplayPlaylists({ fetchType }: Props) {
  const { data: session, status } = useSession();

  const [playlists, setPlaylists] = useState<Playlist[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const skeletonCount = 7;

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (fetchType === "all") {
        (async () => {
          try {
            const fetchedPlaylists = await getAllPlaylists();
            if (Array.isArray(fetchedPlaylists)) {
              setPlaylists(fetchedPlaylists);
            } else {
              console.error("Fetched playlists is not an array:", fetchedPlaylists);
              setError("Invalid data format received");
            }
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        })();
      } else if (fetchType === "user") {
        (async () => {
          try {
            const fetchedPlaylists = await getUserPlaylists();
            if (Array.isArray(fetchedPlaylists)) {
              setPlaylists(fetchedPlaylists);
            } else {
              console.error("Fetched playlists is not an array:", fetchedPlaylists);
              setError("Invalid data format received");
            }
          } catch (error) {
            setError(error);
          }
          finally {
            setLoading(false);
          }
        })();
      }
    }
  }, [fetchType, status, session]);

  const heading = fetchType === "user" ? "Your Playlists" : "Featured Playlists";

  return (
    <div className="p-2 border border-slate-800 shadow-[#33305daa] bg-black/40 backdrop-blur-lg rounded-lg lg:h-[35vh] w-full">
      { loading ? <Skeleton width="20%" height="1rem" variant="" />
        : <h1>{ heading }</h1>
      }
      <p className="mb-2 bg-slate-600 rounded-md p-px"></p>
      { loading ? (
        <ul className="display-cards flex flex-row items-start justify-start overflow-x-auto overflow-y-hidden py-2 gap-x-4 w-full">
          {/* Dynamically generate skeletons based on skeletonCount */ }
          { Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton
              key={ index }
              width="150px"
              height="143px"
              variant="rounded-md"
            />
          )) }
        </ul>
      ) : error ? (
        <ul className="display-cards flex flex-row items-start justify-start overflow-x-auto overflow-y-hidden py-2 gap-x-4 w-full">
          <p className="min-w-full h-[142.5px] text-red-500">{ error }</p>
        </ul>
      ) : (
        <ul className="display-cards flex flex-row items-start justify-start overflow-x-auto overflow-y-hidden py-2 gap-x-4 w-full">
          { playlists && playlists.length > 0 ? (
            <>
              { playlists.map((playlist: Playlist) => (
                <Card
                  key={ playlist.id }
                  id={ playlist.id }
                  title={ playlist.title }
                  src={ playlist.audios[0] ? playlist.audios[0].cover : "/img/headphones-mic.jpg" }
                  artist={ playlist.creator }
                  type="playlist"
                  date={ playlist.created }
                />
              )) }
            </>
          ) : (
            <p className="min-w-full h-full">No Playlists Found !</p>
          ) }
        </ul>
      ) }
    </div>
  );
}
