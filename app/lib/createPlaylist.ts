import { axiosAuth } from "./axios";

export default async function createPlaylist(
  playlist: { title: string; description?: string },
  jwt: string | undefined
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}api/playlist`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlist),
    }
  );

  // const res = await axiosAuth.post("api/playlist", playlist);

  if (res.status !== 200 && res.status !== 201) {
    throw new Error("Failed to create playlist");
  }

  const message = (await res.json()) || (await res.text());
  console.log(message);
  return message;
}
