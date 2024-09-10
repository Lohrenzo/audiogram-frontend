import createAudio from "@/app/lib/createAudio";
import { FormEvent, useState } from "react";

type Props = {
  index: number;
  genres: Genre[] | undefined;
  jwt: string | undefined;
  username: string;
  // cover: string;
  albumName: string | null;
  //   handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};
export default function Form({
  index,
  genres,
  jwt,
  username,
  // cover,
  albumName,
}: // handleSubmit
Props) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("artist", username || ""); // Ensure artist is set in form data
    formData.set("album", albumName || "");
    // formData.set("cover", cover || "");
    formData.set("status", "released");

    try {
      if (!jwt) alert("No Jwt Present!!"); // Ensure JWT is available
      await createAudio(formData, jwt);
      setSubmitted(true);
      //   window.location.href = "/dashboard"; // Redirect on success
    } catch (error) {
      console.error("Creating audio failed: ", error);
      alert("Failed to create audio! Please try again.");
    }
  };

  return (
    <>
      {submitted && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-lg z-20 bg-black/75 backdrop-blur-md">
          Added
        </div>
      )}
      <h3>Song {index + 1}</h3>
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
        <label htmlFor={`cover`}>Single Cover: </label>
        <br />
        <input
          className="text-black cursor-pointer w-full p-2 rounded-lg bg-slate-400 mb-5"
          type="file"
          name="cover"
          id={`cover`}
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
          disabled={submitted}
        >
          Create
        </button>
      </form>
    </>
  );
}
