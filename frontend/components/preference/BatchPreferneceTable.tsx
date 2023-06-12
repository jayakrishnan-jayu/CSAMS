import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import PreferenceTable from "../preferenceTable";
import { Dropdown } from "primereact/dropdown";
import { AllocationBatchType, CourseAllocationPreferenceType, CourseAllocationType, CourseType, FacultyType, LabAllocationType } from "@/graphql/generated/graphql";
import { useState } from "react";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

interface BatchPreferenceTableProps {
    loading: boolean
    faculties?: FacultyType[]
    courses?: CourseType[]
    batches?: AllocationBatchType[]
    preferences?: CourseAllocationPreferenceType[]
    editCourses: (course: CourseType) => void
    prefNums: String[]
    facultyID: String
}


const BatchPreferenceTable = ({loading, faculties, courses, batches, preferences, editCourses, prefNums, facultyID}: BatchPreferenceTableProps) => {

    const [expandedRows, setExpandedRows] = useState(null);

    
      const courseBodyTemplate = (rowData: CourseType) => {
        return <span>{rowData.code} {rowData.name}</span>;
      };

      const totalPrefBodyTemplate = (rowData: CourseType) => {
        return <span>{rowData.preferences.length}</span>;
      };

      const courseLabBodyTemplate = (rowData: CourseType) => {
        const batch = batches.find(b=>rowData.batchId);

        const c = batch?.courseLabs?.filter(cl => cl?.courseId === rowData?.id);
        if (c.length === 1) {
           const index = batch?.courseLabs?.indexOf(c[0]);
           if (index >= 0 && index <prefNums.length) return <span className={`generic-badge preference-${prefNums[index]}`}>Course</span>;
           return <Tag value="Course"></Tag>
        }
        const l = batch?.courseLabs?.filter(cl => cl?.labId === rowData?.id)
        if (l.length === 1) {
           const index = batch?.courseLabs?.indexOf(l[0]);
           if (index >= 0 && index <prefNums.length) return <span className={`generic-badge preference-${prefNums[index]}`}>Lab</span>;
           return <Tag value="Lab"></Tag>
        }
        if (rowData?.code.charAt(rowData?.code?.length-2) === '8') {
          if (rowData?.isElective) return <Tag value="Elective/Lab Only"/>
          return <Tag value="Lab Only"></Tag>
        }
        if (rowData?.isElective) return <Tag value="Elective"/>
        return <></>
      };
    

    
      const actionBodyTemplate = (rowData: CourseType) => {
        //@ts-ignore
        const prefferred = rowData?.preferences?.filter(p => p?.facultyId === facultyID).length > 0;
        return (
          <>
            <Button
              icon="pi pi-chevron-up"
              className= {prefferred ? "p-button-rounded p-button-info mr-2" : "p-button-rounded p-button-success mr-2"}
              onClick={() => editCourses(rowData)}
            />
          </>
        );
      };

      const renderAllocatedFaculties = (isLab: boolean, la?: LabAllocationType[], ca?: CourseAllocationType[]) => {
        if(la.length === 0 && ca.length ===0) return <></>;
        if (isLab) {
  
          const inChargeAllocation = la.find(l=>l.isInCharge === true)
          const assistantAllocations = la.filter(l=>l.isInCharge === false)
          const inChargeFaculty = faculties.find(f=>f.id === inChargeAllocation?.facultyId)
          return (
            <div className="grid p-fluid ">
              <div className="field col-12 md:col-6 ">
              <h6>{inChargeAllocation ?  "Allocated In Charge Faculty" : "Allocate In Charge Faculty"}</h6>
              <InputText className='mb-2'  value={inChargeFaculty?.user?.firstName + " " + inChargeFaculty?.user?.lastName} type="text" disabled={true} />
                {/* className='mb-2' 
                value={inChargeAllocation?.facultyId ? getFacultyDropdownValue(inChargeAllocation?.facultyId) : null}
                onChange={(e) => onFacultyAllocationChange(e.value, data?.id, 'Lab', 'Incharge')}  
                optionLabel="search"
                placeholder="Select a Faculty"
                filter
                showClear
              /> */}
              {
              assistantAllocations.map(a=> {
                const labFaculty = faculties.find(f=>f.id === a.facultyId);
                return <InputText 
                className='mb-2' 
                value={labFaculty?.user?.firstName + " " + labFaculty?.user?.lastName}
                type="text" disabled={true}
               />
              }
                
                )
              }
            </div>
            
            <div className="field col-12 md:col-3 ">
              <span className="">
              <h6>Type</h6>
              <Button className='mb-2' label="In Charge" severity="success" rounded disabled/>
              {
                assistantAllocations.map(a=>
                  <Button className='mb-2' label="Lab Assistant" severity="info" rounded disabled/>
                )
              }
              </span>
            </div>
  
          </div>
          );
        }
        if (!isLab) {
          const facultyID = ca[0]?.facultyId;
          const _faculty = faculties.find(f=>facultyID===f.id)
          return (
            <div className="grid p-fluid">
              <div className="field col-12 md:col-6 ">
                <h6>{facultyID ?  "Allocated Faculty" : "Allocate Faculty"}</h6>
                <InputText 
                    className='mb-2' 
                    value={_faculty?.user?.firstName + " " + _faculty?.user?.lastName} 
                    type="text" disabled={true}
                  />
              </div>
            </div>
          );
      }
    }


      const rowExpansionTemplate = (data: any) => {
        const batch = batches.find(b=>b.id === data?.batchId);

        const ca = batch.courseAllocations?.filter(c=>c.courseId===data?.id);
        const la = batch.labAllocations?.filter(l=>l.courseId===data?.id);

        // if (data.selectedExtraCourses.length === 0) return <div>No extra courses assigned</div>
        return (
            <>
            {renderAllocatedFaculties(data?.code.charAt(data?.code?.length-2) === '8', la, ca)}
            
            <PreferenceTable preferences={data?.preferences} exclude={['batch', 'curriculum', 'program', 'course']} include={['faculty']}/>
            </>
        )
    };

    const renderBatchTable = (batch: AllocationBatchType) => {
        const _courses = courses
        .filter(c=>c.batchId == batch.id)
        .map(c=>{
            return {...c, 
                preferences: preferences
                .filter(p=>p.courseId === c.id)
                .map(p=>{
                    const _f = faculties.find(f=>f.id === p.facultyId); 
                    return {...p, 
                        faculty: _f?.user?.firstName + " " + _f?.user?.lastName,
                    }
                }),
            }
        });

        return (
        <div className="col-12">
            <div className="card">
                <h5>{batch.batchYear} S{batch.batchSem} {batch.curriculumName} Batch</h5>
                <div>Curriculum {batch.curriculumName} {batch.curriculumYear}</div>
                <DataTable
                value={_courses}
                //   loading={fetching}
                //   filters={filters}
                rowsPerPageOptions={[5, 10, 25]}
                expandedRows={expandedRows}
                onRowToggle={(b) => setExpandedRows(b.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                className="datatable-responsive"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                emptyMessage="No courses info found."
                responsiveLayout="scroll"
                >
                <Column expander style={{ width: '3em' }} />
                <Column field="name" header="Course" body={courseBodyTemplate} headerStyle={{ minWidth: "10rem" }} />
                <Column field="credit" header="Credit" sortable headerStyle={{ minWidth: "5rem" }}/>
                <Column field="sem" header="Sem" headerStyle={{ minWidth: "5rem" }}/>
                <Column header="Total No. Pref" body={totalPrefBodyTemplate} headerStyle={{ minWidth: "5rem" }}/>
                <Column bodyClassName="text-center"  body={courseLabBodyTemplate}></Column>
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: "5rem" }}/>

                </DataTable>
            </div>
        </div>
        );
    }

    return (<>{batches && courses && batches.map(b => renderBatchTable(b))}</>)
}
export default BatchPreferenceTable;