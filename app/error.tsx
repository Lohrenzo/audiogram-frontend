"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="w-full grid place-items-center font-bold text-red-700">
      <p className="text-center">Something Went Wrong 😞!!!</p>
      <Link href="/" className="font-bold hover:underline">
        Home
      </Link>
    </div>
  );
}
