import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Form from "./form";
import Link from "next/link";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await getServerSession();

  if (session) {
    const redirectUrl = searchParams.callbackUrl || "/audios";
    redirect(redirectUrl);
  }

  return (
    <section className="flex flex-col items-center justify-between gap-2 shadow-md bg-black/20 backdrop-blur-md py-4 overflow-y-auto h-screen w-screen">
      <div className="border-slate-800 p-8 rounded w-[75%] sm:w-[60%] md:w-[40%] bg-white/5 backdrop-blur">
        <h1 className="text-center text-lg mb-3">Sign Up</h1>
        <div className="">
          <Form />
        </div>
      </div>
      <p className="my-2">
        Already have an account?
        <Link
          href="/login"
          className="pl-2 duration-150 transition-all ease-in-out hover:underline capitalize text-[#345cb8] font-bold"
        >
          Login now!
        </Link>
      </p>
    </section>
  );
}
