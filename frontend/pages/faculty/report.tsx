import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useContext } from "react";
import { IdentifierInput, useReportTimePeriodsQuery } from "@/graphql/generated/graphql";
import ReportView from "@/components/report/ReportView";


export type ReportType = 'courseBook' | 'facultyWorkload' | 'allocation'

export interface ReportInput {
  identifier: IdentifierInput
  format: 'xlsx' | 'pdf'
  type: ReportType
}

export default function Report() {
  const { metaData } = useContext(MetaDataContext);

  const [result] = useReportTimePeriodsQuery();
  const {data, fetching, error} = result;

  if (metaData?.metadata?.faculty === undefined) return <div>Internal Error, faculty data not found</div>
  if (fetching) return <div>Loading</div>;
  if (error?.message) return <div>Error: {error?.message}</div>
  return <ReportView timePeriods={data?.reportTimePeriods} facultyId={metaData?.metadata?.faculty?.id}/>
}


export const getServerSideProps = withPageAuthRequired();
