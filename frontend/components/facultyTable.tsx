import React, { useState } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { InputText } from 'primereact/inputtext';
import { useFacultiesQuery } from '@/graphql/generated/graphql';

const FacultyTable = () => {
    const [result] = useFacultiesQuery();
    const {fetching, data, error} = result;
    if (error) return <div>Error occured while fetching</div>
    let faculties: any[] | undefined = [];
    if (data?.faculties) {
        faculties = data.faculties?.map((f) => {
            return {
                id: f?.user?.id,
                track: f?.track,
                designation: f?.designation,
                name: f?.user?.firstName + " " + f?.user?.lastName,
                email: f?.user?.email,
                isActive: f?.user?.isActive,
                isStaff: f?.user?.isStaff,
                username: f?.user?.username,
            }

        })
    }
    const [filters1, setFilters1] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // representative: { value: null, matchMode: FilterMatchMode.IN },
        // date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        // balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        // status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        // activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        // verified: { value: null, matchMode: FilterMatchMode.EQUALS },
        designation: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        track: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        isActive: { value: null, matchMode: FilterMatchMode.EQUALS },
        isStaff: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const tracks = ['standard', 'research', 'teaching']
    const designations = ['professor', 'associate professor', 'assistant professor']



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

    const trackBodyTemplate = (rowData) => {
        return <span className={`generic-badge track-${rowData.track.toLowerCase()}`}>{rowData.track}</span>;
    };
    const trackFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={tracks} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={trackItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    };
    const trackItemTemplate = (option) => {
        return <span className={`generic-badge track-${option.toLowerCase()}`}>{option}</span>;
    };
    
    const designationBodyTemplate = (rowData) => {
        return <span className={`generic-badge designation-${rowData.designation.toLowerCase().replace(/ +/g, "")}`}>{rowData.designation}</span>;
    };
    const designationFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={designations} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={designationItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    };
    const designationItemTemplate = (option) => {
        return <span className={`generic-badge designation-${option.toLowerCase().replace(/ +/g, "")}`}>{option}</span>;
    };

    const isStaffBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.isStaff, 'text-pink-500 pi-times-circle': !rowData.isStaff })}></i>;
    };
    const isActiveBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.isActive, 'text-pink-500 pi-times-circle': !rowData.isActive })}></i>;
    };

    const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />;
    };


    const header = renderHeader();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Faculties</h5>
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
                        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="username" header="Username" filter filterPlaceholder="Search by username" style={{ minWidth: '12rem' }} />
                        <Column field="designation" header="Designation" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '15rem' }} body={designationBodyTemplate} filter filterElement={designationFilterTemplate} />
                        <Column field="track" header="Track" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '6rem' }} body={trackBodyTemplate} filter filterElement={trackFilterTemplate} />
                        <Column field="isActive" header="Active" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={isActiveBodyTemplate} filter filterElement={verifiedFilterTemplate} /> 
                        <Column field="isStaff" header="Admin" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={isStaffBodyTemplate} filter filterElement={verifiedFilterTemplate} /> 
                        <Column field="email" header="Email" filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default FacultyTable;
