import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import PreferenceView from "@/components/preference/PreferenceView";

import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useContext } from "react";



export default function FacultyPreferenc () {
  const { metaData } = useContext(MetaDataContext);
  
  if (metaData?.metadata?.faculty === undefined) return <div>Internal Error, faculty data not found</div>

  return <PreferenceView/>
  
};

export const getServerSideProps = withPageAuthRequired();