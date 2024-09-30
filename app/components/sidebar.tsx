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
import { SiDiscogs } from "react-icons/si";
import { IoPersonCircle, IoCloseCircle, IoMenu } from "react-icons/io5";
import { MdExplore, MdSpaceDashboard } from "react-icons/md";
import { FaCaretRight, FaAnglesDown } from "react-icons/fa6";
import { RiDashboard3Fill } from "react-icons/ri";

import Image from "next/image";
import logo from "../../public/img/wave.png";
import { useState } from "react";

// zustand
import { useIsSidebarOpenStore } from "../store/store";

import TransitionLink from "./transitionLink";

export default function Sidebar() {
  const { data: session } = useSession();
  const [uploadPopUp, setUploadPopUp] = useState(false);
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen, openSidebar, closeSidebar } =
    useIsSidebarOpenStore();

  if (session) {
    if (pathname === "/login" || pathname === "/register") {
      return null;
    } else {
      return (
        <>
          <section
            // className={ `${!isSidebarOpen ? "lg:w-[9vw] md:w-[8vw] w-[5vw] md:inline-block hidden translate-x-[-40vw]" : "lg:w-[20vw] md:w-[20vw] w-[20vw] translate-x-0"
            className={ `${!isSidebarOpen ? "md:left-[-25rem] left-[-18rem]" : "left-0"
              } absolute bottom-0 md:w-[25vw] sm:w-[15vw] w-[40vw] p-2 overflow-y-hidden overflow-x-hidden transition-all ease-in-out duration-300 z-20 h-[95vh] flex sm:flex md:flex flex-row items-center gap-0 justify-start text-gray-400` }
          // } relative p-2 min-w-[7.4rem] lg:max-w-[22vw] md:max-w-[25vw] max-w-[30vw] overflow-y-hidden overflow-x-hidden transition-all ease-in-out duration-300 z-10 h-[100vh] flex sm:flex md:flex flex-row items-center gap-0 justify-start text-gray-400` }
          >
            <div
              className={ `sidebar rounded-lg w-full h-full overflow-x-hidden overflow-y-auto flex flex-col gap-y-6 items-start justify-start text-sm border border-slate-800 shadow-[#33305daa] bg-black/85 backdrop-blur-lg sm:p-4 p-2` }
            >
              <div className="flex flex-row items-center justify-between w-full">
                <TransitionLink
                  href="/"
                  className="flex flex-row items-center justify-start sm:gap-x-2 gap-x-1"
                >
                  <div className="bg-[#476687e9] rounded-full lg:p-2 p-1 lg:w-10 lg:h-10 md:w-7 md:h-7 h-6 w-6">
                    <Image
                      src={ logo }
                      alt="Audiogram Logo"
                      className="object-cover"
                    />
                  </div>
                  { isSidebarOpen && (
                    <h1 className="md:text-xl sm:text-lg text-sm text-gray-400 font-bold drop-shadow">
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
              <div className="border-t pt-2 grid grid-cols-1 border-gray-700 w-full">
                { session.user?.is_artist && (
                  <>
                    <button
                      onClick={ () => setUploadPopUp(true) }
                      className="py-3 px-2 flex flex-row items-center justify-start text-left gap-x-2 hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white"
                    >
                      <BiArrowToTop className="md:text-lg sm:text-base text-sm" />
                      { isSidebarOpen && <p className="md:text-lg sm:text-base text-sm">Upload</p> }
                    </button>
                    <button className="hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white">
                      <TransitionLink
                        className="py-3 px-2 flex flex-row flex-nowrap items-center justify-start text-left gap-x-2"
                        href="/dashboard"
                      >
                        <MdSpaceDashboard className="md:text-lg sm:text-base text-sm" />
                        { isSidebarOpen && <p className="md:text-lg sm:text-base text-sm ">Dashboard</p> }
                      </TransitionLink>
                    </button>
                  </>
                ) }

                <button className="hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white">
                  <TransitionLink
                    className="py-3 px-2 flex flex-row flex-nowrap items-center justify-start text-left gap-x-2"
                    href="/profile"
                  >
                    <IoPersonCircle className="md:text-lg sm:text-base text-sm" />
                    { isSidebarOpen && <p className="md:text-lg sm:text-base text-sm capitalize">{ session.user.username }</p> }
                  </TransitionLink>
                </button>

                <button
                  type="submit"
                  onClick={ () => signOut() }
                  className="absolute md:bottom-4 bottom-16 py-3 px-2 flex flex-row items-center justify-start text-left gap-x-2 hover:cursor-pointer duration-200 transition-all hover:scale-110 text-red-700"
                >
                  <BiSolidDoorOpen className="md:text-lg sm:text-base text-sm " />
                  { isSidebarOpen && <p className="md:text-lg sm:text-base text-sm">Log Out</p> }
                </button>
              </div>

              <div className="border-t pt-2 grid grid-cols-1 border-gray-700 w-full">
                <button className="hover:cursor-pointer duration-200 transition-all hover:scale-110 hover:text-white">
                  <TransitionLink
                    className="py-3 px-2 flex flex-row flex-nowrap items-center justify-start text-left gap-x-2"
                    href="/playlist"
                  >
                    <SiDiscogs className="md:text-lg sm:text-base text-sm" />
                    { isSidebarOpen && <p className="md:text-lg sm:text-base text-sm capitalize">Playlists</p> }
                  </TransitionLink>
                </button>

              </div>
            </div>

            {/* <div
              onClick={ isSidebarOpen ? closeSidebar : openSidebar }
              className={ `sidebar-control ${isSidebarOpen && "rotate-180"
              } z-50 left-0 top-1/2 inset-y-1/2 flex items-center justify-center hover:scale-150 cursor-pointer text-[2rem] transition-all duration-200 text-[#476687df] hover:text-[#476687]` }
              >
              <FaCaretRight />
              </div> */}
          </section>

          { uploadPopUp && (
            <section className="absolute top-0 left-0 right-0 w-screen h-screen bg-black/80 backdrop-blur z-[100]">
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
        </>
      );
    }
  }
}
// }
