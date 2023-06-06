import { NextPage } from "next";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMeQuery } from "@/graphql/generated/graphql";
import { useContext } from "react";
import { MetaDataContext } from "@/components/layout/context/metadatacontext";

const Profile: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const { metaData } = useContext(MetaDataContext);
  const firstName = metaData?.metadata?.user?.firstName;
  const lastName = metaData?.metadata?.user?.lastName;


  // const [result] = useMeQuery();
  // const { fetching, stale, data, operation } = result;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user)
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>
          {firstName} {lastName}
        </h2>
        <p>{user.email}</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  return (
    <div>
      <h1>Not Logged IN</h1>
      <a href="/api/auth/login">Login</a>
    </div>
  );
};

export default Profile;
