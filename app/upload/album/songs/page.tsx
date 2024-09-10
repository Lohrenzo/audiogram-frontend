"use client";
import { FormEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import createAudio from "@/app/lib/createAudio";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "./form";
import Link from "next/link";

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

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session?.user.username);
      // Fetch genres only when the session is authenticated and available
      fetchGenres();
    }
  }, [fetchGenres, status, session]);

  const handleNumberChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const numberOfSongs = formData.get("numberOfSongs") as string;
    setNumberOfSongs(parseInt(numberOfSongs));
    setShowForms(true);
  };

  //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     formData.set("artist", username || ""); // Ensure artist is set in form data
  //     formData.set("album", albumName || "");

  //     try {
  //       await createAudio(formData, jwt);
  //       //   window.location.href = "/dashboard"; // Redirect on success
  //     } catch (error) {
  //       console.error("Creating album failed: ", error);
  //       alert("Failed to create album. Please try again.");
  //     }
  //   };

  return (
    <main className="w-full pe-3 overflow-y-auto">
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
              { [...Array(9).keys()].map((n) => (
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
              // cover={cover}
              />
              {/* <h3>Song {index + 1}</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor={`title_${index}`}>Title: </label>
                <br />
                <input
                  className="text-black rounded-lg w-full bg-slate-400 placeholder:text-black/50 p-2 mb-5"
                  type="text"
                  name="title"
                  id={`title_${index}`}
                  placeholder="Title"
                  required
                />
                <br />
                <label htmlFor={`producer_${index}`}>Producer: </label>
                <br />
                <input
                  className="text-black rounded-lg w-full bg-slate-400 placeholder:text-black/50 p-2 mb-5"
                  type="text"
                  name="producer"
                  id={`producer_${index}`}
                  placeholder="Producer"
                  required
                />
                <br />
                <label htmlFor={`audio_${index}`}>Audio File: </label>
                <br />
                <input
                  className="text-black cursor-pointer w-full p-2 rounded-lg bg-slate-400 mb-5"
                  type="file"
                  name="audio"
                  id={`audio_${index}`}
                  required
                />
                <br />
                <label htmlFor={`genre_${index}`}>Genre: </label>
                <br />
                <select
                  className="text-black rounded-lg w-full bg-slate-400 placeholder:text-black/50 p-2 mb-5"
                  name="genre"
                  id={`genre_${index}`}
                >
                  {genres && genres.length > 0 ? (
                    genres.map((genre, genreIndex) => (
                      <option key={genreIndex} value={genre.title}>
                        {genre.title}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="afrobeats">Afrobeats</option>
                      <option value="amapiano">Amapiano</option>
                      <option value="hip-hop">Hip-Hop</option>
                    </>
                  )}
                </select>
                <button
                  className="text-white p-2 rounded-lg border w-full text-center mb-5"
                  type="submit"
                >
                  Create
                </button>
              </form> */}
            </div>
          )) }
          <Link href="/dashboard">Complete</Link>
        </div>
      ) }
    </main>
  );
}
