import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useContext } from "react";
import WorkloadTable from "@/components/workloadTable";


export default function Workload() { 
  const { metaData } = useContext(MetaDataContext);
  
  if (metaData?.metadata?.faculty === undefined) return <div>Internal Error, faculty data not found</div>
  if (!metaData?.metadata?.user?.isStaff) return <div>You are not authorization to see this page</div>
  return <WorkloadTable/>
}

export const getServerSideProps = withPageAuthRequired();