import { IdentifierType } from "@/graphql/generated/graphql";
import { ReportInput, ReportType } from "@/pages/faculty/report";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Menu } from "primereact/menu";

import { useRef, useState } from "react";
import CourseBookTable from "./courseBookTable";


interface ReportDropdownType {
    key: ReportType
    text: string
}

interface ReportViewProps {
    timePeriods: IdentifierType[]
}

const ReportView = ({timePeriods}: ReportViewProps) => {

  const reportOptions: ReportDropdownType[]  = [
    {key: 'courseBook', text: 'Course Book'},
    {key: 'facultyWorkload', text: 'Faculty Workload'},
  ]

  const [reportType, setReportType] = useState<ReportDropdownType>();
  const [timePeriod, setTimePeriod] = useState<IdentifierType>();


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

  const onPdfDownloadClick = () => {
    downloadXLSX({format: 'xlsx', identifier: {isEvenSem: timePeriod?.isEvenSem, year: timePeriod?.year}, type: reportType?.key})
  }

  const downloadMenuItems = [
    {
        label: 'As PDF',
        icon: 'pi pi-file-pdf',
        command: onPdfDownloadClick
    },
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
    if (reportType.key === 'courseBook' || reportType.key === 'facultyWorkload') return <CourseBookTable identifier={timePeriod} type={reportType.key}/>
    return <div>selected</div>;
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

                {reportType && timePeriod && 
                <div className="flex justify-content-center col-12 md:col-4">
                    <div className="flex align-items-center">
                    <Menu ref={menu} model={downloadMenuItems} popup />
                    <Button type="button" label="Download As" icon="pi pi-angle-down" onClick={toggleMenu} style={{ width: 'auto' }} />
                    </div>
                </div>
                }

            </div>
            </div>
        </div>
      {renderTable()}
      
      
    </div>
  );
}

export default ReportView;