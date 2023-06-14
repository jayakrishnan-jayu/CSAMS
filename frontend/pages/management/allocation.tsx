import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useContext } from "react";
import AllocationManagement from "@/components/allocationManagement/allocationManagement";


export default function Allocation() { 
  const { metaData } = useContext(MetaDataContext);
  
  if (metaData?.metadata?.faculty === undefined) return <div>Internal Error, faculty data not found</div>
  if (!metaData?.metadata?.user?.isStaff) return <div>You are not authorization to see this page</div>
  return <AllocationManagement metadata={metaData?.metadata}/>
}

export const getServerSideProps = withPageAuthRequired();