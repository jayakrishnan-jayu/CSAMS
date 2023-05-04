import BatchManageTable from "@/components/batchManageTable";
import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useContext } from "react";

export default function MyPage() { 
  const { metaData } = useContext(MetaDataContext);
  
  return (
    <BatchManageTable/>
  )
}

export const getServerSideProps = withPageAuthRequired();