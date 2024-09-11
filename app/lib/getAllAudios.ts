import { axiosAuth } from "./axios";

export default async function getAllAudios(jwt: string | undefined) {
  try {
    const res = await axiosAuth.get("api/audio");

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.data;
    console.log(data);

    return data;
  } catch (error) {
    const res = await axiosAuth.get("api/audio");

    if (res.status !== 200 && res.status !== 201) {
      // throw new Error("Failed to fetch data");
      console.error("Failed to load audios:", error);
      throw error;
    }

    const data = await res.data;
    console.log(data);

    return data;
  }
}
