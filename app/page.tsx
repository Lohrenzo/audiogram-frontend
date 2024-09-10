import Link from "next/link";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default async function Home() {
  return (
    <main className="place-items-center grid h-screen w-screen overflow-x-hidden">
      <div className="grid grid-cols-1 place-items-center w-[80vh] p-2">
        <h1 className="mb-2 font-bold text-lg">Hello and Welcome</h1>
        <p className="font-bold mb-7 leading-snug tracking-wider font-sans uppercase text-3xl">
          Discover and share <br /> your music with the <br /> world
        </p>
        <div className="flex items-center justify-between gap-4 text-sm">
          {/* <Link
            className="flex flex-row place-items-center flex-nowrap gap-x-3 bg-[#080810] shadow-inner shadow-[#45437086] text-[#ffffff] hover:text-[#9393d9] hover:scale-105 duration-300 transition-all p-4 rounded-lg"
            href="/dashboard"
          >
            <FaArrowLeftLong /> Share Your Music
          </Link> */}
          <Link
            className="flex flex-row place-items-center flex-nowrap gap-x-3 bg-[#080810] shadow-inner shadow-[#45437086] text-[#ffffff] hover:text-[#9393d9] hover:scale-105 duration-300 transition-all p-4 rounded-lg"
            href="/dashboard"
          >
            Get Started <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </main>
  );
}
