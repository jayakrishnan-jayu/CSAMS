import { BatchType, useBatchesQuery } from '@/graphql/generated/graphql';
import React, { useContext, useState } from 'react';;
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { MetaDataContext } from '../layout/context/metadatacontext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import VerifyCurriculum from '../curriculumUpload/verify';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const VerifyBatch = () => {
    const { metaData } = useContext(MetaDataContext);
    const _emptyCurriculum = {
        program: '',
        year: 0,
    }

    const [result] = useBatchesQuery({});
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [curriculum, setCurriculum] = useState(_emptyCurriculum);
    const [expandedRows, setExpandedRows] = useState(null);

    const {data, error, fetching} = result;

    const dropdownValues = [
        { name: 'Odd Semester', code: '0' },
        { name: 'Even Semester', code: '1' },
    ];

    const dropDownValue = dropdownValues[metaData?.metadata?.config?.currentPreferenceSem?.isEvenSem ? 1 : 0];

    const renderTableHeader = (program: string, year: number) => {
        return (
            <div className="flex justify-content-between">
                <h5>{program} {year} Curriculum</h5>
                <span className="p-input-icon-left">
                    <Button icon="pi pi-search" className="p-button-rounded p-button-success mr-2" onClick={() => {setCurriculum({program: program, year: year}); setVisibleFullScreen(true)}} />
                </span>
            </div>
        );
    };

    const isCompleteBodyTemplate = (rowData: BatchType) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.selectedExtraCourses.length === rowData.semesterExtraCourses.length, 'text-pink-500 pi-times-circle': rowData.selectedExtraCourses.length !== rowData.semesterExtraCourses.length })}></i>;
    };

    const rowExpansionTemplate = (data: BatchType) => {
        if (data.semesterExtraCourses.length === 0) return <div> No extra courses to be assigned</div>
        if (data.selectedExtraCourses.length === 0) return <div>No extra courses assigned</div>
        return (
            <div className="orders-subtable">
                <div className="col-12 md:col-6">
                    <h6>Extra Course Types</h6>
                    {data.semesterExtraCourses?.map(c => 
                        <div className="field">
                            <InputText value={c} type="text" disabled={true} />
                        </div>
                    )}
                       
                </div>
                <DataTable value={data.selectedExtraCourses}>
                    <Column field="code" header="code"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="l" header="L" ></Column>
                    <Column field="t" header="T" ></Column>
                    <Column field="p" header="P" ></Column>
                    <Column field="credit" header="Credit"></Column>
                    <Column field="hours" header="Hours" ></Column>
                    <Column field="courseType" header="Type" ></Column>
                </DataTable>
            </div>
        );
    };

    const render = () => {
        if (fetching) return <div>Loading</div>;
        if (error?.message) return <div>Failed to load data {error.message}</div>;
        const unique_curriculums = Array.from(new Set(data?.batches.map(b => b?.curriculum?.program+'-'+b?.curriculum.year)));
        return unique_curriculums.map(cy => {
            const [p, y] = cy.split('-');
            const header = renderTableHeader(p, Number(y));
            return (
                <div className="col-12">
                    <div className="card">
                        <DataTable
                            value={data?.batches.filter(b => b?.curriculum?.program === p && b.curriculum.year?.toString() === y).map(b => {return {...b, semesterExtraCoursesLength: b?.semesterExtraCourses?.length, selectedExtraCoursesLength: b?.selectedExtraCourses?.length}})}
                            rows={10}
                            expandedRows={expandedRows}
                            onRowToggle={(b) => {console.log("expanding ", b.data); setExpandedRows(b.data)}}
                            rowExpansionTemplate={rowExpansionTemplate}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} batches"
                            emptyMessage="No Batch info found."
                            header={header}
                            responsiveLayout="scroll"
                        >
                            <Column expander style={{ width: '3em' }} />
                            <Column field="sem" header="Semester" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }}/>
                            <Column field="year" header="Batch Year" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }}/>
                            <Column field="semesterExtraCoursesLength" header="Total Courses to assign" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }}/>
                            <Column field="selectedExtraCoursesLength" header="Assigned Courses Count" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }}/>
                            <Column field="extraCourseLeftToAssign" header="Courses Left to assign" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }}/>
                            <Column dataType="boolean"  style={{ minWidth: '6rem' }} body={isCompleteBodyTemplate} /> 
                            {/* <Column field="curriculumYear" header="Curriculum Year" sortable  headerStyle={{ minWidth: '15rem' }}></Column>
                            <Column field="year" header="Batch" sortable  headerStyle={{ minWidth: '15rem' }}></Column>
                            <Column field="sem" header="Semester" ></Column>
                            <Column field="isComplete" header="Verified" dataType="boolean"  style={{ minWidth: '6rem' }} body={isCompleteBodyTemplate} /> 
                            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column> */}
                        </DataTable>
                    </div>
                </div>
            );
        })
    }

    return (
        <>
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Current Preference Semester Identifier</h5>
                    <div className="formgroup-inline">
                        <div className="field">
                            <InputNumber value={metaData?.metadata?.config?.currentPreferenceSem?.year} mode="decimal" format={false} disabled={true}></InputNumber>
                        </div>
                        <div className="field">
                            <Dropdown value={dropDownValue} optionLabel="name" options={dropdownValues} disabled={true}/>
                        </div>
                    </div>
                </div>
            </div>
            {render()}
            <Dialog visible={visibleFullScreen} onHide={() => {setVisibleFullScreen(false);}} baseZIndex={1000}>
                        {
                        visibleFullScreen && 
                        <VerifyCurriculum curriculum_program={curriculum.program} curriculum_year={curriculum.year}  />
                        }
            </Dialog>
        </div>
        </>
    );
}
export default VerifyBatch;
