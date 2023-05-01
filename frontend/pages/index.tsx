import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import PreferenceTable from "@/components/preferenceTable";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useContext } from "react";

export default function MyPage() { 
  const { metaData } = useContext(MetaDataContext);
  return (
    <>
      <PreferenceTable/>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired();