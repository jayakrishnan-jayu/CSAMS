import { useUpdateWorkloadMutation, useCurriculumUploadsQuery, useWorkloadsQuery, CurriculumUploadType, CurriculumUploadInput } from '@/graphql/generated/graphql';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import VerifyCurriculum from './curriculumUpload/verify';

const CurriculumUploadTable = () => {
    const programs = ['BCA', 'BCA DS', 'MCA']
    const toast = useRef(null);
    const dt = useRef(null);
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [curriculumUpload, setCurriculumUpload] = useState<CurriculumUploadType|null>(null);

    const [result] = useCurriculumUploadsQuery()
    const {fetching, data, error} = result;

    
    if (error) return <div>{error.toString()}</div>

    function parseDateTime(dateString: string): string {
        const date = new Date(dateString);
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hour = date.getHours() % 12 || 12;
        const minute = date.getMinutes();
        const ampm = date.getHours() < 12 ? "a.m." : "p.m.";
        
        return `${month} ${day}, ${year}, ${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    }

    const dateTimeBodyTemplate = (rowData) => {
        return parseDateTime(rowData.uploadedOn);
    };

    let curriculumUploads: CurriculumUploadType[] | undefined = [];
    if (data?.curriculumUploads) {
        curriculumUploads = data?.curriculumUploads as CurriculumUploadType[];
    }

    const editCurriculum = (c: CurriculumUploadType) => {
        setCurriculumUpload({...c})
        setVisibleFullScreen(true);
    };

    const yearBodyTemplate = (rowData) => {
      return (
          <>
              <span className="p-column-title">Years</span>
              {rowData.year}
          </>
      );
  };

    const actionBodyTemplate = (rowData: CurriculumUploadType) => {
        return <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editCurriculum(rowData)} />
    };



    const programBodyTemplate = (rowData: CurriculumUploadType) => {
        return rowData.program && <span className={`generic-badge program-${rowData.program.toLowerCase().replace(/ +/g, "")}`}>{rowData.program}</span>;
    };
    const programFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={programs} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={programItemTemplate} placeholder="Select a Program" className="p-column-filter" showClear />;
    };
    const programItemTemplate = (option) => {
        return <span className={`generic-badge program-${option.toLowerCase().replace(/ +/g, "")}`}>{option}</span>;
    };

    const isVerifiedBodyTemplate = (rowData: CurriculumUploadType) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.isPopulated, 'text-pink-500 pi-times-circle': !rowData.isPopulated })}></i>;
    };
    const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />;
    };

    const filters: DataTableFilterMeta = {
        program: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        year: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        isPopulated: { value: null, matchMode: FilterMatchMode.EQUALS },
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <DataTable
                        ref={dt}
                        value={curriculumUploads}
                        rows={10}
                        loading={fetching}
                        filters={filters}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        emptyMessage="No workload info found."
                        responsiveLayout="scroll"
                    >
                        <Column field="program" header="Program" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} filter body={programBodyTemplate} filterElement={programFilterTemplate}/>
                        <Column field="year" header="Curriculum Year" body={yearBodyTemplate} style={{ minWidth: '2rem' }}filter ></Column> 
                        <Column field="isPopulated" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={isVerifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} /> 
                        <Column field="uploadedOn" header="Uploaded On" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }}  body={dateTimeBodyTemplate} sortable/>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                         
                    </DataTable>
                    <Sidebar visible={visibleFullScreen} onHide={() => setVisibleFullScreen(false)} baseZIndex={1000} fullScreen>
                        {
                        visibleFullScreen && 
                        <VerifyCurriculum 
                        curriculum={JSON.parse(curriculumUpload?.data) as CurriculumUploadInput} 
                        onVerify={() => {console.log("done")}}
                        />
                            }
                    </Sidebar>
                    
                </div>
            </div>
        </div>
    );
};

export default CurriculumUploadTable;
