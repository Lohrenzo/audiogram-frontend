import axios from "axios";
import { getSession, signIn } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL;

const axioss = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios request interceptor to attach the Authorization header
axiosAuth.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.access) {
      const isTokenExpired = new Date() >= new Date(session.expires);

      if (isTokenExpired) {
        // Refresh the token
        try {
          const response = await axios.post("auth/token/refresh", {
            refresh: session.refresh,
          });
          console.log("axios session", session);

          if (response.status === 200 || response.status === 201) {
            const { access, access_expiration } = response.data;

            // Update the session with the new access token
            session.access = access;
            session.expires = new Date(access_expiration).toISOString();
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (error) {
          console.error("Error refreshing token", error);
          await signIn();
          throw error;
        }
      }

      // Attach the updated token to the request
      config.headers.Authorization = `Bearer ${session.access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axioss;
export { axiosAuth };
