"use client";
import { FormEvent, useState } from "react";
import SubmitButton from "../components/submitButton";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import { toast } from 'sonner';

// import AlertPrompt from "../components/alertPrompt";

export default function Form() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password")
  const [password2Type, setPassword2Type] = useState("password")
  // const [error, setError] = useState(false)

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  const togglePassword2Type = () => {
    if (password2Type === "password") {
      setPassword2Type("text");
    } else {
      setPassword2Type("password");
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Convert the boolean checkbox for 'is_artist' correctly
    if (formData.get('is_artist') === 'on') {
      formData.set('is_artist', 'true');
    } else {
      formData.set('is_artist', 'false');
    }

    // Extract username and password from formData for later use in signIn
    const username = formData.get("username") as string;
    const password = formData.get("password1") as string;

    try {
      // Attempt to register
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}auth/register/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Registration Failed!!");
        throw new Error(errorData?.detail || "Registration failed.");
      }

      const userData = await response.json();
      console.log("Registration successful:", userData);

      // Programmatically sign the user in using the returned tokens
      const signInResponse = await signIn("credentials", {
        redirect: false, // Avoid redirecting at this point
        username,
        password,
      });

      if (signInResponse?.error) {
        // Handle errors during signIn (unlikely, but possible)
        console.error("SignIn failed:", signInResponse.error);
        toast.error("Failed to log in after registration!! Please go to login page.");
        setLoading(false);
      } else {
        // User is now logged in, you can redirect or show a success message
        console.log("Logged in successfully:", signInResponse);
        toast.success("Registration and Login Successful!");

        // Redirect based on user role
        if (session?.user?.is_artist) {
          // if (userData.is_artist) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/";
        }
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Registration Failed!!");
      setLoading(false);
    }
  };

  return (
    <>
      {/* { error && <AlertPrompt setError={ setError } message="Registration Failed" /> } */ }
      <form
        className="grid grid-cols-1"
        onSubmit={ handleSubmit }
      >
        <input
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
          type="email"
          name="email"
          placeholder="Email Address*"
          required
        />
        <br />
        <input
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
          type="text"
          name="username"
          placeholder="Username*"
          required
        />
        <br />
        <input
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
          type="text"
          name="first_name"
          placeholder="First Name*"
          required
        />
        <br />
        <input
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
          type="text"
          name="last_name"
          placeholder="Last Name"
        />
        <br />
        <div className="w-full relative">
          <input
            className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
            type={ passwordType }
            name="password1"
            placeholder="Password*"
            required
          />
          <div onClick={ togglePasswordType } className="cursor-pointer absolute top-0 bottom-0 right-0 p-2 grid place-items-center bg-white text-black">
            { passwordType === "password" ? <FaEye /> : <FaEyeSlash /> }
          </div>
        </div>
        <br />
        <div className="w-full relative">
          <input
            className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
            type={ password2Type }
            name="password2"
            placeholder="Confirm Password*"
            required
          />
          <div onClick={ togglePassword2Type } className="cursor-pointer absolute top-0 bottom-0 right-0 p-2 grid place-items-center bg-white text-black">
            { password2Type === "password" ? <FaEye /> : <FaEyeSlash /> }
          </div>
        </div>
        <br />
        <textarea
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
          placeholder="Bio"
          name="bio"
          id="bio"
        ></textarea>
        <br />
        <label className="text-slate-300" htmlFor="dob">Date of Birth*:</label>
        <input
          className="text-black placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65"
          type="date" name="dob" id="dob"
        />
        <br />
        <label className="text-slate-300" htmlFor="image">Profile Picture: </label>
        <input
          className="cursor-pointer border bg-white placeholder:text-black/80 p-2 focus:outline-none focus:bg-white/65 active:bg-white/65 block w-full text-sm text-slate-500
        file:cursor-pointer file:mr-4 file:py-2 file:px-3
        file: file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-[#345cb8]
        hover:file:bg-violet-100"
          type="file"
          name="image"
          id="image"
        />
        <br />
        <div className="flex flex-row items-center justify-between gap-x-4">
          <label className="text-slate-300" htmlFor="is_artist">Are you a music artist?:</label>
          <input
            className="text-black checked:bg-blue-950"
            type="checkbox"
            name="is_artist"
            id="is_artist"
          />
        </div>
        <br />
        <SubmitButton content="Signup" loading={ loading } />
      </form>
    </>
  );
}
