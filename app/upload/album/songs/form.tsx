import SubmitButton from "@/app/components/submitButton";
import createAudio from "@/app/lib/createAudio";
import { FormEvent, useState } from "react";

import { toast } from 'sonner';

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
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("artist", username || ""); // Ensure artist is set in form data
    formData.set("album", albumName || "");
    // formData.set("cover", cover || "");
    formData.set("status", "released");

    setTitle(formData.get("title") as string);

    try {
      if (!jwt) alert("No Jwt Present!!"); // Ensure JWT is available
      await createAudio(formData, jwt);
      setSubmitted(true);
      toast.success(`${title} has been added successfully to album`)
      //   window.location.href = "/dashboard"; // Redirect on success
    } catch (error) {
      console.error("Creating audio failed: ", error);
      alert("Failed to create audio! Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col justify-start items-center">
      { submitted && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-lg z-20 bg-black/75 backdrop-blur-md">
          { title } Added Successfully
        </div>
      ) }
      <h3>Song { index + 1 }</h3>
      <form className="md:w-[90%] w-[80%]" onSubmit={ handleSubmit }>
        <label className="text-gray-400" htmlFor={ `title_${index}` }>Title: </label>
        <input
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
          type="text"
          name="title"
          id={ `title_${index}` }
          placeholder="Title"
          required
        />

        <label className="text-gray-400" htmlFor={ `producer_${index}` }>Producer: </label>
        <input
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
          type="text"
          name="producer"
          id={ `producer_${index}` }
          placeholder="Producer"
          required
        />

        <label className="text-gray-400" htmlFor={ `audio_${index}` }>Audio File: </label>
        <input
          className="cursor-pointer border bg-white placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 block w-full text-sm text-slate-500
              file:cursor-pointer file:mr-4 file:py-2 file:px-3
              file: file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-[#345cb8]
              hover:file:bg-violet-100 mb-5"
          type="file"
          name="audio"
          id={ `audio_${index}` }
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

        <label className="text-gray-400" htmlFor={ `genre_${index}` }>Genre: </label>
        <select
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
          name="genre"
          id={ `genre_${index}` }
        >
          <option unselectable="on" disabled>Choose A Genre</option>
          { genres && genres.length > 0 && (
            genres.map((genre, genreIndex) => (
              <option key={ genreIndex } value={ genre.title }>
                { genre.title }
              </option>
            ))
          ) }
        </select>
        <SubmitButton loading={ loading } content="Create" />
      </form>
    </section>
  );
}
