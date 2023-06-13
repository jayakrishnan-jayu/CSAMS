import { AllocationBatchType, IdentifierType, useAllocationsQuery } from "@/graphql/generated/graphql";
import { ReportType } from "@/pages/faculty/report";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";

interface ReportTableProps {
    identifier: IdentifierType
    type: ReportType
}

interface LoadingTableProps {
    type: ReportType
}

const LoadingTable = ({type}: LoadingTableProps) => {
    const bodyTemplate = () => {
        return <Skeleton></Skeleton>
    }
    
    const items = [{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}];

    return (
        <div className="col-12">
            <div className="card">
            {type === 'courseBook' && 
                <DataTable value={items} className="p-datatable-striped">
                    <Column field="code" header="Code" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="Name" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="L" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="T" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="P" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="Credit" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="Faculty" style={{ width: '25%' }} body={bodyTemplate}></Column>
                </DataTable>
            }
            {type === 'facultyWorkload' && 
                <DataTable value={items} className="p-datatable-striped">
                    <Column field="code" header="Faculty" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="L" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="T" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="P" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="Credit" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="name" header="Total" style={{ width: '25%' }} body={bodyTemplate}></Column>
                </DataTable>
            }
            </div>
        </div>
    );
}

const ReportTable = ({identifier, type}: ReportTableProps) => {
    const [result] = useAllocationsQuery({variables:{IDENTIFIER: {isEvenSem: identifier?.isEvenSem, year: identifier?.year}}});
    const {data, fetching, error} = result;

    
    if (fetching) return <LoadingTable  type={type} />
    if (error) return <span>error {error?.message}</span>

    const {batches, courses, faculties} = data?.allocations;


    const renderCourseBookTables = (batch: AllocationBatchType) => {
        const batchCourses = batch?.courseIds.map(cID=>courses.find(c=> c?.id === cID));
        
        const tableData = batchCourses.map(c=>{
            const ca = batch?.courseAllocations?.filter(ca=> ca?.courseId === c?.id).map(ca => ca.facultyId);
            const la = batch?.labAllocations?.filter(ca=> ca?.courseId === c?.id).map(la => la.facultyId);;
            const fa = faculties.filter(f=> ca.includes(f?.id) || la?.includes(f?.id)).map(f=> f?.user?.firstName + " " + f?.user?.lastName).join(" / ");

            return {...c, faculties: fa };
        });
        return (
        <div className="col-12">
          <div className="card">
            <h5>{batch.batchYear} S{batch.batchSem} {batch.curriculumName} Batch</h5>
            <div>Curriculum {batch.curriculumName} {batch.curriculumYear}</div>
            <DataTable
              value={tableData}
              className="datatable-responsive"
            >
              <Column field="code" header="Code" style={{ minWidth: '2rem' }} />
              <Column field="name" header="Name" style={{ minWidth: '2rem' }} />
              <Column field="l" header="L" style={{ minWidth: '2rem' }} />
              <Column field="t" header="T" style={{ minWidth: '2rem' }} />
              <Column field="p" header="P" style={{ minWidth: '2rem' }} />
              <Column field="credit" header="Credit" style={{ minWidth: '2rem' }} />
              <Column field="faculties" header="Faculty" style={{ minWidth: '2rem' }} />
            </DataTable>
          </div>
        </div>
        );
      }

      const renderFacultyWorkloadTables = () => {
        const tableData = faculties.map((f, i) => {
            const courseIds = batches.flatMap(b=>b.courseAllocations.filter(ca=>ca.facultyId===f.id).map(ca=>ca.courseId));
            const facultyCourses = courseIds.map(cid => courses.find(c => c.id == cid));
            const initialTotal = { l: 0, t: 0, p: 0, cr: 0 };
            const totals = facultyCourses.reduce((acc, course) => {
                acc.l += course.l;
                acc.t += course.t;
                acc.p += course.p;
                acc.cr += course.credit;
                return acc;
            }, initialTotal);
            const facultyName = f?.user?.firstName + " " + f?.user?.lastName;
            return {faculty: facultyName, l: totals.l, t: totals.t, p: totals.p, credit: totals.cr, total: totals.l + totals.t + totals.p};
      });
      return (
        <div className="col-12">
          <div className="card">
            <h5>Faculty Workload {identifier.year}</h5>
            <DataTable
              value={tableData}
              className="datatable-responsive"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} faculties"
              rows={25}
              paginatorTemplate=" PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              paginator
            >
              <Column field="faculty" header="Faculty" style={{ minWidth: '2rem' }} />
              <Column field="l" header="L" style={{ minWidth: '2rem' }} />
              <Column field="t" header="T" style={{ minWidth: '2rem' }} />
              <Column field="p" header="P" style={{ minWidth: '2rem' }} />
              <Column field="credit" header="Credit" style={{ minWidth: '2rem' }} />
              <Column field="total" header="Total Hours" style={{ minWidth: '2rem' }} />
            </DataTable>
          </div>
        </div>
        );
    };
    

    return (
        <>
            {
            batches && 
            type === "courseBook" ? 
                batches.map(b=> renderCourseBookTables(b))
                :
                renderFacultyWorkloadTables()
            }
        </>
    );
}

export default ReportTable;