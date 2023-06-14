import { useAllocationManagementQuery, MetaDataType, useHodApprovalMutation } from '@/graphql/generated/graphql';
import React, { useRef, useState } from 'react';
import FacultyPreferenceAllocationTable from './facultyPreferenceAllocationTable';
import BatchAllocationPreferenceTable, { CourseAllocationWithCourse, LabAllocationWithCourse } from './batchAllocationPreferenceTable';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
import { Checkbox } from 'primereact/checkbox';
import { Skeleton } from 'primereact/skeleton';

interface AllocationManagementProps {
  metadata: MetaDataType
}

const AllocationManagement = ({metadata}:AllocationManagementProps) => {
  const [hodApproval, hodApprovalMutation] = useHodApprovalMutation();
  const [dialogShown, setDialogShown] = useState(true);
  const [courseAllocations, setCourseAllocations] = useState<null | CourseAllocationWithCourse[]>(null);
  const [labAllocations, setLabAllocations] = useState<null | LabAllocationWithCourse[]>(null);
  const toast = useRef(null);

  const [result] = useAllocationManagementQuery({requestPolicy: 'network-only'})
  const {fetching, data, error} = result;



  if (!dialogShown) {
    if (hodApproval?.data?.hodApproval) {
      toast.current.show({ severity: 'success', summary: 'Allocations Approved', life: 3000 });
      metadata.config.currentPreferenceSem = hodApproval.data.hodApproval.response
      setDialogShown(true);
    }
    if (hodApproval?.error?.message) {
      toast.current.show({ severity: 'error', summary: 'Error approving allcoations', detail: hodApproval.error.message, life: 3000 });
      
      setDialogShown(true);
    }
  }


  const retriveCourseAllocations = (): CourseAllocationWithCourse[] => {

    return data?.allocationManagement?.batches?.flatMap(batch =>

      batch.courseAllocations.flatMap(ca => {
          return {...ca, course: data?.allocationManagement?.courses?.find(c => c?.id === ca?.courseId)};
        })
      );
  }

  const retriveLabAllocations = (): LabAllocationWithCourse[] => {
    return data?.allocationManagement?.batches?.flatMap(batch =>
      batch.labAllocations.flatMap(la => {
          return {...la, course: data?.allocationManagement?.courses?.find(c => c?.id === la?.courseId)};
        })
      );
  }
  const courses = data?.allocationManagement?.courses;
  if ((courseAllocations === null || courseAllocations === undefined) && (courses !== null || courses !== undefined)) {
    const data = retriveCourseAllocations();
    if (data !== undefined && data !== null) setCourseAllocations(data);
  }
  if ((labAllocations === null || labAllocations === undefined) &&  (courses !== null || courses !== undefined)) {
    const data = retriveLabAllocations();
    if (data !== undefined && data !== null) setLabAllocations(data);
  }

  if (error) return <div>{error.toString()}</div>

  const confirmVerify: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    confirmPopup({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed',
        
        icon: 'pi pi-exclamation-triangle',
        accept() {
            setDialogShown(false);
            // setMode({type: "releaseCourse"});
            hodApprovalMutation({IDENTIFIER: {isEvenSem: metadata.config.currentPreferenceSem.isEvenSem, year: metadata.config.currentPreferenceSem.year}})
        },
    });
  };

  const renderApprovalCard = () => {
    const render = () => {
      if (fetching) return (
        <li className="mb-3">
        <div className="flex">
            <div style={{ flex: '1' }}>
                <Skeleton width="100%" className="mb-2"></Skeleton>
                <Skeleton width="75%" className='mb-2'></Skeleton>
                <Skeleton width="100%"></Skeleton>
            </div>
        </div>
      </li>
      );

      if (metadata?.config?.currentPreferenceSem?.isHodApproved) {
        return (
          <>
            <h5>Faculty Allocation</h5>
            <div className="col-12 md:col-4">
              <div className="field-checkbox">
                <Checkbox inputId="checkOption2" name="option" value="Los Angeles" checked />
                <label htmlFor="checkOption2">HOD Approved</label>
              </div>
            </div>
          </>
        );
      }

      const courseAllocationsLeft = courses.map(c=> (courseAllocations?.find(ca=>ca?.courseId === c?.id) || labAllocations?.find(la=>la?.isInCharge && la?.courseId === c?.id))).includes(undefined);

      if (courseAllocationsLeft) {
        return (
          <h5>Allocate all courses to give HOD Approval</h5>
        );
      }

      return (
        <>
          <h5>Course allocation for term {metadata?.config?.currentPreferenceSem?.year} {metadata?.config?.currentPreferenceSem?.isEvenSem? "Even" : "Odd"}?</h5>
          <ConfirmPopup />
          <Button onClick={confirmVerify} icon="pi pi-check" label="HOD Approval"></Button>
        </>
      )

    }
   
    
    return (
    <div className='col-12'>
      <div className='card'>
        {render()}
      </div>
    </div>
    );
  }

  return (
    <>
    <Toast ref={toast}/>
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <FacultyPreferenceAllocationTable
            loading={fetching}
            faculties={data?.allocationManagement?.faculties}
            preferences={data?.allocationManagement?.preferences}
            courseAllocations={courseAllocations ? courseAllocations.map(ca=>{return {courseId: ca?.courseId, facultyId: ca?.facultyId, id: ca?.id};}) : []}
            labAllocations={labAllocations ? labAllocations.map(la => {return {courseId: la?.courseId, facultyId: la?.facultyId, id: la?.id, isInCharge: la?.isInCharge};}): []}
            // courseAllocations={data?.allocationManagement?.batches.filter(b=>b.courseAllocations.length > 0).flatMap(b=>b.courseAllocations)}
            // labAllocations={data?.allocationManagement?.batches.filter(b=>b.labAllocations.length > 0).flatMap(b=>b.labAllocations)}
            courses={data?.allocationManagement?.courses}
          />
        </div>
      </div>

      {renderApprovalCard()}
      <BatchAllocationPreferenceTable
        loading={fetching}
        toast={toast}
        batches={data?.allocationManagement?.batches}
        courses={data?.allocationManagement?.courses}
        faculties={data?.allocationManagement?.faculties}
        preferences={data?.allocationManagement?.preferences}
        bestPreferences={data?.allocationManagement?.bestPreferences}
        courseAllocations={courseAllocations}
        labAllocations={labAllocations}
        setCourseAllocations={setCourseAllocations}
        setLabAllocations={setLabAllocations}
      />
    </div>
    </>
  );
}

export default AllocationManagement;
