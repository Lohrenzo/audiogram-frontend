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

    // Attempt to register
    const response = await signIn("credentials", {
      redirect: false,
      username: formData.get("username"),
      email: formData.get("email"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      password1: formData.get("password1"),
      password2: formData.get("password2"),
      is_artist: formData.get("is_artist"),
      dob: formData.get("dob"),
      bio: formData.get("bio"),
      register: true, // This flag indicates registration instead of login
    });

    setLoading(false);

    if (response?.error) {
      // Handle registration error (e.g., show a toast notification)
      console.error("Registration failed:", response.error);
    } else {
      // Registration successful, handle accordingly
      console.log("Registration successful:", response);
      // Redirect or do something else

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
      onSubmit={ handleSubmit }
    >
      <input
        className="text-black p-2"
        type="email"
        name="email"
        placeholder="Email Address"
        required
      />
      <br />
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
        type="text"
        name="first_name"
        placeholder="First Name"
        required
      />
      <br />
      <input
        className="text-black p-2"
        type="text"
        name="last_name"
        placeholder="Last Name"
      />
      <br />
      <input
        className="text-black p-2"
        type="password"
        name="password1"
        placeholder="Password"
        required
      />
      <br />
      <input
        className="text-black p-2"
        type="password"
        name="password2"
        placeholder="Confirm Password"
        required
      />
      <br />
      <textarea
        className="text-black p-2"
        placeholder="Bio"
        name="bio"
        id="bio"
      ></textarea>
      <br />
      <div className="flex flex-row gap-x-4">
        <label htmlFor="is_artist">Are you a music artist?:</label>
        <input
          className="text-black"
          type="checkbox"
          name="is_artist"
          id="is_artist"
        />
      </div>
      <br />
      <label htmlFor="dob">Date of Birth:</label>
      <input className="text-black p-1" type="date" name="dob" id="dob" />
      <br />
      <SubmitButton content="Signup" loading={ loading } />
    </form>
  );
}
