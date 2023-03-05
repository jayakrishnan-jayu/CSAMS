import { FacultyContext } from "@/components/layout/context/facultycontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useContext } from "react";

export default function MyPage() { 
  const { facultyData } = useContext(FacultyContext);
  console.log("facultydata", facultyData)
  return (
    <div>Hello {facultyData?.faculty?.user?.username}</div>
  )
}

export const getServerSideProps = withPageAuthRequired();