"use client";
import { FormEvent, useState } from "react";
import SubmitButton from "../components/submitButton";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Form() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

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

    setLoading(false);

    if (result?.error) {
      // Handle sign-in error (e.g., show a toast notification)
      console.error("Login failed:", result.error);
    } else {
      // Login successful, handle accordingly
      console.log("Login successful:", result);

      // Redirect or do something else
      if (session?.user?.is_artist) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/audios";
      }
    }
  };

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit}
    >
      <input
        className="text-black p-2"
        type="text"
        name="username"
        placeholder="Username"
        required
      />
      <br />
      <input
        className="text-black p-2"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <br />
      <SubmitButton content="Login" loading={loading} />
    </form>
  );
}
