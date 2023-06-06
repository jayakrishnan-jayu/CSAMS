import { useAllocationManagementQuery } from '@/graphql/generated/graphql';
import React, { useRef, useState } from 'react';
import FacultyPreferenceAllocationTable from './facultyPreferenceAllocationTable';
import BatchAllocationPreferenceTable, { CourseAllocationWithCourse, LabAllocationWithCourse } from './batchAllocationPreferenceTable';
import { Toast } from 'primereact/toast';


const AllocationManagement = () => {
  const [result] = useAllocationManagementQuery({requestPolicy: 'network-only'})
  const {fetching, data, error} = result;
  console.log(data)
  const toast = useRef(null);



  const [courseAllocations, setCourseAllocations] = useState<null | CourseAllocationWithCourse[]>(null);
  console.log(courseAllocations)
  const [labAllocations, setLabAllocations] = useState<null | LabAllocationWithCourse[]>(null);


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
