"use client";

import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center">
      <p className="text-center">You are not authorized to view this page!!</p>
      <Link href="/" className="font-bold hover:underline">
        Home
      </Link>
    </main>
  );
}
