"use client";
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import createAudio from "@/app/lib/createAudio";

function CreateSinglePage() {
  const [username, setUsername] = useState("");
  const [jwt, setJwt] = useState("");
  const [genres, setGenres] = useState<Genre[]>();

  const { data: session, status } = useSession();
  // const jwt = session?.access;
  // const username = session?.user.username;

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
      setJwt(session?.access);
      // Fetch genres only when the session is authenticated and available
      fetchGenres();
    }
  }, [fetchGenres, status, session]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      alert("Failed to create audio! Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-2 backdrop-blur-md overflow-y-auto h-screen w-full">
      <h3 className="uppercase font-extrabold mb-2">Upload New Single</h3>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          className="text-black rounded-lg w-full bg-slate-400 placeholder:text-black/50 p-2 mb-5"
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
        />
        <br />
        <label htmlFor="producer">Producer: </label>
        <br />
        <input
          className="text-black rounded-lg w-full bg-slate-400 placeholder:text-black/50 p-2 mb-5"
          type="text"
          name="producer"
          id="producer"
          placeholder="Producer"
          required
        />
        <br />
        <label htmlFor={ `audio` }>Audio File: </label>
        <br />
        <input
          className="text-black cursor-pointer w-full p-2 rounded-lg bg-slate-400 mb-5"
          type="file"
          name="audio"
          id={ `audio` }
          required
        />
        <br />
        <label htmlFor={ `cover` }>Single Cover: </label>
        <br />
        <input
          className="text-black cursor-pointer w-full p-2 rounded-lg bg-slate-400 mb-5"
          type="file"
          name="cover"
          id={ `cover` }
          required
        />
        <br />
        <label htmlFor={ `genre` }>Genre: </label>
        <br />
        <select
          className="text-black rounded-lg w-full bg-slate-400 placeholder:text-black/50 p-2 mb-5"
          name="genre"
          id={ `genre` }
        >
          { genres && genres.length > 0 ? (
            genres.map((genre, genreIndex) => (
              <option key={ genreIndex } value={ genre.title }>
                { genre.title }
              </option>
            ))
          ) : (
            <>
              <option value="afrobeats">Afrobeats</option>
              <option value="amapiano">Amapiano</option>
              <option value="hip-hop">Hip-Hop</option>
            </>
          ) }
        </select>
        <button
          className="text-white p-2 rounded-lg border w-full text-center mb-5"
          type="submit"
        // disabled={}
        >
          Create
        </button>
      </form>
    </main>
  );
}

export default CreateSinglePage;
