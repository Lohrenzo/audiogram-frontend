"use client";

import { useSession } from "next-auth/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Unauthorized from "../../unauthorized";
import Loading from "../../loading";

// zustand
import { useIsSidebarOpenStore } from "../../store/store";
import getAlbumDetails from "@/app/lib/getAlbumDetails";
import ListItem from "@/app/components/listItem";
import Error from "@/app/error";
import humanizeDate from "@/app/lib/humanizeDate";
import Skeleton from "@/app/components/skeletons/skeleton";

// Icons
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

type Params = {
  params: {
    albumId: string;
  };
};

export default function AlbumDetails({ params: { albumId } }: Params) {
  const { data: session, status } = useSession();
  const { isSidebarOpen } = useIsSidebarOpenStore();
  const [albumDetails, setAlbumDetails] = useState<Album>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      (async () => {
        try {
          const fetchedAlbum = await getAlbumDetails(albumId);
          setAlbumDetails(fetchedAlbum);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [albumId, status, session])

  if (status === "loading") return <Loading />;

  if (!session) {
    redirect("/login");
  }

  if (error) return <Error />

  if (session && !session?.user) {
    return <Unauthorized />;
  }

  return (
    <main
      className={ `
        relative w-full transition-all ease-in-out duration-200 flex h-[85vh] flex-col items-center justify-start p-2` }
    >
      <div className="flex flex-col gap-0 w-full h-full overflow-x-hidden md:overflow-y-hidden">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:h-[300px]">
          { loading ? <Skeleton height="300px" width="100%" variant="" />
            : albumDetails?.cover && (
              <Image
                className="object-cover h-[300px] w-full"
                alt={ `${albumDetails?.title} cover` }
                src={ albumDetails?.cover as string }
                width={ 100 }
                height={ 300 }
                priority
              />
            )
          }

          <div className="flex flex-col gap-2 items-start justify-between text-left h-[300px]">
            <h1 className="w-full px-2 md:text-4xl text-3xl font-bold">
              { loading ? <Skeleton height="100%" width="100%" variant="" />
                : albumDetails?.title }
            </h1>
            <p className={ `border border-slate-700 p-2 mt-3 w-full h-[10rem] ${loading ? "overflow-y-hidden" : "overflow-y-auto"} overflow-x-hidden` }>
              { loading ? <Skeleton height="100%" width="100%" variant="" />
                : `${albumDetails?.description || albumDetails?.title}` }
            </p>
            <div className="flex gap-x-4 gap-y-2 md:flex-row md:flex-nowrap flex-wrap h-[2.4rem] w-full p-2 text-gray-400">
              { loading ? <Skeleton height="100%" width="100%" variant="" />
                : (
                  <>
                    <p className="text-sm">By { albumDetails?.artist }</p>
                    <p className="text-sm"> Released: { humanizeDate(albumDetails?.released as string) }</p>
                  </>
                ) }
            </div>
          </div>
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
          : albumDetails?.audios && albumDetails.audios.length > 0 ? (
            <div className="w-full h-full mt-2">
              <h3 className="text-xl font-bold mb-2 text-center w-full">{ albumDetails.audios.length > 1 ? "Tracks" : "Track" }</h3>
              <ul className="space-y-2 overflow-y-auto h-[inherit] px-2">
                { albumDetails.audios.map((song) => (
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
            <p>No tracks available for this album.</p>
          ) }
      </div>
      { albumDetails?.artist === session.user.username &&
        <div className="absolute left-2 top-2 flex flex-col gap-1 place-items-center">
          <div className="p-2 bg-black/90 text-white cursor-pointer">
            <AiFillEdit />
          </div>
          <div className="p-2 bg-black/90 text-red-800 cursor-pointer">
            <AiFillDelete />
          </div>
        </div>
      }
    </main>
  )
}
