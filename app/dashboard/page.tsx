"use client";

import { useSession } from "next-auth/react";
import { Suspense } from "react";
import Link from "next/link";
import LineChart from "../components/Charts/lineChart";
import DisplayAlbums from "../components/displayAlbums";
import DisplayUserAudios from "./components/displayUserAudios";

// zustand
import { useIsSidebarOpenStore } from "../store/store";

export default function Dashboard() {
  const { data: session } = useSession();
  const { isSidebarOpen } = useIsSidebarOpenStore();

  if (session) {
    if (session?.user?.is_artist) {
      return (
        <main
          className={ `overflow-y-hidden overflow-x-hidden p-2` }
        >
          <div className="grid grid-cols-2 gap-3 h-full place-items-start">
            <div className="grid grid-cols-1 gap-y-6 h-full w-full">
              <DisplayAlbums fetchType="user" />

              <div className="place-self-center w-full h-full border border-slate-800 shadow-[#45437086] text-white bg-black/40 backdrop-blur-lg p-2 rounded-lg">
                <h3 className="mb-1 text-left">Yearly Analytics</h3>
                <LineChart />
              </div>
            </div>

            <DisplayUserAudios />

            {/* <div className="grid grid-cols-1 overflow-y-hidden w-full h-screen">
              <div></div>
              <div className="p-2 shadow-inner shadow-[#45437086] bg-black/30 backdrop-blur-lg rounded-lg mb-4 w-full">
                <h1>Your Songs</h1>
                <p className="mb-2 bg-slate-600 rounded-md p-px"></p>

                <div className="grid grid-cols-4 items-center place-items-start w-full gap-1">
                  <p className="text-left col-span-2 w-full">Title</p>
                  <p>Published</p>
                  <p></p>
                </div>
                <div className="*:border-b *:border-[#45437086] *:pb-1 overflow-x-hidden overflow-y-auto grid grid-cols-1 gap-y-2 place-items-start p-1 w-full h-fit max-h-[87vh]">
                  <div className="grid grid-cols-4 items-center place-items-start w-full gap-1">
                    <div className="col-span-2 flex gap-x-3 flex-nowrap flex-row items-center justify-start w-full">
                      <img
                        src="https://placehold.co/400"
                        className=" object-cover object-center rounded-md size-[50px]"
                        alt={`Album cover`}
                      />
                      <p>Song Title</p>
                    </div>
                    <p className="">23/02/2024</p>
                    <div className="grid grid-cols-2 place-items-center gap-x-3 text-sm">
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        edit
                      </Link>
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        delete
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center place-items-start w-full gap-1">
                    <div className="col-span-2 flex gap-x-3 flex-nowrap flex-row items-center justify-start w-full">
                      <img
                        src="https://placehold.co/400"
                        className=" object-cover object-center rounded-md size-[50px]"
                        alt={`Album cover`}
                      />
                      <p>Song Title Two</p>
                    </div>
                    <p>23/02/2024</p>
                    <div className="grid grid-cols-2 place-items-center gap-x-3 text-sm">
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        edit
                      </Link>
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        delete
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center place-items-start w-full gap-1">
                    <div className="col-span-2 flex gap-x-3 flex-nowrap flex-row items-center justify-start w-full">
                      <img
                        src="https://placehold.co/400"
                        className=" object-cover object-center rounded-md size-[50px]"
                        alt={`Album cover`}
                      />
                      <p>Song Title Two</p>
                    </div>
                    <p>23/02/2024</p>
                    <div className="grid grid-cols-2 place-items-center gap-x-3 text-sm">
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        edit
                      </Link>
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        delete
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center place-items-start w-full gap-1">
                    <div className="col-span-2 flex gap-x-3 flex-nowrap flex-row items-center justify-start w-full">
                      <img
                        src="https://placehold.co/400"
                        className=" object-cover object-center rounded-md size-[50px]"
                        alt={`Album cover`}
                      />
                      <p>Song Title Two</p>
                    </div>
                    <p>23/02/2024</p>
                    <div className="grid grid-cols-2 place-items-center gap-x-3 text-sm">
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        edit
                      </Link>
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        delete
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center place-items-start w-full gap-1">
                    <div className="col-span-2 flex gap-x-3 flex-nowrap flex-row items-center justify-start w-full">
                      <img
                        src="https://placehold.co/400"
                        className=" object-cover object-center rounded-md size-[50px]"
                        alt={`Album cover`}
                      />
                      <p>Song Title Two</p>
                    </div>
                    <p>23/02/2024</p>
                    <div className="grid grid-cols-2 place-items-center gap-x-3 text-sm">
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        edit
                      </Link>
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        delete
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center place-items-start w-full gap-1">
                    <div className="col-span-2 flex gap-x-3 flex-nowrap flex-row items-center justify-start w-full">
                      <img
                        src="https://placehold.co/400"
                        className=" object-cover object-center rounded-md size-[50px]"
                        alt={`Album cover`}
                      />
                      <p>Song Title Two</p>
                    </div>
                    <p>23/02/2024</p>
                    <div className="grid grid-cols-2 place-items-center gap-x-3 text-sm">
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        edit
                      </Link>
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        delete
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center place-items-start w-full gap-1">
                    <div className="col-span-2 flex gap-x-3 flex-nowrap flex-row items-center justify-start w-full">
                      <img
                        src="https://placehold.co/400"
                        className=" object-cover object-center rounded-md size-[50px]"
                        alt={`Album cover`}
                      />
                      <p>Song Title Two</p>
                    </div>
                    <p>23/02/2024</p>
                    <div className="grid grid-cols-2 place-items-center gap-x-3 text-sm">
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        edit
                      </Link>
                      <Link
                        href=""
                        className="hover:opacity-45 hover:scale-125 ease-in-out transition-all duration-150"
                      >
                        delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      );
    } else
      return (
        <main className="flex min-h-screen w-screen flex-col items-center justify-center">
          You are not authorized to view this page!!
        </main>
      );
  } else
    return (
      <main className="flex min-h-screen w-screen flex-col items-center justify-center">
        You are not logged in.
      </main>
    );
}
