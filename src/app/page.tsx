import { SignOutButton, SignUpButton } from "@clerk/nextjs"


const Home = () => {
  return (
    <div>
     Home Page

     <SignUpButton/>

     <SignOutButton/>

    </div>
  )
}

export default Home