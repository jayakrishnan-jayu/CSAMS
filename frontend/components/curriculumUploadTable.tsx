import { useCurriculumUploadsQuery, CurriculumUploadType, CurriculumUploadInput, useDeleteCurriculumUploadMutation, useVerifyCurriculumUploadMutation } from '@/graphql/generated/graphql';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import VerifyCurriculum from './curriculumUpload/verify';
import { useRouter } from "next/navigation";

const CurriculumUploadTable = () => {
    const programs = ['BCA', 'BCA DS', 'MCA']
    const toast = useRef(null);
    const dt = useRef(null);
    const router = useRouter();

    const [visibleFullScreen, setVisibleFullScreen] = useState(false);

    const [deleteDisplayConfirmation, setDeleteDisplayConfirmation] = useState(false);
    const [verifyDisplayConfirmation, setVerifyDisplayConfirmation] = useState(false);
    
    const [curriculumUpload, setCurriculumUpload] = useState<CurriculumUploadType|null>(null);

    const [, deleteCurriculumUploadMutation] = useDeleteCurriculumUploadMutation();
    const [, verifyCurriculumUploadMutation] = useVerifyCurriculumUploadMutation();
    // const [_, deleteCurriculumUploadMutation] = useVer();
    const [result] = useCurriculumUploadsQuery()
    const {fetching, data, error} = result;

    const deleteCurriculumUploadData = async () => {
        if (curriculumUpload?.id)
            await deleteCurriculumUploadMutation({CURRICULUMUPLOADID:curriculumUpload.id})
            router.refresh()
    }
    const verifyCurriculumUploadData = async () => {
        if (curriculumUpload?.id)
            await verifyCurriculumUploadMutation({CURRICULUMUPLOADID:curriculumUpload.id})
            router.refresh()
    }

    
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

    const deleteConfirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => {setDeleteDisplayConfirmation(false); }} className="p-button-text" autoFocus/>
            <Button type="button" label="Yes" icon="pi pi-check" onClick={() => {setDeleteDisplayConfirmation(false); deleteCurriculumUploadData(); }} className="p-button-text" />
        </>
    );

    const verifyConfirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => {setVerifyDisplayConfirmation(false); }} className="p-button-text" autoFocus/>
            <Button type="button" label="Yes" icon="pi pi-check" onClick={() => {setVerifyDisplayConfirmation(false); verifyCurriculumUploadData(); }} className="p-button-text" />
        </>
    );

    const footerElement = (): JSX.Element => {
        return (
        <div className="flex align-items-center flex-wrap">
            <div className="flex mt-6 ml-auto mr-auto">
                <Button 
                    label='Verify'
                    icon="pi pi-check"
                    onClick={() => setVerifyDisplayConfirmation(true)}
                />
                <Dialog header="Verify Confirmation" visible={verifyDisplayConfirmation} onHide={() => setVerifyDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={verifyConfirmationDialogFooter}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>Are you sure you want to verify {curriculumUpload?.program} - {curriculumUpload?.year} Curriculum Data?. This action cannot be reverted.</span>
                    </div>
                </Dialog>
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger ml-8" onClick={() => setDeleteDisplayConfirmation(true)} />
                <Dialog header="Delete Confirmation" visible={deleteDisplayConfirmation} onHide={() => setDeleteDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={deleteConfirmationDialogFooter}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>Are you sure you want to delete {curriculumUpload?.program} - {curriculumUpload?.year} Curriculum Data?</span>
                    </div>
                </Dialog>
            </div>
        </div>
        )
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
                        emptyMessage="No uploads found."
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
                            footerElement={footerElement}
                        />
                            }
                    </Sidebar>
                    
                </div>
            </div>
        </div>
    );
};

export default CurriculumUploadTable;
