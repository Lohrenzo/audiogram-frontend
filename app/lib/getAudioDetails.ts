import { axiosAuth } from "./axios";

export default async function getAudioDetails(audioId: string | number) {
  try {
    const res = await axiosAuth.get(`api/audio/${audioId}`);

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error("Failed to load albums details:", error);
    throw error;
  }
}
