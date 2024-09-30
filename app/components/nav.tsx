"use client";
import { useSession } from 'next-auth/react';
import { useState } from "react";
import { useIsSidebarOpenStore } from '../store/store';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaFaceGrinStars } from 'react-icons/fa6';
import { usePathname } from "next/navigation";

export default function Nav() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const { isSidebarOpen, setIsSidebarOpen, openSidebar, closeSidebar } =
        useIsSidebarOpenStore();

    if (session) {
        if (pathname === "/login" || pathname === "/register") {
            return null;
        } else {
            return (
                <div className="sticky bg-black top-0 left-0 w-full h-[5vh] flex items-center justify-between text-center border-b border-slate-800 p-2 mb-2 z-20">
                    { isSidebarOpen
                        ? <IoClose className='cursor-pointer' onClick={ closeSidebar } size={ 30 } />
                        : <IoMenu className='cursor-pointer' onClick={ openSidebar } size={ 30 } />
                    }


                    <h1 className="w-full text-center flex flex-row items-center justify-center gap-3">
                        Welcome{ `, ${session?.user?.username || ""}` } <FaFaceGrinStars />
                    </h1>
                </div>

            )
        }
    }
}
