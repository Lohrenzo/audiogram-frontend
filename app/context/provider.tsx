"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
  session: any;
}

export default function Provider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
