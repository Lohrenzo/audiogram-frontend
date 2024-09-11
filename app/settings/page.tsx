"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='p-2'>
      <form autoComplete="off" className='overflow-y-auto overflow-x-hidden grid grid-cols-2'>
        <h2 className='col-span-2 text-right border-b border-white/30 mt-2 mb-3'>Account</h2>

        <label htmlFor="username">Username:</label>
        <input
          className='disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
          type="text"
          value={ session?.user.username }
          name='username'
          id="username"
          disabled={ !isEditing }
          autoComplete="off"
        />

        <label htmlFor="email">Email:</label>
        <input
          className='disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
          type="email"
          value={ session?.user.email }
          name='email'
          id="email"
          disabled={ !isEditing }
          autoComplete="off"
        />

        <label htmlFor="first_name">First Name:</label>
        <input
          className='disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
          type="text"
          value={ session?.user.first_name }
          name='first_name'
          id="first_name"
          disabled={ !isEditing }
          autoComplete="off"
        />

        <label htmlFor="last_name">Last Name:</label>
        <input
          className='disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
          type="text"
          value={ session?.user?.last_name ?? "" }
          name='last_name'
          id="last_name"
          disabled={ !isEditing }
          autoComplete="off"
        />

        <label htmlFor="dob">Date Of Birth:</label>
        <input
          className='disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
          type="date"
          value={ session?.user.dob }
          name='dob'
          id="dob"
          disabled={ !isEditing }
          autoComplete="off"
        />

        <label htmlFor="bio">Bio:</label>
        <textarea
          className='disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
          value={ session?.user.bio ?? "" }
          name='bio'
          id="bio"
          disabled={ !isEditing }
          autoComplete="off"
          rows={ 5 }
        />

        <label htmlFor="password">Password:</label>
        <input
          className='disabled:cursor-default disabled:opacity-40 active:outline-none focus:outline-none bg-transparent border-b border-slate-800'
          type="password"
          value="********"
          name='password'
          id="password"
          disabled={ !isEditing }
          autoComplete="off"
        />

        <br />
        <h2 className='col-span-2 text-right border-b border-white/30 mb-3'>Appearance</h2>
        <label htmlFor="mode">Dark Mode:</label>
        <input className="switch" name="mode" type="checkbox" />
        {/* <hr className="col-span-2 my-4 opacity-50" /> */ }
      </form>
    </div>
  )
}
