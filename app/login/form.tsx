"use client";
import { FormEvent, useState } from "react";
import SubmitButton from "../components/submitButton";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

import { toast } from 'sonner';

// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa6";

// import AlertPrompt from "../components/alertPrompt";

export default function Form() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password")
  // const [error, setError] = useState(false)

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    // Attempt to sign in
    const result = await signIn("credentials", {
      redirect: false, // Prevent redirect so we can handle the response
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (result?.error) {
      // Handle sign-in error (e.g., show a toast notification)
      // setError(true);
      setLoading(false);
      toast.error("Login Failed!!");
      console.error("Login failed:", result.error);
    } else {
      // Login successful, handle accordingly
      toast.success("Login Successful!!");
      console.log("Login successful:", result);

      // Redirect or do something else
      if (session?.user?.is_artist) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
      // setLoading(false);
    }

  };

  return (
    <>
      {/* { error && <AlertPrompt setError={ setError } message="Login Failed" /> } */ }
      <form
        className="grid grid-cols-1"
        onSubmit={ handleSubmit }
      >
        <input
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <br />
        <div className="w-full relative">
          <input
            className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
            type={ passwordType }
            name="password"
            placeholder="Password"
            required
          />
          <div onClick={ togglePasswordType } className="cursor-pointer absolute top-0 bottom-0 right-0 p-2 grid place-items-center bg-white text-black">
            { passwordType === "password" ? <FaEye /> : <FaEyeSlash /> }
          </div>
        </div>
        <br />
        <SubmitButton content="Login" loading={ loading } />
      </form>
    </>
  );
}
