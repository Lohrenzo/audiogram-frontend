import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string | null;
    is_artist: boolean;
    bio: string | null;
    dob: string;
    image: string | null;
    access: string;
    refresh: string;
    expires: number;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      first_name: string;
      last_name: string | null;
      is_artist: boolean;
      bio: string | null;
      dob: string;
      image: string | null;
    } & DefaultSession["user"];
    access: string;
    refresh: string;
    expires: any;
  }

  interface JWT {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string | null;
    is_artist: boolean;
    bio: string | null;
    dob: string;
    image: string | null;
    access: string;
    refresh: string;
    expires: number;
  }
}

// {
//   "username": "artist1",
//    "password": "complexpassword123"
// }
