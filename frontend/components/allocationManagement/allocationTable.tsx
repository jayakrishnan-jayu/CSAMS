import { CourseAllocationType, CourseType, FacultyType, LabAllocationType } from "@/graphql/generated/graphql";
import { table } from "console";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";


interface AllocationTableProps {
    courseAllocations?:  CourseAllocationType[]
    labAllocations?: LabAllocationType[]
    courses: CourseType[]
}

interface InCharge {
    is_in_charge?: boolean
}

type AllocationTableData = CourseType & InCharge

const AllocationTable = ({ courseAllocations, labAllocations, courses}: AllocationTableProps) => {
    if ((courseAllocations === null || courseAllocations === undefined) && (labAllocations === null || labAllocations === undefined)) return <div></div>;
    if ((courseAllocations !== null && courseAllocations !== undefined) && labAllocations !== null && labAllocations !== undefined)return <div>not good</div>;

    let isCourseType = false;
    let tableData: AllocationTableData[] = []

    const getCourse = (id: string): CourseType | null => {
        const course = courses.filter(c=>c.id===id)
        if (course.length !== 1) return null;
        return course[0];
    }

    const programBodyTemplate = (rowData: AllocationTableData) => {
        return rowData.program && <span className={`generic-badge program-${rowData.program.toLowerCase().replace(/ +/g, "")}`}>{rowData.program}</span>;
    };

    const isInChargeBodyTemplate = (rowData: AllocationTableData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.is_in_charge, 'text-pink-500 pi-times-circle': !rowData.is_in_charge })}></i>;
    };

    if (courseAllocations !== null && courseAllocations !== undefined) {
        isCourseType = true;
        tableData = courseAllocations.map(ca=>{
            const c = getCourse(ca.courseId)
            return {
                ...c,
                name: c?.code + " " + c?.name,
                batch: c?.batchYear + " S"+c?.sem,
                
            }
        })
    }

    if (labAllocations !== null && labAllocations !== undefined) {
        tableData = labAllocations.map(la=>{
            const c = getCourse(la.courseId);
            c?.curriculumYear
            return {
                ...c,
                name: c?.code + " " + c?.name,
                is_in_charge: la?.isInCharge,
                batch: c?.batchYear + " S"+c?.sem,
            }
        })
    }
    
    return (
        <DataTable
            value={tableData}

            className="datatable-responsive"
            emptyMessage="No allocation info found."
            responsiveLayout="scroll"
        >
            <Column field="program" header="Program"  body={programBodyTemplate}></Column>
            <Column field="curriculumYear" header="Curriculum"></Column>
            <Column field="batch" header="Batch"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="l" header="L" ></Column>
            <Column field="t" header="T" ></Column>
            <Column field="p" header="P" ></Column>
            {!isCourseType && <Column field="is_in_charge" header="Is In Charge" dataType="boolean" body={isInChargeBodyTemplate}></Column>}
            {/* <Column field="p" header="P" ></Column>
            <Column field="p" header="P" ></Column> */}
        </DataTable>
    );
}

export default AllocationTable;