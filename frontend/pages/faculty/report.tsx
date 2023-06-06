import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useContext, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import CourseBook from "@/components/report/courseBook";
import BatchWise from "@/components/report/batchWise";
import {AllocationManagementQuery, useAllocationManagementQuery} from "@/graphql/generated/graphql";
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import AllocationManagement from "@/components/allocationManagement/allocationManagement";

export default function Report() {
  const { metaData } = useContext(MetaDataContext);

  const [dropdownValue, setDropdownValue] = useState(null);
  const [batchPrograms, setbatchProgram] = useState(null);
  const [result] = useAllocationManagementQuery({requestPolicy: 'network-only'})
  const {fetching, data, error} = result;
  // console.log(data)
  // extractFacultyIds(data)

  const dropdownValues = [
    {
      name: "Course Book",
      code: "courseBook",
    },
    {
      name: "Batch wise",
      code: "batchWise",
    },
  ];

  const currentBatchDropdown = [

    {
      name: "2018 S4 BCA",
      code: "S4BCA",
    },
    {
      name: "2018 S4 MCA",
      code: "S4MCA",
    },
    {
      name: "2019 S2 BCA",
      code: "S2BCA",
    },
    {
      name : "2019 S2 MCA",
      code: "S2MCA"
    }
  ]

  return (
    <div>
      <div className="card ">
        <Dropdown
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.value)}
          options={dropdownValues}
          optionLabel="name"
          placeholder="Select"
        />
        <Dropdown className="ml-4"
            value={batchPrograms}
            onChange={(e) => setbatchProgram(e.value)}
            options={currentBatchDropdown}
            optionLabel="name"
            placeholder="Select"
        />
        {dropdownValue?.code === "courseBook" && <CourseBook />}
        {dropdownValue?.code === "batchWise" && <BatchWise />}
      </div>
      <div className=""></div>
    </div>
  );
}


export const getServerSideProps = withPageAuthRequired();
