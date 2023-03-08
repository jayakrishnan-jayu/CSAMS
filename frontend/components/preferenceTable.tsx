import React, { useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { usePreferencesQuery } from '@/graphql/generated/graphql';

const CurrentPreferenceTable = () => {
    const prefNums = ['first', 'second', 'third']
    const [result] = usePreferencesQuery();
    const {fetching, data, error} = result;
    if (error) return <div>Error occured while fetching</div>
    let faculties: any[] | undefined = [];

    if (data?.preferences) {
        faculties = data.preferences?.map((p) => {
            return {
                id: p?.id,
                course: p?.course?.code + " " + p?.course?.name,
                weigtage: p?.weigtage && p.weigtage >= 1 && p.weigtage <=3 ? prefNums[p.weigtage-1] : p?.weigtage ,
                experience: p?.experience,
                program: p?.course?.batch?.curriculum?.program,
                username: p?.faculty?.user?.username,
                timestamp: p?.timestamp,
                batch: p?.course?.batch?.year + " S"+p?.course?.batch?.sem,
                curriculum: p?.course?.batch?.curriculum?.year
            }

        })
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
        console.log("ongloablfilgt", e)
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

    const parseDateTime = (dateStr: string): string => {
        console.log(dateStr);
        const date = new Date(dateStr);
        console.log("date", date)
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().substr(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
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



    const header = renderHeader();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Preferences</h5>
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
                        <Column field="course" header="Course" filter filterPlaceholder="Search by course" style={{ minWidth: '10rem' }} />
                        <Column field="program" header="Program" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} filter body={programBodyTemplate} filterElement={programFilterTemplate}/>
                        <Column field="curriculum" header="Curriculum" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} sortable/>
                        <Column field="batch" header="Batch" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} filter/>
                        <Column field="weigtage" header="Pref." filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} body={prefBodyTemplate} filter filterElement={perfFilterTemplate} />
                        <Column field="experience" header="Exp." filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} sortable/>
                        <Column field="timestamp" header="At" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }}  body={dateTimeBodyTemplate} sortable/>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default CurrentPreferenceTable;
