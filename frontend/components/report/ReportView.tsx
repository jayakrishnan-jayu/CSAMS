import { IdentifierType, useAllocatedFacultiesQuery } from "@/graphql/generated/graphql";
import { ReportInput, ReportType } from "@/pages/faculty/report";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Menu } from "primereact/menu";

import { useRef, useState } from "react";
import CourseBookTable from "./courseBookTable";
import { Skeleton } from "primereact/skeleton";


interface ReportDropdownType {
    key: ReportType
    text: string
}

interface ReportViewProps {
    timePeriods: IdentifierType[]
    facultyId: string
}


const ReportView = ({timePeriods, facultyId}: ReportViewProps) => {

  const reportOptions: ReportDropdownType[]  = [
    {key: 'courseBook', text: 'Course Book'},
    {key: 'facultyWorkload', text: 'Faculty Workload'},
    {key: 'allocation', text: 'Allocations'},
  ]

  const [reportType, setReportType] = useState<ReportDropdownType>();
  const [timePeriod, setTimePeriod] = useState<IdentifierType>();
  const [faculty, setFaculty] = useState(null);



  const downloadXLSX = async (reportArgs: ReportInput) => {
    try {
      const response = await fetch('/api/report/xlsx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportArgs),
      });
      if (!response.ok) {
        throw new Error(`Unexpected response ${response.statusText}`);
      }
      console.log(response);

      const header = response.headers.get('Content-Disposition');
      const parts = header!.split(';');
      const filename = parts[1].split('=')[1];
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onExcelDownloadClick = () => {
    downloadXLSX({format: 'xlsx', identifier: {isEvenSem: timePeriod?.isEvenSem, year: timePeriod?.year}, type: reportType?.key})
  }

//   const onPdfDownloadClick = () => {
//     downloadXLSX({format: 'xlsx', identifier: {isEvenSem: timePeriod?.isEvenSem, year: timePeriod?.year}, type: reportType?.key})
//   }

  const downloadMenuItems = [
    // {
    //     label: 'As PDF',
    //     icon: 'pi pi-file-pdf',
    //     command: onPdfDownloadClick
    // },
    {
        label: 'As Excel',
        icon: 'pi pi-file-excel',
        command: onExcelDownloadClick
    },
];

const menu = useRef<Menu>(null);

  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    menu.current?.toggle(event);
};


const selectedCountryTemplate = (option: IdentifierType, props: any) => {
    if (option) {
        return (
            <span> {option?.year} {option?.isEvenSem ? "Even" : "Odd"} </span>
        );
    }

    return <span>{props.placeholder}</span>;
};

const renderTable = () => {
    if (!reportType || !timePeriod) return <></>;
    if (reportType.key === 'courseBook' || reportType.key === 'facultyWorkload' || reportType.key === 'allocation') {
        if (reportType.key !== 'allocation') return <CourseBookTable identifier={timePeriod} type={reportType.key} />
        if (faculty) return <CourseBookTable identifier={timePeriod} type={reportType.key} facultyId={faculty?.facultyId}/>
        return <></>
    }
        
    return <></>;
}

const renderButton = () => {
    if (reportType && timePeriod) {
        if (reportType?.key  === 'courseBook' || reportType?.key === 'facultyWorkload') {
            return (
            <div className="flex justify-content-center col-12 md:col-4">
                <div className="flex align-items-center">
                    <Menu ref={menu} model={downloadMenuItems} popup />
                    <Button type="button" label="Export As" icon="pi pi-angle-down" onClick={toggleMenu} style={{ width: 'auto' }} />
                </div>
            </div>);
        }

        return (
            <div className="field col-12 md:col-4">
                <span className="">
                    <h5>Faculty</h5>
                    <FacultyDropdown identifier={timePeriod} facultyId={facultyId} faculty={faculty} setFaculty={setFaculty}/>
                </span>
            </div>
        );

    }
    return <></>;
}

  return (
    <div className="grid">
        <div className="col-12">
            <div className="card">
                <div className="grid p-fluid ">
                    <div className="field col-12 md:col-4">
                    <span className="">
                        <h5>Report Type</h5>
                        <Dropdown 
                        value={reportType} 
                        options={reportOptions} 
                        optionLabel="key"
                        itemTemplate={(i: ReportDropdownType)=><span>{i?.text}</span>}
                        valueTemplate={(i:ReportDropdownType, props: any)=>{if (i) return <span>{i?.text}</span>; return <span>{props.placeholder}</span>}}
                        emptyMessage="No Report types found"
                        onChange={(e) => setReportType(e.value)} 
                        className="p-column-filter"
                        placeholder="Select a report type"
                        />
                </span>
        
                </div>
            
                <div className="field col-12 md:col-4">
                    <span className="">
                        <h5>Time Period</h5>
                        <Dropdown
                        value={timePeriod}
                        options={timePeriods} 
                        optionLabel="year"
                        itemTemplate={(i: IdentifierType)=><span>{i.year} {i.isEvenSem ? "Even" : "Odd"}</span>}
                        valueTemplate={selectedCountryTemplate}
                        emptyMessage="No data time periods found"
                        onChange={(e) => setTimePeriod(e.value)} 
                        className="p-column-filter"
                        placeholder="Select a time period"
                        filter
                        />
                    </span>
                </div>

            {renderButton()}                

            </div>
            </div>
        </div>
      {renderTable()}
      
      
    </div>
  );
}

interface FacultyDropdownProps {
    identifier: IdentifierType
    facultyId: string
    faculty: any
    setFaculty: any
}

const FacultyDropdown = ({identifier, facultyId, faculty, setFaculty}: FacultyDropdownProps) => {
    const [result] = useAllocatedFacultiesQuery({variables: {IDENTIFIER: {isEvenSem: identifier.isEvenSem, year: identifier.year}}});
    const {fetching, data, error} = result;
    
    if (fetching) return <Skeleton width="4rem" height="2rem"/>;
    if (error) return <span>Error : {error?.message}</span>;
    const dropdownValue =data?.allocatedFaculties?.map(f => {
        const isMe = facultyId === f?.id;
        return {facultyId: f?.id, name: f?.user?.firstName + " " + f?.user?.lastName, email: f?.user?.email, isMe: isMe };
    })
    if (!faculty) {
        const _f = dropdownValue?.find(f => f?.facultyId === facultyId);
        if (_f) setFaculty(_f);
    }
    return <Dropdown
        value={faculty}
        options={dropdownValue}
        onChange={(e)=>setFaculty(e.value)}
        optionLabel="name"
        itemTemplate={(i)=><><span>{i?.name} - {i?.email}</span> {i?.isMe && <i className="pi pi-user ml-3" />}</>}
        valueTemplate={(i, props: any)=>{if (i) return <span>{i?.name}</span>; return <span>{props.placeholder}</span>}}
        placeholder="Select a faculty"
        filter
    />

}

export default ReportView;