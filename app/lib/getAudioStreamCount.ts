import { axiosAuth } from "./axios";

export default async function getAudioStreamCount(audioId: string | number) {
  try {
    const res = await axiosAuth.get(`rev/stream/audio/${audioId}/count`);

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error("Failed to load stream count:", error);
    throw error;
  }
}
