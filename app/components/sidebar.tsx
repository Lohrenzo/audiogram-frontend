"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

// Icons
import {
  BiSolidDoorOpen,
  BiSolidAlbum,
  BiSolidPlaylist,
  BiArrowToTop,
  BiAbacus,
} from "react-icons/bi";
import {
  IoMdSettings,
  IoIosPerson,
  IoIosMusicalNotes,
  IoIosAnalytics,
} from "react-icons/io";
import { IoHeadset, IoCloseCircle } from "react-icons/io5";
import { MdExplore, MdSpaceDashboard } from "react-icons/md";
import { FaCaretRight, FaAnglesDown } from "react-icons/fa6";
import { RiDashboard3Fill } from "react-icons/ri";

// import Search from "./search";
import Image from "next/image";
import logo from "../../public/img/wave.png";
import { useEffect, useState } from "react";

// zustand
import { useIsSidebarOpenStore } from "../store/store";
import TransitionLink from "./transitionLink";

export default function Sidebar() {
  const { data: session } = useSession();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadPopUp, setUploadPopUp] = useState(false);
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen, openSidebar, closeSidebar } =
    useIsSidebarOpenStore();

  // function openSidebar() {
  //   setIsSidebarOpen(true);
  // }

  // function closeSidebar() {
  //   setIsSidebarOpen(false);
  // }

  if (session) {
    if (pathname === "/" || pathname === "/login" || pathname === "/register") {
      return null;
    } else {
      return (
        <section
          className={ `${!isSidebarOpen ? "w-[9vw]" : "w-[20vw]"
            } p-2 min-w-[7.4rem] max-w-[22vw] overflow-y-hidden overflow-x-hidden transition-all ease-in-out duration-300 z-10 h-[100vh] flex sm:flex md:flex flex-row items-center gap-0 justify-start text-gray-400` }
        >
          <div
            className={ `relative sidebar rounded-lg w-full h-full overflow-x-hidden overflow-y-auto flex flex-col gap-y-6 items-start justify-start text-sm border border-slate-800 shadow-[#33305daa] bg-black/25 backdrop-blur-lg p-4` }
          >
            <div className="flex flex-row items-center justify-between w-full">
              <TransitionLink
                href="/audio"
                className="flex flex-row items-center gap-x-2"
              >
                <div className="bg-[#476687e9] rounded-full p-2 md:w-10 md:h-10 h-6 w-6">
                  <Image
                    src={ logo }
                    alt="Audiogram Logo"
                    className="object-cover"
                  />
                </div>
                { isSidebarOpen && (
                  <h1 className="md:text-xl text-base text-gray-400 font-bold drop-shadow">
                    AudioGram
                  </h1>
                ) }
              </TransitionLink>
            </div>
            {/* {isSidebarOpen && <Search />} */ }
            {/* <div className="border-t pt-2 border-gray-700 w-full *:mb-1">
              <div className="py-3 px-2 flex flex-row items-center justify-start text-left gap-x-2 hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white">
                <IoIosMusicalNotes size={ 25 } />
                { isSidebarOpen && <p className="text-lg">Liked Songs</p> }
              </div>
              <div className="py-3 px-2 flex flex-row items-center justify-start text-left gap-x-2 hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white">
                <IoIosPerson size={ 25 } />
                { isSidebarOpen && <p className="text-lg">Artists</p> }
              </div>
              <div className="py-3 px-2 flex flex-row items-center justify-start text-left gap-x-2 hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white">
                <BiSolidAlbum size={ 25 } />
                { isSidebarOpen && <p className="text-lg">Albums</p> }
              </div>
            </div> */}
            <div className="border-t pt-2 border-gray-700 w-full">
              { session.user?.is_artist && (
                <>
                  <button
                    onClick={ () => setUploadPopUp(true) }
                    className="py-3 px-2 flex flex-row items-center justify-start text-left gap-x-2 hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white"
                  >
                    <BiArrowToTop size={ 25 } />
                    { isSidebarOpen && <p className="text-lg">Upload</p> }
                  </button>
                  <button className="hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white">
                    <TransitionLink
                      className="py-3 px-2 flex flex-row flex-nowrap items-center justify-start text-left gap-x-2"
                      href="/dashboard"
                    >
                      <MdSpaceDashboard size={ 25 } />
                      { isSidebarOpen && <p className="text-lg">Dashboard</p> }
                    </TransitionLink>
                  </button>
                </>
              ) }

              <button className="hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white">
                <TransitionLink
                  className="py-3 px-2 flex flex-row flex-nowrap items-center justify-start text-left gap-x-2"
                  href="/settings"
                >
                  <IoMdSettings size={ 25 } />
                  { isSidebarOpen && <p className="text-lg">Settings</p> }
                </TransitionLink>
              </button>

              <button
                type="submit"
                onClick={ () => signOut() }
                className="absolute bottom-1 py-3 px-2 flex flex-row items-center justify-start text-left gap-x-2 hover:cursor-pointer duration-200 transition-all hover:scale-110 text-red-700"
              >
                <BiSolidDoorOpen className="" size={ 25 } />
                { isSidebarOpen && <p className="text-lg">Log Out</p> }
              </button>
            </div>
          </div>
          <div
            onClick={ isSidebarOpen ? closeSidebar : openSidebar }
            className={ `sidebar-control ${isSidebarOpen && "rotate-180"
              } flex items-center justify-center hover:scale-150 cursor-pointer text-[2rem] transition-all duration-200 text-[#476687df] hover:text-[#476687]` }
          >
            <FaCaretRight />
          </div>

          { uploadPopUp && (
            <section className="absolute top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur z-30">
              <div className="relative flex flex-col gap-7 h-[50%] items-center justify-center">
                <div className="mb-8 flex flex-col gap-y-3 items-center text-white">
                  <h2 className="font-extrabold">Choose What To Upload</h2>
                  <FaAnglesDown />
                </div>
                <button
                  className="bg-transparent absolute right-4 top-4 hover:scale-110 transition-all duration-200 ease-in-out"
                  onClick={ () => setUploadPopUp(false) }
                >
                  <IoCloseCircle className="" size={ 40 } />
                </button>
                <div className="flex flex-row gap-3 items-center justify-center">
                  <TransitionLink
                    onClick={ () => setUploadPopUp(false) }
                    href="/upload/album"
                    className="border border-blue-400 rounded-lg p-4 hover:bg-blue-400 hover:text-white text-blue-400 duration-200 ease-in-out transition-all hover:scale-110"
                  >
                    Album
                  </TransitionLink>
                  <TransitionLink
                    onClick={ () => setUploadPopUp(false) }
                    href="/upload/single"
                    className="border border-violet-500 rounded-lg p-4 hover:bg-violet-500 hover:text-white text-violet-500 duration-200 ease-in-out transition-all hover:scale-110"
                  >
                    Single
                  </TransitionLink>
                </div>
              </div>
            </section>
          ) }
        </section>
      );
    }
  }
}
// }
