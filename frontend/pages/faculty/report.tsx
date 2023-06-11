import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useContext, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { IdentifierInput } from "@/graphql/generated/graphql";

export interface ReportInput {
  identifier: IdentifierInput
  format: 'xlsx' | 'pdf'
  type: 'courseBook'
}

export default function Report() {
  const { metaData } = useContext(MetaDataContext);

  const identifier: IdentifierInput = {isEvenSem: true, year:2020};
  const data: ReportInput = {
    identifier: identifier,
    format: 'xlsx',
    type: 'courseBook'
  }

  const [dropdownValue, setDropdownValue] = useState(null);
  const [batchPrograms, setbatchProgram] = useState(null);
  const [message, setMessage] = useState('');

  const postData = async () => {
    try {
      const response = await fetch('/api/report/xlsx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Unexpected response ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.xlsx';
      link.click();
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={postData}>Make POST Request</button>
      <p>{message}</p>
    </div>
  );
}


export const getServerSideProps = withPageAuthRequired();
