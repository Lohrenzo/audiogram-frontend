"use client";

import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col items-center justify-center">
      <p className="text-center text-red-700">You are not authorized to view this page!!</p>
      <Link href="/audio"
        className="pl-2 duration-150 transition-all ease-in-out hover:underline capitalize text-gray-400 font-bold"
      >
        Home
      </Link>
    </main>
  );
}
