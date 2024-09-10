export default async function createAudio(
  audio: FormData,
  jwt: string | undefined
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}api/audio`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: audio,
    }
  );

  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorDetails = await res.json();
      throw new Error(errorDetails.message || "Failed to create audio");
    } else {
      throw new Error("Failed to create audio");
    }
  }

  const message = await res.text(); // Server returns a plain text message
  console.log(message);
  return message;
}