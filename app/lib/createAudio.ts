export default async function createAudio(
  audioData: FormData,
  jwt: string | undefined
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}api/audio`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: audioData,
    }
  );

  if (res.status !== 200 && res.status !== 201) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorDetails = await res.json();
      throw new Error(errorDetails.message || "Failed to create audio");
    } else {
      throw new Error("Failed to create audio!!");
    }
  }

  const message = (await res.text()) || (await res.json());
  const code = res.status;
  console.log(message);
  return { message, code };
}
