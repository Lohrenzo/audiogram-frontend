"use client";
import createAlbum from "@/app/lib/createAlbum";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Unauthorized from "@/app/unauthorized";
import NotLoggedIn from "@/app/notLoggedIn";
import SubmitButton from "@/app/components/submitButton";

import { toast } from 'sonner';

export default function CreateAlbumPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const jwt = session?.access;
  const username = session?.user.username;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("artist", username || ""); // Ensure artist is set in form data

    try {
      await createAlbum(formData, jwt);
      const albumName = formData.get("title"); // Get the album name from the form data
      const cover = formData.get("cover");
      // Redirect to the song creation page with the album name as a query parameter
      router.push(
        `/upload/album/songs?album=${encodeURIComponent(
          albumName as string
        )}&cover=${encodeURIComponent(cover as string)}`
      );

      toast.success(`${albumName} Created!`)
    } catch (error) {
      console.error("Creating album failed: ", error);
      alert("Failed to create album. Please try again.");
      setLoading(false);
    }
  };

  if (session) {
    if (session?.user?.is_artist) {
      return (
        <main className="flex flex-col items-center justify-center gap-2 backdrop-blur-md overflow-y-auto h-[80vh] w-full">
          <h3 className="uppercase font-extrabold mb-2 text-gray-300">Create A New Album</h3>
          <form className="md:w-[60%] w-[80%]" onSubmit={ handleSubmit }>
            <label className="text-gray-400" htmlFor="title">Title: </label>
            {/* <br /> */ }
            <input
              className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
            />

            <label className="text-gray-400" htmlFor="description">Description: </label>
            <textarea
              className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 mb-5"
              rows={ 4 }
              name="description"
              placeholder="Description"
              required
            />

            <label className="text-gray-400" htmlFor="cover">Cover: </label>
            <input
              className="cursor-pointer border bg-white placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 block w-full text-sm text-slate-500
              file:cursor-pointer file:mr-4 file:py-2 file:px-3
              file: file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-[#345cb8]
              hover:file:bg-violet-100 mb-5"
              type="file"
              name="cover"
              id="cover"
              required
            />
            {/* <br /> */ }
            <SubmitButton loading={ loading } content="Create" />
          </form>
        </main>
      );
    } else return <Unauthorized />
  }
  // else return <NotLoggedIn />
}
