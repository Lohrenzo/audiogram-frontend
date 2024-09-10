import { axiosAuth } from "./axios";

export default async function getUserAudios(jwt: string | undefined) {
  try {
    const res = await axiosAuth.get("api/user/audios");

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error("Failed to load this user's audios:", error);
    throw error;
  }
}
