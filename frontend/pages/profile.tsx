import { NextPage } from "next"
import { useUser } from '@auth0/nextjs-auth0/client';

const Profile: NextPage = () => {
  const { user, error, isLoading } = useUser();
  console.log(user, error, isLoading)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (user) return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/logout">Logout</a>
      </div>
  )
  return (<div>
    <h1>Not Logged IN</h1>
    <a href="/api/auth/login">Login</a>
  </div>)
}

export default Profile