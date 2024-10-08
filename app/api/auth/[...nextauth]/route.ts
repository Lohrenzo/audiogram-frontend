import axioss from "@/app/lib/axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_ACCESS_TOKEN_LIFETIME = 60 * 60; // 60 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days
const UPDATE_LIFETIME = 50 * 60; // 50 minutes

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: BACKEND_ACCESS_TOKEN_LIFETIME,
    // maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    updateAge: UPDATE_LIFETIME,
  },

  pages: {
    signIn: "/login",
    newUser: "/register",
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {},
        password: {},
      },

      // The data returned from this function is passed forward as the
      // `user` variable to the signIn() and jwt() callback
      async authorize(credentials, req) {
        try {
          let response;

          // Login process
          const loginData = {
            username: credentials?.username,
            password: credentials?.password,
          };

          response = await fetch(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}auth/login/`,
            {
              method: "POST",
              body: JSON.stringify(loginData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Invalid response status!");
          }

          const user = await response.json();

          if (user?.access) {
            return {
              ...user,
              expires: getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME,
            };
          } else return null;
        } catch (error) {
          console.error("Authorization error!", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {},

    async jwt({ user, token }) {
      // Initial sign-in: store user data and tokens in JWT
      if (user) {
        token = {
          id: user.id as number, // Explicitly cast to number
          username: user.username as string,
          email: user.email as string,
          first_name: user.first_name as string,
          last_name: user.last_name as string | null,
          is_artist: user.is_artist as boolean,
          bio: user.bio as string | null,
          dob: user.dob as string,
          image: user.image as string | null,
          access: user.access as string,
          refresh: user.refresh as string,
          expires: user.expires,
        };
        return token;
      }

      // if (token.expires) {
      if (getCurrentEpochTime() > (token.expires as number)) {
        try {
          const response = await axioss.post("auth/token/refresh", {
            refresh: token.refresh,
          });

          console.log("Refresh token in route.ts: ", token.refresh);
          if (response.status === 200 || response.status === 201) {
            const { access, access_expiration } = response.data;
            token.access = access;
            token.expires =
              Math.floor(new Date(access_expiration).getTime() / 1000) |
              (getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME);

            console.log("new access: ", token.access);
            console.log("access expiration: ", access_expiration);
            console.log("access expires: ", token.expiresAt);
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (error) {
          console.error("Refresh token error!", error);
          token.error = "RefreshTokenError";
        }
      }
      // }

      return token;
    },

    session({ session, token }) {
      // Pass token data to the session object
      session.user = {
        id: token.id as number, // Explicitly cast to number
        username: token.username as string,
        email: token.email as string,
        first_name: token.first_name as string,
        last_name: token.last_name as string | null,
        is_artist: token.is_artist as boolean,
        bio: token.bio as string | null,
        dob: token.dob as string,
        image: token.image as string | null,
      };
      session.access = token.access as string;
      session.refresh = token.refresh as string;
      session.expires = token.expiresAt as number;

      return session;
    },
  },

  // Optionally, add secret if required
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
