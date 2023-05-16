import {AllocationBatchType, AllocationCourseLabType, AllocationPreferenceType, CourseAllocationType, CourseLabType, CourseType, FacultyType, LabAllocationType, PreferenceType, useAllocationManagementQuery } from '@/graphql/generated/graphql';

import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { classNames } from 'primereact/utils';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';

interface BatchAllocationPreferenceTableProps {
    batches: AllocationBatchType[] | null | undefined
    courses: CourseType[] | null | undefined
    preferences: AllocationPreferenceType[] | null | undefined
    faculties: FacultyType[] | null | undefined
    bestPreferences: string[] | null | undefined
    loading: boolean
}

interface CourseFacultyPreferenceTableDataType {
  experience?: number
  weightage?: string
  faculty?: string
  email?: string
  score?: number
  timestamp?: any
  track?: string
  designation?: string
  best?: boolean
  minWorkload?: number
  maxWorkload?: number
  workload?: number
}

interface CourseField {
  course?: CourseType
}

interface FacultyField {
  faculty?: FacultyType
}

type CourseAllocationWithCourse = CourseField & CourseAllocationType
type LabAllocationWithCourse = CourseField & LabAllocationType
type AllocationPreferenceFacultyType = AllocationPreferenceType & FacultyField

interface AllocationFields {
  allocationPreferences?: AllocationPreferenceFacultyType[]
  courseAllocations?: CourseAllocationWithCourse[]
  labAllocations?: LabAllocationWithCourse[]
  courseLabs?: AllocationCourseLabType[]
  allocated?: boolean
}


type AllocationPreferenceCourseType = AllocationFields & CourseType

