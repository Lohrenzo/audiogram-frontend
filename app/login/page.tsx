import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "./form";
import TransitionLink from "../components/transitionLink";

export default async function LoginPage() {
  const session = await getServerSession();
  console.log({ session });

  if (session) {
    redirect("/audios");
  }

  return (
    <section className="flex flex-col items-center justify-center gap-2 py-4 overflow-y-auto h-screen w-screen">
      <div className="border-slate-800 p-8 rounded w-[75%] sm:w-[60%] md:w-[40%] bg-white/5 backdrop-blur">
        <h1 className="text-center text-lg mb-3">Login</h1>
        <div className="">
          <Form />
        </div>
      </div>
      <p className="mt-2">
        Dont have an account?
        <TransitionLink
          href="/register"
          className="pl-2 duration-150 transition-all ease-in-out hover:underline capitalize text-[#345cb8] font-bold"
        >
          Create one now!
        </TransitionLink>
      </p>
    </section>
  );
}
