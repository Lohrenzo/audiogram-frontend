"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SubmitButton from "../components/submitButton";
import { toast } from "sonner";
import Unauthorized from "../unauthorized";
import NotLoggedIn from "../notLoggedIn";

export default function ProfilePage() {
  const { data: session, update, status } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  // const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [jwt, setJwt] = useState(session?.access);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    dob: "",
    bio: "",
    image: "",
  })
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    bio: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      setJwt(session?.access);
    }
  }, [status, session]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}auth/user/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Failed To Get User Details!!");
        throw new Error(errorData?.detail || "Failed To Get User Details.");
      }

      const data = await response.json()
      setUserDetails({
        first_name: data.first_name,
        last_name: data.last_name,
        dob: data.dob,
        bio: data.bio,
        username: data.username,
        email: data.email,
        image: data.image,

      });
      // setFormValues({
      //   first_name: userDetails?.first_name,
      //   last_name: userDetails?.last_name,
      //   dob: userDetails?.dob,
      //   bio: userDetails?.bio,
      // })

    } catch (error) {
      console.error("Failed To Get User Details:", error);
      toast.error("Failed To Get User Details!!");
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])

  useEffect(() => {
    setFormValues({
      first_name: userDetails?.first_name,
      last_name: userDetails?.last_name,
      dob: userDetails?.dob,
      bio: userDetails?.bio,
    })
  }, [userDetails])


  // Handle form inputs dynamically
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleProfileUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);

    if (isUpdating) {
      const formData = new FormData(e.currentTarget);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}auth/user/update/`,
          {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          toast.error("Profile Update Failed!!");
          throw new Error(errorData?.detail || "Profile Update Failed.");
        }

        const updatedUserData = await response.json();
        console.log("User update successful:", { updatedUserData });

        await update({
          user: {
            ...session?.user,
            first_name: updatedUserData.first_name,
            last_name: updatedUserData.last_name,
            bio: updatedUserData.bio,
            dob: updatedUserData.dob,
            // image: updatedUserData.image,
          },
        });

        fetchUserDetails();

        // setFormValues({
        //   first_name: updatedUserData.first_name,
        //   last_name: updatedUserData.last_name,
        //   bio: updatedUserData.bio,
        //   dob: updatedUserData.dob,
        // });

        toast.success("Profile Updated Successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Profile Update Failed!!");
      } finally {
        setIsUpdating(false);
        setLoading(false);
      }
    } else {
      setIsUpdating(true);
      setLoading(false);
    }
  }

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordLoading(true);

    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("old_password") as string;
    const newPassword = formData.get("new_password") as string;

    // Construct the request payload
    const payload = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_BACKEND_URL}auth/user/change-password/`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Password Change Failed!!");
        throw new Error(errorData?.detail || "Password Change Failed.");
      }

      e.currentTarget.reset();
      toast.success("Password Changed Successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Password Change Failed!!");
    } finally {
      setPasswordLoading(false);
    }
  }

  if (session) {
    if (session?.user) {
      return (
        <div className='p-2 h-[80vh] overflow-x-hidden overflow-y-auto flex items-center justify-center'>
          <div className='sm:p-1 p-2 md:w-[60%] sm:w-[80%] w-[100%] h-[80vh]'>
            <form
              onSubmit={ handleProfileUpdate }
              autoComplete="off"
              className='overflow-y-auto overflow-x-hidden grid profile-form'
            >
              <h2 className='col-span-2 text-right border-b border-white/30 mt-2 mb-3'>
                Account
              </h2>

              <label className="sm:text-base text-sm py-2 mb-2" htmlFor="username">Username:</label>
              <input
                className='sm:text-base text-sm p-2 mb-2 disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
                type="text"
                value={ userDetails.username }
                name='username'
                id="username"
                disabled={ true } // Keep username disabled
                autoComplete="off"
              />

              <label className="sm:text-base text-sm py-2 mb-2" htmlFor="email">Email:</label>
              <input
                className='sm:text-base text-sm p-2 mb-2 disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
                type="email"
                value={ userDetails.email }
                name='email'
                id="email"
                disabled={ true } // Keep email disabled
                autoComplete="off"
              />

              <label className="sm:text-base text-sm py-2 mb-2" htmlFor="first_name">First Name:</label>
              <input
                className='sm:text-base text-sm p-2 mb-2 disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
                type="text"
                value={ formValues?.first_name }
                onChange={ handleInputChange }
                name='first_name'
                id="first_name"
                disabled={ !isUpdating }
                autoComplete="off"
              />

              <label className="sm:text-base text-sm py-2 mb-2" htmlFor="last_name">Last Name:</label>
              <input
                className='sm:text-base text-sm p-2 mb-2 disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
                type="text"
                value={ formValues.last_name ?? "" }
                onChange={ handleInputChange }
                name='last_name'
                id="last_name"
                disabled={ !isUpdating }
                autoComplete="off"
              />

              <label className="sm:text-base text-sm py-2 mb-2" htmlFor="dob">Date Of Birth:</label>
              <input
                className='sm:text-base text-sm p-2 mb-2 disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
                type="date"
                value={ formValues.dob }
                onChange={ handleInputChange }
                name='dob'
                id="dob"
                disabled={ !isUpdating }
                autoComplete="off"
              />

              <label className="sm:text-base text-sm py-2 mb-2" htmlFor="bio">Bio:</label>
              <textarea
                className='sm:text-base text-sm p-2 disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
                value={ formValues.bio ?? "" }
                onChange={ handleInputChange }
                name='bio'
                id="bio"
                disabled={ !isUpdating }
                autoComplete="off"
                rows={ 5 }
              />

              {/* <br /> */ }
              <div className="col-span-2 mx-auto py-4 px-3 md:w-[40%] sm:w-[50%] w-[60%]">
                <SubmitButton content={ isUpdating ? "Submit" : `Edit Profile` } loading={ loading } />
              </div>
            </form>

            <h2 className='col-span-2 text-right border-b border-white/30 mb-3'>Password</h2>
            <form onSubmit={ handlePasswordChange } className="grid profile-form">
              <label className="sm:text-base text-sm py-2 mb-2" htmlFor="old_password">Old Password:</label>
              <input
                required
                className='sm:text-base text-sm p-2 mb-2 disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
                type="password"
                placeholder="Type in old password"
                name='old_password'
                id="old_password"
                autoComplete="off"
              />

              <label className="sm:text-base text-sm py-2 mb-2" htmlFor="new_password">New Password:</label>
              <input
                required
                className='sm:text-base text-sm p-2 mb-2 disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
                type="password"
                placeholder="Type in new password"
                name='new_password'
                id="new_password"
                autoComplete="off"
              />

              <div className="col-span-2 mx-auto py-6 px-3 md:w-[40%] sm:w-[50%] w-[60%] ">
                <SubmitButton content="Submit" loading={ passwordLoading } />
              </div>
            </form>

            {/* <h2 className='col-span-2 text-right border-b border-white/30 mb-3'>Appearance</h2>
          <div className="grid grid-cols-2">
            <label htmlFor="mode">Dark Mode:</label>
            <input className="switch" name="mode" type="checkbox" />
          </div> */}
            {/* <hr className="col-span-2 my-4 opacity-50" /> */ }
          </div>
        </div>
      )
    } else return <Unauthorized />
  }
  // else return <NotLoggedIn />;
}
