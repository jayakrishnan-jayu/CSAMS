import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useContext } from "react";
import { IdentifierInput } from "@/graphql/generated/graphql";
import ReportView from "@/components/report/ReportView";

export interface ReportInput {
  identifier: IdentifierInput
  format: 'xlsx' | 'pdf'
  type: 'courseBook'| 'facultyWorkload'
}

export default function Report() {
  const { metaData } = useContext(MetaDataContext);

  if (metaData?.metadata?.faculty === undefined) return <div>Internal Error, faculty data not found</div>

  return <ReportView/>
}


export const getServerSideProps = withPageAuthRequired();
