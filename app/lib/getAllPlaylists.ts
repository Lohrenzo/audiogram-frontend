import { axiosAuth } from "./axios";

export default async function getAllPlaylists() {
  try {
    const res = await axiosAuth.get("api/playlist");

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to fetch playlists");
    }

    const data = await res.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error("Failed to load the playlists:", error);
    throw error;
  }
}