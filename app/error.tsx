"use client";

import TransitionLink from "./components/transitionLink";

export default function Error() {
  return (
    <div className="w-full grid place-items-center font-bold">
      <p className="text-center text-red-700">Something Went Wrong 😞!!!</p>
      <TransitionLink href="/" className="text-white font-bold hover:underline">
        Home
      </TransitionLink>
    </div>
  );
}
