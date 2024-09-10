"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, useCallback } from "react";
// import getResults from "@/app/lib/getSearchResults";
import { BiSearchAlt } from "react-icons/bi";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // const handleSearchChange = useCallback(
  //   debounce((term: string) => {
  //     setSearchTerm(term);
  //   }, 300),
  //   []
  // );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      setSearchTerm("");
      router.push(`/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form
      className="w-full flex justify-start items-center text-sm"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-black placeholder:text-black bg-slate-400 border border-[#001254] focus:outline-none focus:border-[#1d2f71] active:border-white/20 p-1 h-7 w-full rounded-l-md"
        placeholder="Search"
      />
      <button
        type="submit"
        className="px-1 h-7 rounded-r-md bg-slate-300/70 ml-1 text-black text-lg font-bold fles items-center justify-center"
      >
        <BiSearchAlt size={15} />
      </button>
    </form>
  );
}
