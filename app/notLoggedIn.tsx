"use client";

import Link from "next/link";

export default function NotLoggedIn() {
  return (
    <main className="flex min-h-screen w-screen mx-auto flex-col items-center justify-center">
      <p className="text-center text-red-700">You are not logged in.</p>
      <Link href="/login"
        className="pl-2 duration-150 transition-all ease-in-out hover:underline capitalize text-gray-400 font-bold"
      >
        Login Here
      </Link>
    </main>
  );
}
