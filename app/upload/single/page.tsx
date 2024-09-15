"use client";
import { FormEvent, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import createAudio from "@/app/lib/createAudio";
import Unauthorized from "@/app/unauthorized";
import NotLoggedIn from "@/app/notLoggedIn";
import SubmitButton from "@/app/components/submitButton";
import AlertPrompt from "@/app/components/alertPrompt";

function CreateSinglePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [jwt, setJwt] = useState("");
  const [genres, setGenres] = useState<Genre[]>();
  const [error, setError] = useState(false)

  const { data: session, status } = useSession();
  // const jwt = session?.access;
  // const username = session?.user.username;

  const fetchGenres = useCallback(async () => {
    if (!jwt) return; // Ensure jwt is available
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
      const data = await res.json();
      setGenres(data);
    } catch (error) {
      console.error("Fetching genre failed: ", error);
      throw new Error("Failed to fetch genres!!");
    }
  }, [jwt]);

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session?.user.username);
      setJwt(session?.access);
      // Fetch genres only when the session is authenticated and available
      fetchGenres();
    }
  }, [status, session, fetchGenres]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("artist", username || ""); // Ensure artist is set in form data
    formData.set("status", "released");

    try {
      if (!jwt) alert("No Jwt Present!!"); // Ensure JWT is available
      await createAudio(formData, jwt);
      // setSubmitted(true);
      window.location.href = "/dashboard"; // Redirect on success
    } catch (error) {
      console.error("Creating audio failed: ", error);
      // alert("Failed to create audio! Please try again.");
      setError(true);
      setLoading(false);
    }
  };

  if (session) {
    if (session?.user?.is_artist) {
      return (
        <main className="flex flex-col items-center justify-center gap-2 backdrop-blur-md overflow-y-auto h-screen w-full">
          { error && <AlertPrompt setError={ setError } message="Upload Failed" /> }

          <h3 className="uppercase font-extrabold mb-2 text-gray-300">Upload New Single</h3>
          <form className="md:w-[60%] w-[80%]" onSubmit={ handleSubmit }>
            <label className="text-gray-400" htmlFor="title">Title: </label>
            <input
              className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
            />

            <label className="text-gray-400" htmlFor="producer">Producer: </label>
            <input
              className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
              type="text"
              name="producer"
              id="producer"
              placeholder="Producer"
              required
            />

            <label className="text-gray-400" htmlFor={ `audio` }>Audio File: </label>
            <input
              className="cursor-pointer border bg-white placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 block w-full text-sm text-slate-500
              file:cursor-pointer file:mr-4 file:py-2 file:px-3
              file: file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-[#345cb8]
              hover:file:bg-violet-100 mb-5"
              type="file"
              name="audio"
              id={ `audio` }
              required
            />

            <label className="text-gray-400" htmlFor={ `cover` }>Single Cover: </label>
            <input
              className="cursor-pointer border bg-white placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 block w-full text-sm text-slate-500
              file:cursor-pointer file:mr-4 file:py-2 file:px-3
              file: file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-[#345cb8]
              hover:file:bg-violet-100 mb-5"
              type="file"
              name="cover"
              id={ `cover` }
              required
            />

            <label className="text-gray-400" htmlFor={ `genre` }>Genre: </label>
            <select
              className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
              name="genre"
              id={ `genre` }
            >
              { genres && genres.length > 0 && (
                genres.map((genre, genreIndex) => (
                  <option key={ genreIndex } value={ genre.title }>
                    { genre.title }
                  </option>
                ))
              )
                // : (
                //   <>
                //     <option value="afrobeats">Afrobeats</option>
                //     <option value="amapiano">Amapiano</option>
                //     <option value="hip-hop">Hip-Hop</option>
                //   </>
                // )
              }
            </select>

            <SubmitButton loading={ loading } content="Create" />
          </form>
        </main>
      );
    } else return <Unauthorized />
  }
  // else return <NotLoggedIn />

}

export default CreateSinglePage;
