import { BatchType, useBatchesQuery, useReleaseCoursesForFacultyMutation, useUpdateDeadlineMutation } from '@/graphql/generated/graphql';
import React, { useContext, useRef, useState } from 'react';;
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { MetaDataContext } from '../layout/context/metadatacontext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import VerifyCurriculum from '../curriculumUpload/verify';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
import { useRouter } from 'next/navigation';
import Deadline from '../deadline';

interface ModeType {
    type: null | 'releaseCourse' | 'updateDeadline'
}

const VerifyBatch = () => {
    const { metaData } = useContext(MetaDataContext);
    const toast = useRef(null);

    const _emptyCurriculum = {
        program: '',
        year: 0,
    }
    const _initialMode: ModeType = {
        type: null
    }

    const router = useRouter();

    const [result] = useBatchesQuery({});
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [curriculum, setCurriculum] = useState(_emptyCurriculum);
    const [expandedRows, setExpandedRows] = useState(null);
    const [startDateTime, setStartDateTime] = useState<Date | undefined>(undefined);
    const [endDateTime, setEndDateTime] = useState<Date | undefined>(undefined);
    const [dialogShown, setDialogShown] = useState(true);
    const [mode, setMode] = useState(_initialMode);

    const [releaseCoursesForFaculty, releaseCoursesForFacultyMutation] = useReleaseCoursesForFacultyMutation();
    const [updateDeadline, updateDeadlineMutation] = useUpdateDeadlineMutation();

    const {data, error, fetching} = result;

    const dropdownValues = [
        { name: 'Odd Semester', code: '0' },
        { name: 'Even Semester', code: '1' },
    ];

    const metaDataStartTimeStamp = metaData.metadata.config.currentPreferenceSem.startTimestamp !== null ? new Date(metaData.metadata.config.currentPreferenceSem.startTimestamp) : null;
    const metaDataEndTimeStamp = metaData.metadata.config.currentPreferenceSem.endTimestamp !== null ? new Date(metaData.metadata.config.currentPreferenceSem.endTimestamp) : null;

    if (startDateTime === undefined && metaDataStartTimeStamp !== null) {
        setStartDateTime(metaDataStartTimeStamp);
    }
    if (endDateTime === undefined && metaDataEndTimeStamp !== null) {
        setEndDateTime(metaDataEndTimeStamp);
    }

    if (!dialogShown) {
        if (releaseCoursesForFaculty?.error?.message) {
            toast.current.show({ severity: 'error', summary: 'Error releasing courses for faculties', detail: releaseCoursesForFaculty.error.message, life: 3000 });
            setDialogShown(true);
        }
        if (updateDeadline?.error?.message) {
            toast.current.show({ severity: 'error', summary: 'Error updating deadline', detail: updateDeadline.error.message, life: 3000 });
            setDialogShown(true);
        }

        if (mode.type === "releaseCourse" && releaseCoursesForFaculty?.data?.releaseCoursesForFaculty) {
            toast.current.show({ severity: 'success', summary: 'Courses released for faculties!', life: 3000 });
            setDialogShown(true);
            setMode({type: null});
            router.refresh()
        }

        if (mode.type === "updateDeadline" && updateDeadline?.data?.updateDeadline) {
            toast.current.show({ severity: 'success', summary: 'Deadline Updated!', life: 3000 });
            setDialogShown(true);
            setMode({type: null});
            router.refresh();
        }

    }


    const dropDownValue = dropdownValues[metaData?.metadata?.config?.currentPreferenceSem?.isEvenSem ? 1 : 0];
    const batchesLeftToFill = [];

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

    const onDeadlineSave = async () => {
        console.log(startDateTime, endDateTime)
        if (startDateTime === undefined || startDateTime === null) {
            toast.current.show({ severity: 'error', summary: 'Invalid Timestamp', detail: "Start timestamp is required!", life:3000 });
            return;
        }
        if (endDateTime === undefined || endDateTime === null) {
            toast.current.show({ severity: 'error', summary: 'Invalid Timestamp', detail: "End timestamp is required!", life:3000 });
            return;
        }

        if (startDateTime > endDateTime) {
            toast.current.show({ severity: 'error', summary: 'Invalid Timestamp', detail: "Start timestamp is greater than End timestamp", life:3000 });
            return;
        }
        setDialogShown(false);
        setMode({type: "updateDeadline"});
        await updateDeadlineMutation({ END_TIMESTAMP: endDateTime, START_TIMESTAMP: startDateTime, IDENTIFIER: {isEvenSem: metaData.metadata.config.currentPreferenceSem.isEvenSem, year: metaData.metadata.config.currentPreferenceSem.year}})
    }
    
    const renderTables = () => {
        if (fetching) return <div>Loading</div>;
        if (error?.message) return <div>Failed to load data {error.message}</div>;
        const unique_curriculums = Array.from(new Set(data?.batches.map(b => b?.curriculum?.program+'-'+b?.curriculum.year)));
        return unique_curriculums.map(cy => {
            const [p, y] = cy.split('-');
            const header = renderTableHeader(p, Number(y));
            const values = data?.batches.filter(b => b?.curriculum?.program === p && b.curriculum.year?.toString() === y).map(b => {return {...b, semesterExtraCoursesLength: b?.semesterExtraCourses?.length, selectedExtraCoursesLength: b?.selectedExtraCourses?.length}});
            batchesLeftToFill.push(...values.filter(e => e.extraCourseLeftToAssign !== 0));
            return (
                <div className="col-12">
                    <div className="card">
                        <DataTable
                            value={values}
                            rows={10}
                            expandedRows={expandedRows}
                            onRowToggle={(b) => setExpandedRows(b.data)}
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
                        </DataTable>
                    </div>
                </div>
            );
        })
    }

    const renderVerifySettings = () => {
        if (metaData.metadata.config.currentPreferenceSem.areCoursesVerified) {
            return (
                <>
                <div className="formgroup-inline">
                    <div className="field">
                        <h5>Start Timestamp</h5>
                        <Calendar id="start_timestamp" value={startDateTime}  onChange={(e: any) => {setStartDateTime(e.value); console.log(e.value)}} hourFormat='12' showTime showSeconds />
                    </div>
                    <div className="field">
                        <h5>End Timestamp</h5>
                        <Calendar id="end_timestamp" value={endDateTime} onChange={(e: any) => {setEndDateTime(e.value); console.log(e.value)}} hourFormat='12' showTime showSeconds/>
                    </div>
                </div>
                <div className="flex mt-2 ml-auto mr-auto">
                    <Button 
                        label='Save'
                        icon="pi pi-check"
                        onClick={onDeadlineSave}
                    />
                </div>
                {metaDataStartTimeStamp !== null && metaDataStartTimeStamp !== null && <Deadline startTimestamp={metaDataStartTimeStamp} endTimestamp={metaDataEndTimeStamp}/>}
                
            </>
            );
        }
        if (batchesLeftToFill.length !== 0) {
            return batchesLeftToFill.map(b => <div>{b.curriculum.program} {b.year} Batch S{b.sem} has {b.extraCourseLeftToAssign} Courses Left to be assigned</div>);
        }
        
        return (
            <>
                <h5>Release Courses for faculty preference?</h5>
                <ConfirmPopup />
                <Button onClick={confirmVerify} icon="pi pi-check" label="Confirm"></Button>
            </>
        );
        
    }

    const confirmVerify: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept() {
                setDialogShown(false);
                setMode({type: "releaseCourse"});
                releaseCoursesForFacultyMutation({IDENTIFIER: {isEvenSem: metaData.metadata.config.currentPreferenceSem.isEvenSem, year: metaData.metadata.config.currentPreferenceSem.year}})
            },
        });
    };

    const tables = renderTables();

    return (
        <div className="grid">
            <Toast ref={toast} />
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
            <div className="col-12">
                <div className="card">
                    {renderVerifySettings()}
                    {/* 
                    {batchesLeftToFill.length === 0 && <div>Yay nothing to do </div>} */}
                </div>
            </div>
            {tables}
            <Dialog visible={visibleFullScreen} onHide={() => {setVisibleFullScreen(false);}} baseZIndex={1000}>
                        {
                        visibleFullScreen && 
                        <VerifyCurriculum curriculum_program={curriculum.program} curriculum_year={curriculum.year}  />
                        }
            </Dialog>
        </div>
    );
}
export default VerifyBatch;
