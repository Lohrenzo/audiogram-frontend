"use client";

import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
// import { resolve } from "path";

interface TransitionLinkProps extends LinkProps {
    children: ReactNode;
    href: string;
    className: string;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function TransitionLink({
    children,
    href,
    className,
    ...props
}: TransitionLinkProps) {
    const router = useRouter()

    const handleTransition = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();

        const mainView = document.getElementById("main-view");

        mainView?.classList.add("page-transition");

        await sleep(500);

        router.push(href);

        await sleep(1100);

        mainView?.classList.remove("page-transition");
    }
    return (
        <Link
            onClick={ handleTransition }
            className={ className } href={ href } { ...props }>{ children }</Link>
    )
}
