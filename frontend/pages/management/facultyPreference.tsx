import { useCoursesQuery } from "@/graphql/generated/graphql";
import { Dropdown } from "primereact/dropdown";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

const FacultyPreference = () => {
  let emptyCourseData = {
    code: "",
    name: "",
  };
  const [programValue, setProgramValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [semValue, setSemValue] = useState("");

  const [result] = useCoursesQuery();
  const { fetching, data, error } = result;

  if (error) return <div>{error.toString()}</div>;
  let courses: any[] | undefined = [];
  if (data?.courses?.courses) {
    courses = data?.courses?.courses;
  }

  const dt = useRef(null);

  const programDropdownValues = [
    {
      name: "BCA",
      code: "bca",
    },
    {
      name: "MCA",
      code: "mca",
    },
  ];

  const yearDropdownValues = [
    {
      name: "2018",
      code: "2018",
    },
    {
      name: "2020",
      code: "2020",
    },
  ];

  const semDropdownValues = [
    {
      name: "S1",
      code: "s1",
    },
    {
      name: "S2",
      code: "s2",
    },
    {
      name: "S3",
      code: "s3",
    },
    {
      name: "S4",
      code: "s4",
    },
    {
      name: "S5",
      code: "s5",
    },
    {
      name: "S6",
      code: "s6",
    },
  ];

  const courseCodeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Course Code</span>
        <span className={`generic-badge code-${rowData?.code.toLowerCase()}`}>
          {rowData?.code}
        </span>
      </>
    );
  };

  const courseNameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Course Name</span>
        <span className={`generic-badge name-${rowData?.name.toLowerCase()}`}>
          {rowData?.name}
        </span>
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-chevron-up"
          className="p-button-rounded p-button-success mr-2"
          // onClick={() => editWorkload(rowData)}
        />
      </>
    );
  };

  return (
    <div className="">
      {/* <div className="card flex gap-5">
        <div className="">
          <h5>Program</h5>
          <Dropdown
            value={programValue}
            onChange={(e) => {
              setProgramValue(e.value);
            }}
            options={programDropdownValues}
            optionLabel="name"
            placeholder="Select"
          />
        </div>
        <div className="">
          <h5>Year</h5>
          <Dropdown
            value={yearValue}
            onChange={(e) => {
              setYearValue(e.value);
            }}
            options={yearDropdownValues}
            optionLabel="name"
            placeholder="Select"
          />
        </div>

        <div className="">
          <h5>Semester</h5>
          <Dropdown
            value={semValue}
            onChange={(e) => {
              setSemValue(e.value);
            }}
            options={semDropdownValues}
            optionLabel="name"
            placeholder="Select"
          />
        </div>
        <div className="">
          <Button
            icon="pi pi-sort-down"
            className="p-button-rounded p-button-success mt-5 mr-2"
            // onClick={handleClick}
          />
        </div>
      </div> */}
      <div className="card">
        <DataTable
          ref={dt}
          value={courses}
          rows={10}
          loading={fetching}
          rowsPerPageOptions={[5, 10, 25]}
          className="datatable-responsive"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          emptyMessage="No courses info found."
          responsiveLayout="scroll"
        >
          <Column
            field="code"
            header="Course Code"
            sortable
            body={courseCodeBodyTemplate}
            headerStyle={{ minWidth: "10rem" }}
          />
          <Column
            field="name"
            header="Course Name"
            sortable
            body={courseNameBodyTemplate}
            headerStyle={{ minWidth: "10rem" }}
          />
          <Column
            body={actionBodyTemplate}
            headerStyle={{ minWidth: "5rem" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default FacultyPreference;
