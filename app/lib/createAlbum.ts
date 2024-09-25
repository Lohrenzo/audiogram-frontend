export default async function createAlbum(
  album: FormData,
  jwt: string | undefined
) {
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
