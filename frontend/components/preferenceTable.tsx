import React, { useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { usePreferencesQuery } from '@/graphql/generated/graphql';
import { AllocationCoursePreferenceType } from './allocationManagement/facultyPreferenceAllocationTable';

type PreferenceExcludeType = 'program' | 'curriculum' | 'batch' | 'course';

type PreferenceIncludeType = 'faculty';

interface PreferenceTableProps {
    preferences?: AllocationCoursePreferenceType[] | any
    courseID?: number,
    exclude?: PreferenceExcludeType[]
    include?: PreferenceIncludeType[]
}

const PreferenceTable = ({courseID, preferences, exclude, include}: PreferenceTableProps) => {
    const prefNums = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
    let variables = {}
    if (courseID) {
        variables = {COURSEID: courseID.toString()}
    }
    
    
    const [filters1, setFilters1] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        course: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        program: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        batch: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        weigtage: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const programs = ['BCA', 'BCA DS', 'MCA']



    const clearFilter1 = () => {
        initFilters1();
    };

    const onGlobalFilterChange1 = (e) => {

        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const initFilters1 = () => {
        setGlobalFilterValue1('');
    };

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
        return parseDateTime(rowData.timestamp);
    };

    const prefBodyTemplate = (rowData) => {
        return <span className={`generic-badge preference-${rowData.weigtage}`}>{rowData.weigtage}</span>;
    };
    const perfFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={prefNums} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={prefItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    };
    const prefItemTemplate = (option) => {
        return <span className={`generic-badge preference-${option}`}>{option}</span>;
    };
    
    
    const programBodyTemplate = (rowData) => {
        return <span className={`generic-badge program-${rowData.program.toLowerCase().replace(/ +/g, "")}`}>{rowData.program}</span>;
    };
    const programFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={programs} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={programItemTemplate} placeholder="Select a Program" className="p-column-filter" showClear />;
    };
    const programItemTemplate = (option) => {
        return <span className={`generic-badge program-${option.toLowerCase().replace(/ +/g, "")}`}>{option}</span>;
    };


    if (preferences) return (
        <DataTable
            value={preferences.map(p=>{return {
                ...p, 
                batch: p?.course?.batchYear + " S" + p?.course?.sem, 
                course: p?.course?.code + " " + p?.course?.name,
                weigtage: p?.weigtage && p.weigtage >= 1 && p.weigtage <=6 ? prefNums[p.weigtage-1] : p?.weigtage,
                program: p?.course?.program,
                curriculum: p?.course?.curriculumYear,
            }})}
            className="datatable-responsive"
            dataKey="id"
            filters={filters1}
            filterDisplay="menu"
            responsiveLayout="scroll"
            emptyMessage="No prefereces found."
        >
            {include?.includes("faculty") && <Column field="faculty" header="Faculty"  style={{ minWidth: '10rem' }} />}
            {!exclude?.includes("course") && <Column field="course" header="Course"  style={{ minWidth: '10rem' }} />}
            {!exclude?.includes("program") && <Column field="program" header="Program" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} filter body={programBodyTemplate} filterElement={programFilterTemplate}/>}
            {!exclude?.includes('curriculum') && <Column field="curriculum" header="Curriculum" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} sortable/>}
            {!exclude?.includes('batch') &&<Column field="batch" header="Batch" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} filter/>}
            <Column field="weigtage" header="Pref." style={{ minWidth: '2rem' }} body={prefBodyTemplate}/>
            <Column field="experience" header="Exp."  style={{ minWidth: '2rem' }} />
            <Column field="timestamp" header="At"  style={{ minWidth: '2rem' }}  body={dateTimeBodyTemplate}/>
        </DataTable>
    )
    

    const [result] = usePreferencesQuery({variables});
    const {fetching, data, error} = result;
    if (error) return <div>Error occured while fetching</div>
    let faculties: any[] | undefined = [];

    if (data?.preferences) {
        faculties = data.preferences?.map((p) => {
            return {
                id: p?.id,
                course: p?.course?.code + " " + p?.course?.name,
                weigtage: p?.weigtage && p.weigtage >= 1 && p.weigtage <=6 ? prefNums[p.weigtage-1] : p?.weigtage ,
                experience: p?.experience,
                program: p?.course?.program,
                username: p?.faculty?.user?.firstName + " " + p?.faculty?.user?.lastName,
                email: p?.faculty?.user?.email,
                timestamp: p?.timestamp,
                batch: p?.course?.batchYear + " S"+p?.course?.sem,
                curriculum: p?.course?.curriculumYear
            }

        })
    }

    if (courseID) return (
        <DataTable
            value={faculties}
            className="datatable-responsive"
            rows={15}
            dataKey="id"
            filterDisplay="menu"
            loading={fetching}
            responsiveLayout="scroll"
            emptyMessage="No faculties found."
        >
            <Column field="username" header="Name" style={{ minWidth: '10rem' }} />
            <Column field="email" header="Email" style={{ minWidth: '10rem' }} />
            <Column field="weigtage" header="Pref." style={{ minWidth: '2rem' }} body={prefBodyTemplate}  />
            <Column field="experience" header="Exp." style={{ minWidth: '2rem' }} />
            <Column field="timestamp" header="At"style={{ minWidth: '2rem' }}  body={dateTimeBodyTemplate} />
        </DataTable>
    )

    const header = renderHeader();

    return (
        <DataTable
            value={faculties}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={15}
            dataKey="id"
            filters={filters1}
            filterDisplay="menu"
            loading={fetching}
            responsiveLayout="scroll"
            emptyMessage="No faculties found."
            header={header}
        >
            <Column field="username" header="Name" filter filterPlaceholder="Search by username" style={{ minWidth: '10rem' }} />
            {!exclude?.includes("course") && <Column field="course" header="Course" filter filterPlaceholder="Search by course" style={{ minWidth: '10rem' }} />}
            {!exclude?.includes("program") && <Column field="program" header="Program" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} filter body={programBodyTemplate} filterElement={programFilterTemplate}/>}
            {!exclude?.includes('curriculum') && <Column field="curriculum" header="Curriculum" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} sortable/>}
            {!exclude?.includes('batch') &&<Column field="batch" header="Batch" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} filter/>}
            <Column field="weigtage" header="Pref." filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} body={prefBodyTemplate} filter filterElement={perfFilterTemplate} />
            <Column field="experience" header="Exp." filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} sortable/>
            <Column field="timestamp" header="At" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }}  body={dateTimeBodyTemplate} sortable/>
        </DataTable>
                

    );
};

export default PreferenceTable;
