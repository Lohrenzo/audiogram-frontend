"use client";
import { FormEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import createAudio from "@/app/lib/createAudio";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "./form";
import Link from "next/link";
import Unauthorized from "@/app/unauthorized";
import NotLoggedIn from "@/app/notLoggedIn";
import TransitionLink from "@/app/components/transitionLink";

export default function Songs4Album() {
  const { data: session, status } = useSession();
  const jwt = session?.access;
  const router = useRouter(); // Use the router hook for navigation
  const searchParams = useSearchParams();
  const albumName = searchParams.get("album");
  // const cover = searchParams.get("cover");

  const [username, setUsername] = useState("");
  const [genres, setGenres] = useState<Genre[]>();
  const [numberOfSongs, setNumberOfSongs] = useState(1);
  const [showForms, setShowForms] = useState(false);

  useEffect(() => {
    async function fetchGenres() {
      if (!jwt) return; // Ensure JWT is available
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}api/genre`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        console.log("session: ", session);
        const data = await res.json();
        setGenres(data);
        console.log(genres);
      } catch (error) {
        console.error("Fetching genre failed: ", error);
        throw new Error("Failed to fetch genres!!");
      }
    }

    if (status === "authenticated") {
      setUsername(session?.user.username);
      // Fetch genres only when the session is authenticated and available
      fetchGenres();
    }
  }, [status, session, jwt]);

  const handleNumberChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const numberOfSongs = formData.get("numberOfSongs") as string;
    setNumberOfSongs(parseInt(numberOfSongs));
    setShowForms(true);
  };

  if (session) {
    if (session?.user?.is_artist) {
      return (
        <main className="w-full h-[85vh] pe-3 overflow-y-auto">
          <h2 className="mb-3 capitalize">{ albumName }</h2>
          { !showForms ? (
            <div>
              <form onSubmit={ handleNumberChange }>
                <label htmlFor="numberOfSongs">Number of Songs in Album: </label>
                <select
                  className="text-black rounded-lg bg-slate-400 placeholder:text-black/50 p-2 mb-5"
                  name="numberOfSongs"
                  id="numberOfSongs"
                >
                  { [...Array(18).keys()].map((n) => (
                    <option key={ n + 1 } value={ n + 1 }>
                      { n + 1 }
                    </option>
                  )) }
                </select>
                <br />
                <button
                  className="text-white p-2 rounded-lg border w-full text-center mb-5"
                  type="submit"
                >
                  Go
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                { [...Array(numberOfSongs)].map((_, index) => (
                  <div
                    className="relative shadow-md shadow-slate-900/50 rounded-lg p-4 mb-5 bg-black/30"
                    key={ index }
                  >
                    <Form
                      index={ index }
                      genres={ genres }
                      jwt={ jwt }
                      username={ username }
                      albumName={ albumName }
                    />
                  </div>
                )) }
              </div>
              <div className="w-full text-center">
                <Link className="text-center hover:underline hover:scale-110 duration-200 transition-all ease-in-out" href="/dashboard">Complete</Link>
              </div>
            </>
          ) }
        </main>
      );
    } else return <Unauthorized />
  }
  // else return <NotLoggedIn />
}