const BatchAllocationPreferenceTable = ({batches, courses, preferences, faculties, bestPreferences, loading}: BatchAllocationPreferenceTableProps) => {
  const [courseAllocations, setCourseAllocations] = useState<null | CourseAllocationWithCourse[]>(null);
  const [labAllocations, setLabAllocations] = useState<null | LabAllocationWithCourse[]>(null);
  const getCourse = (id: string): CourseType | null => {
    const c = courses?.filter(c=>c.id === id)
    if (c?.length == 1) return c[0];
    return null;
  }
  
  const getFaculty = (id: string): FacultyType | null => {
    const f = faculties?.filter(c=>c.id === id)
    if (f?.length == 1) return f[0];
    return null;
  }


  const retriveCourseAllocations = (): CourseAllocationWithCourse[] => {
    return batches?.flatMap(batch => 
      batch.courseAllocations.flatMap(ca => {
          return {...ca, course: getCourse(ca?.courseId)};
        })
      );
  }

  const retriveLabAllocations = (): LabAllocationWithCourse[] => {
    return batches?.flatMap(batch => 
      batch.labAllocations.flatMap(la => {
          return {...la, course: getCourse(la?.courseId)};
        })
      );
  }


  if ((courseAllocations === null || courseAllocations === undefined) && (courses !== null || courses !== undefined)) {
    const data = retriveCourseAllocations();
    if (data !== undefined && data !== null) setCourseAllocations(data);
  }
  if ((labAllocations === null || labAllocations === undefined) &&  (courses !== null || courses !== undefined)) {
    const data = retriveLabAllocations();
    if (data !== undefined && data !== null) setLabAllocations(retriveLabAllocations());
  }
  const [expandedRows, setExpandedRows] = useState(null);
  const prefNums = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];


  
  const combinePreferenceWithFaculty = (preference: AllocationPreferenceType) : AllocationPreferenceFacultyType => {
    return {
      ...preference,
      faculty: getFaculty(preference.facultyId)
    }
  }

  const combineCourseWithAllocationFields = (course: CourseType, ca: CourseAllocationType[], la: LabAllocationType[], cl: AllocationCourseLabType[]): AllocationPreferenceCourseType => {
    const _ca = ca?.map(c=>{return {...c, course: getCourse(c?.courseId)}});
    const _la = la?.map(c=>{return {...c, course: getCourse(c?.courseId)}})
    return {
      ...course,
      allocationPreferences: preferences.filter(p=>p.courseId === course.id).map(p=>combinePreferenceWithFaculty(p)),
      courseAllocations: _ca,
      labAllocations: _la,
      courseLabs: cl,
      allocated: _ca?.length === 1 || _la?.length === 1
    }
  }

  // const designationBodyTemplate = (rowData: CourseFacultyPreferenceTableDataType) => {
  //   return <span className={`generic-badge designation-${rowData?.designation?.toLowerCase().replace(/ +/g, "")}`}>{rowData?.designation}</span>;
  // };
  
  // const trackBodyTemplate = (rowData: CourseFacultyPreferenceTableDataType) => {
  //   return <span className={`generic-badge track-${rowData?.track?.toLowerCase()}`}>{rowData?.track}</span>;
  // };

  const prefBodyTemplate = (rowData: CourseFacultyPreferenceTableDataType) => {
    return <span className={`generic-badge preference-${rowData?.weightage}`}>{rowData?.weightage}</span>;
  };
  
  const isBestBodyTemplate = (rowData: CourseFacultyPreferenceTableDataType) => {
    return <i className={classNames('pi', { 'text-green-500 pi-heart-fill': rowData?.best })}></i>;
  };

  const workloadBodyTemplate = (rowData: CourseFacultyPreferenceTableDataType) => {
    let value = 0;
    const x = rowData?.workload - rowData?.minWorkload;
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
  
  const isActiveBodyTemplate = (rowData:AllocationPreferenceCourseType ) => {
    return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData?.allocated, 'text-pink-500 pi-times-circle': !rowData?.allocated })}></i>;
  };

  const courseLabBodyTemplate = (rowData: AllocationPreferenceCourseType) => {
    const c = rowData?.courseLabs?.filter(cl => cl?.courseId === rowData?.id);
    if (c.length === 1) {
       const index = rowData?.courseLabs?.indexOf(c[0]);
       if (index >= 0 && index <prefNums.length) return <span className={`generic-badge preference-${prefNums[index]}`}>Course</span>;
       return <Tag value="Course"></Tag>
    }
    const l = rowData?.courseLabs?.filter(cl => cl?.labId === rowData?.id)
    if (l.length === 1) {
       const index = rowData?.courseLabs?.indexOf(l[0]);
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
  
  const rowExpansionTemplate = (data: AllocationPreferenceCourseType) => {
    if (data?.allocationPreferences?.length === 0) return <div>No Preferences yet!</div>
    const value: CourseFacultyPreferenceTableDataType[] = data.allocationPreferences.map(p=> {return {
      experience: p?.experience,
      weightage: p?.weigtage && p.weigtage >= 1 && p.weigtage <=6 ? prefNums[p.weigtage-1] : p?.weigtage.toString(),
      faculty: p?.faculty?.user?.firstName + " " + p?.faculty?.user?.lastName,
      email: p?.faculty?.user?.email,
      score: p?.score,
      timestamp: p?.timestamp,
      track: p?.faculty?.track,
      designation: p?.faculty?.designation,
      best: bestPreferences.includes(p?.id),
      minWorkload: p?.faculty?.minWorkload,
      maxWorkload: p?.faculty?.maxWorkload,
      workload: p?.faculty?.workload,
    }})

    // const ca = data?.courseAllocations;
    // const la = data?.labAllocations;
    

    // const renderCourseAllocationButton = (selectedFaculty: FacultyType)

    // const renderLabAllocations = () => {
    //   return (<>
    //     {/* {la.map(a => {
    //       const faculty = getFaculty(a?.facultyId);
    //       return 
    //     })
    //     } */}
    //   </>);
    // }

    return (
      <div className="orders-subtable">
        {/* {renderLabAllocations()} */}
        {/* <Dropdown value={data?.courseAllocations[0]?.facultyId}/> */}
        <DataTable 
          value={value}
          loading={loading}
        >
          <Column header="Best" body={isBestBodyTemplate}></Column>
          <Column field="faculty" header="Faculty"></Column>
          <Column field="email" header="Email"></Column>
          {/* <Column field="designation" header="Designation" style={{ minWidth: '15rem' }} body={designationBodyTemplate}  /> */}
          {/* <Column field="track" header="Track" style={{ minWidth: '6rem' }} body={trackBodyTemplate} /> */}
          <Column field="weightage" header="Pref" body={prefBodyTemplate}></Column>
          <Column field="experience" header="Exp"></Column>
          <Column field="score" header="Score"></Column>
          <Column field="workload" header="Min/Cur/Max working Hours" sortable style={{ minWidth: '12rem' }} body={workloadBodyTemplate} />
        </DataTable>
      </div>
    );
  };
  
  const renderBatchTable = (batch: AllocationBatchType) => {
    const batchCourses = batch?.courseIds.map(cID=>getCourse(cID));
    const _ca = courseAllocations?.filter(ca=>batch.courseIds.includes(ca.courseId));
    const _la = labAllocations?.filter(la=>batch.courseIds.includes(la.courseId));
    const tableData = batchCourses?.map(c => 
      combineCourseWithAllocationFields(
        c, 
        // batch.courseAllocations.filter(ca=>ca.courseId === c.id), 
        // batch.labAllocations.filter(la=>la.courseId === c.id),
        _ca?.filter(ca=>ca.courseId === c.id),
        _la?.filter(la=>la.courseId === c.id),
        batch.courseLabs,

      )
    ); 
    return (
    <div className="col-12">
      <div className="card">
        <h5>{batch.batchYear} S{batch.batchSem} {batch.curriculumName} Batch</h5>
        <div>Curriculum {batch.curriculumName} {batch.curriculumYear}</div>
        <DataTable
          value={tableData}
          className="datatable-responsive"
          expandedRows={expandedRows}
          onRowToggle={(b) => setExpandedRows(b.data)}
          rowExpansionTemplate={rowExpansionTemplate}
        >
          <Column expander style={{ width: '3em' }} />
          <Column field="code" header="Code" style={{ minWidth: '2rem' }} />
          <Column field="name" header="Name" style={{ minWidth: '2rem' }} />
          <Column field="l" header="L" style={{ minWidth: '2rem' }} />
          <Column field="t" header="T" style={{ minWidth: '2rem' }} />
          <Column field="p" header="P" style={{ minWidth: '2rem' }} />
          <Column field="allocated" header="Allocated" dataType="boolean" bodyClassName="text-center"  style={{ minWidth: '2rem' }} body={isActiveBodyTemplate} />
          <Column bodyClassName="text-center"  body={courseLabBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
    );
  }
  return (<>{batches && courses && batches.map(b => renderBatchTable(b))}</>)
}

export default BatchAllocationPreferenceTable;