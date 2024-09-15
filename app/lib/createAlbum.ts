import { axiosAuth } from "./axios";

export default async function createAlbum(
  album: FormData,
  jwt: string | undefined
) {
  // try {
  //   const res = await axiosAuth.post("api/album", {
  //     album,
  //   });

  //   if (res.status !== 200 && res.status !== 201) {
  //     throw new Error("Album creation failed!!");
  //   }

  //   const message = await res.data;
  //   console.log(message);

  //   return message;
  // } catch (error) {
  //   console.error("Failed to create album:", error);
  //   throw error;
  // }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}api/album`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: album,
    }
  );

  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorDetails = await res.json();
      throw new Error(errorDetails.message || "Failed to create album");
    } else {
      throw new Error("Failed to create album");
    }
  }

  const message = await res.text(); // Server returns a plain text message
  console.log(message);
  return message;
}
