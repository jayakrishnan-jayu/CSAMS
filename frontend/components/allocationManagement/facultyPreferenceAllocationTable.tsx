import { AllocationPreferenceType, CourseAllocationType, CourseType, FacultyType, LabAllocationType, PreferenceType} from '@/graphql/generated/graphql';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Dropdown } from 'primereact/dropdown';
import AllocationTable from './allocationTable';
import PreferenceTable from '../preferenceTable';



interface FacultyPreferenceAllocationTableProps {
    faculties: FacultyType[] | undefined | null,
    preferences: AllocationPreferenceType[] | undefined | null,
    courseAllocations: CourseAllocationType[] | undefined | null,
    labAllocations: LabAllocationType[] | undefined | null,
    courses: CourseType[] | undefined | null,
    loading: boolean,
}

interface PreferenceAllocationTableData {
    facultyID: String,
    facultyName: String,
    email: String,
    track: String,
    designation: String,
    minWorkload: number,
    maxWorkload: number,
    workload: number,
    preferences?: AllocationPreferenceType[],
    courseAllocations?: CourseAllocationType[],
    labAllocations?: LabAllocationType[],
}

interface AllocationCourse {
    course?: CourseType
}

export type AllocationCoursePreferenceType = AllocationPreferenceType & AllocationCourse

const FacultyPreferenceAllocationTable = ({faculties, preferences, courseAllocations, labAllocations, courses, loading}: FacultyPreferenceAllocationTableProps) => {
    const [expandedRows, setExpandedRows] = useState(null);

    let tableData : PreferenceAllocationTableData[] = [];
    if (faculties) {
        tableData = faculties.map(f => {
            
            let _temp =  {
                facultyID: f.id,
                facultyName: f.user.firstName + " " + f.user.lastName,
                email: f.user.email,
                track: f.track,
                designation: f.designation,
                minWorkload: f.minWorkload,
                maxWorkload: f.maxWorkload,
                workload: f.workload,
                preferences: null,
                courseAllocations: null,
                labAllocations: null,
            };
            if (preferences) {
                const _prefs = preferences.filter(p => p.facultyId === f.id);
                if (_prefs.length > 0)
                    _temp = {..._temp, preferences: _prefs};
            }
            if (courseAllocations) {
                const _ca = courseAllocations.filter(ca=> ca.facultyId === f.id);
                if (_ca.length > 0)
                    _temp = {..._temp, courseAllocations: _ca};
                
            }
            if (labAllocations) {
                const _la = labAllocations.filter(la=> la.facultyId === f.id);
                if (_la.length > 0)
                    _temp = {..._temp, labAllocations: _la};

            }
            return _temp;
        })
    }

    const tracks = ['standard', 'research', 'teaching']
    const designations = ['professor', 'associate professor', 'assistant professor']
    const getCourse = (id: string) : CourseType | null => {
        const c = courses.filter(c=>c?.id === id);
        if (c.length === 1) return c[0]
        return null;
    }
    const rowExpansionTemplate = (data: PreferenceAllocationTableData) => {
        const courseAllocations = data?.courseAllocations?.filter(ca=>ca.facultyId === data.facultyID)
        const labAllocations = data?.labAllocations?.filter(la=>la.facultyId === data.facultyID)
        const preferences = data?.preferences?.filter(p=>p.facultyId==data.facultyID)

        return (
            <div className="orders-subtable">
                {courseAllocations?.length > 0 ?
                    <div>
                        <h5>Course Allocations</h5>
                        <AllocationTable courses={courses} courseAllocations={courseAllocations}/>
                    </div>
                : <div>No Course Allocations yet!</div>
                }
                {labAllocations?.length > 0 ?
                    <div>
                        <h5>Lab Allocations</h5>
                        <AllocationTable courses={courses} labAllocations={labAllocations}/>
                    </div>
                : <div>No Lab Allocations yet!</div>
                }
                {preferences?.length > 0 ?
                    <div>
                        <PreferenceTable preferences={preferences.map(p => {const c=getCourse(p.courseId); return {...p, course:c}})}/>
                    </div>
                : <div>No preferences yet!</div>
                }
                
            </div>
        );
    };

    const trackBodyTemplate = (rowData: PreferenceAllocationTableData) => {
        return <span className={`generic-badge track-${rowData.track.toLowerCase()}`}>{rowData.track}</span>;
    };
    const trackFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={tracks} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={trackItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    };
    const trackItemTemplate = (option) => {
        return <span className={`generic-badge track-${option.toLowerCase()}`}>{option}</span>;
    };
    
    const designationBodyTemplate = (rowData: PreferenceAllocationTableData) => {
        return <span className={`generic-badge designation-${rowData.designation.toLowerCase().replace(/ +/g, "")}`}>{rowData.designation}</span>;
    };
    const designationFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={designations} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={designationItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    };
    const designationItemTemplate = (option) => {
        return <span className={`generic-badge designation-${option.toLowerCase().replace(/ +/g, "")}`}>{option}</span>;
    };

    const activityBodyTemplate = (rowData: PreferenceAllocationTableData) => {
        let value = 0;
        const x = rowData.workload - rowData.minWorkload;
        if (x > 0) value = (x/(rowData.maxWorkload - rowData.minWorkload))*100;
        return (
            <>
                <ProgressBar value={value} showValue={false} style={{ height: '.5rem' }}></ProgressBar>
                <div className="flex justify-content-between">
                    <span>{rowData.minWorkload}</span>
                    <span>{rowData.workload}</span>
                    <span>{rowData.maxWorkload}</span>
                </div>
            </>
        );
    };

    return (
        <DataTable
            value={tableData}
            rows={10}
            paginator
            expandedRows={expandedRows}
            onRowToggle={(b) =>  setExpandedRows(b.data)}
            rowExpansionTemplate={rowExpansionTemplate}
            loading={loading}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            emptyMessage="No workload info found."
            responsiveLayout="scroll"
        >
            <Column expander style={{ width: '3em' }} />
            <Column field="facultyName" header="Name" style={{ minWidth: '2rem' }} />
            <Column field="email" header="Email" style={{ minWidth: '2rem' }} />
            <Column field="designation" header="Designation" sortable filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '15rem' }} body={designationBodyTemplate} filter filterElement={designationFilterTemplate} />
            <Column field="track" header="Track" sortable filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '6rem' }} body={trackBodyTemplate} filter filterElement={trackFilterTemplate} />
            <Column field="workload" header="Min/Cur/Max working Hours" sortable style={{ minWidth: '12rem' }} body={activityBodyTemplate} />
        </DataTable>
    );
}
export default FacultyPreferenceAllocationTable;