import { FacultyContext } from "@/components/layout/context/facultycontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useContext } from "react";
import FacultyTable from "@/components/facultyTable";


export default function MyPage() { 
  const { facultyData } = useContext(FacultyContext);
  
  if (facultyData === undefined) return <div>Internal Error, faculty data not found</div>
  if (!facultyData.faculty?.user?.isStaff) return <div>You are not authorization to see this page</div>
  return <FacultyTable/>
}

export const getServerSideProps = withPageAuthRequired();