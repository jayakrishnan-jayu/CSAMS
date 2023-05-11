import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import PreferenceTable from "@/components/preferenceTable";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useContext } from "react";

export default function MyPage() { 
  const { metaData } = useContext(MetaDataContext);
  return (
    <>
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Preferences</h5>
          <PreferenceTable/>
        </div>
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired();