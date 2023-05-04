import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useContext, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import CourseBook from "@/components/report/courseBook";
import BatchWise from "@/components/report/batchWise";

export default function Report() {
  const { metaData } = useContext(MetaDataContext);

  const [dropdownValue, setDropdownValue] = useState(null);

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

  return (
    <div>
      <div className="card">
        <Dropdown
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.value)}
          options={dropdownValues}
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
