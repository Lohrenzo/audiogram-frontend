import { axiosAuth } from "./axios";

export default async function getArtistStreamAndRevenue(
  artistId: string | number
) {
  try {
    const res = await axiosAuth.get(
      `rev/stream/artist/${artistId}/calculate-ars`
    );

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error("Failed to load stream and revenue data:", error);
    throw error;
  }
}
