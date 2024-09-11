"use client";
import createAlbum from "@/app/lib/createAlbum";
import { FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateAlbumPage() {
  const { data: session } = useSession();
  const jwt = session?.access;
  const username = session?.user.username;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("artist", username || ""); // Ensure artist is set in form data

    try {
      await createAlbum(formData);
      const albumName = formData.get("title"); // Get the album name from the form data
      const cover = formData.get("cover");
      // Redirect to the song creation page with the album name as a query parameter
      router.push(
        `/upload/album/songs?album=${encodeURIComponent(
          albumName as string
        )}&cover=${encodeURIComponent(cover as string)}`
      );
    } catch (error) {
      console.error("Creating album failed: ", error);
      alert("Failed to create album. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-2 backdrop-blur-md overflow-y-auto h-screen w-full">
      <h3 className="uppercase font-extrabold mb-2">Create A New Album</h3>
      <div className="">
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

          <label htmlFor="description">Description: </label>
          <br />
          <textarea
            className="text-black rounded-lg w-full bg-slate-400 placeholder:text-black/50 p-2 mb-5"
            rows={ 4 }
            name="description"
            placeholder="Description"
            required
          />
          <br />
          {/* <input
            className="text-black rounded-lg bg-slate-400 placeholder:text-black/50 p-2 mb-5"
            type="text"
            name="artist"
            placeholder="Artist"
            required
            value={username}
            unselectable="on"
            disabled
          />
          <br /> */}
          <label htmlFor="cover">Cover: </label>
          <br />
          <input
            className="text-black cursor-pointer p-2 rounded-lg bg-slate-400 mb-5"
            type="file"
            name="cover"
            id="cover"
            required
          />
          <br />
          <button
            className="text-white p-2 rounded-lg border w-full text-center mb-5"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </main>
  );
}
