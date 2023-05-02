import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useContext } from "react";
import SemesterIdentifierSettings from "@/components/semesterIdentifierSettings";
import PreferenceCountSettings from "@/components/preferenceCountSettings";


export default function Config() { 
    const { metaData } = useContext(MetaDataContext);
  
    if (metaData?.metadata?.faculty === undefined) return <div>Internal Error, faculty data not found</div>
    if (!metaData?.metadata?.user?.isStaff) return <div>You are not authorization to see this page</div>
  return (
    <>
      <SemesterIdentifierSettings/>
      <PreferenceCountSettings/>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired();