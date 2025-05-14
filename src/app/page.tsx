
import { SignedIn, SignedOut, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <div>
      <SignedOut>
        <SignUpButton>
          <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold'>
             Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <UserButton/>
      <SignedIn>
        <SignOutButton>
          <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-bold'>
            Sign Out
          </button>
        </SignOutButton>
      </SignedIn>

    </div>
  )
}

export default Home