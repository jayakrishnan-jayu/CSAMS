import {AllocationBatchType, AllocationCourseLabType, AllocationPreferenceType, CourseAllocationType, CourseLabType, CourseType, FacultyType, LabAllocationType, PreferenceType, useAddCourseAllocationMutation, useAddLabAllocationMutation, useAllocationManagementQuery, useDeleteCourseAllocationMutation, useDeleteLabAllocationMutation, useUpdateCourseAllocationMutation, useUpdateLabAllocationMutation } from '@/graphql/generated/graphql';

import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { classNames } from 'primereact/utils';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

interface BatchAllocationPreferenceTableProps {
    batches: AllocationBatchType[] | null | undefined
    toast: React.MutableRefObject<any>
    courses: CourseType[] | null | undefined
    preferences: AllocationPreferenceType[] | null | undefined
    faculties: FacultyType[] | null | undefined
    bestPreferences: string[] | null | undefined
    courseAllocations: null | CourseAllocationWithCourse[]
    labAllocations: LabAllocationWithCourse[]
    setCourseAllocations: (courses: null | CourseAllocationWithCourse[]) => void
    setLabAllocations: (labs: null | LabAllocationWithCourse[]) => void
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

export type CourseAllocationWithCourse = CourseField & CourseAllocationType
export type LabAllocationWithCourse = CourseField & LabAllocationType
type AllocationPreferenceFacultyType = AllocationPreferenceType & FacultyField

interface AllocationFields {
  allocationPreferences?: AllocationPreferenceFacultyType[]
  courseAllocations?: CourseAllocationWithCourse[]
  labAllocations?: LabAllocationWithCourse[]
  courseLabs?: AllocationCourseLabType[]
  allocated?: boolean
}

interface NameField {
  search: string
}

type FacultyDropDownField = FacultyType & NameField




type AllocationPreferenceCourseType = AllocationFields & CourseType

type ModeType =  null | 'addLabAllocation' | 'addCourseAllocation' | 'updateLabAllocation' | 'updateCourseAllocation' | 'deleteLabAllocation' | 'deleteCourseAllocation'
type AllocationType = 'Course' | 'Lab'
type DutyType = 'Incharge' | 'Assistant'


const BatchAllocationPreferenceTable = ({batches, courses, preferences, faculties, bestPreferences, loading, toast, courseAllocations, labAllocations, setCourseAllocations, setLabAllocations}: BatchAllocationPreferenceTableProps) => {
  const [expandedRows, setExpandedRows] = useState(null);
  const prefNums = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  const [mode, setMode] = useState<ModeType>(null);
  const [addCourseAllocation, addCourseAllocationMutation] = useAddCourseAllocationMutation();
  const [addLabAllocation, addLabAllocationMutation] = useAddLabAllocationMutation();
  const [updateCourseAllocation, updateCourseAllocationMutation] = useUpdateCourseAllocationMutation();
  const [updateLabAllocation, updateLabAllocationMutation] = useUpdateLabAllocationMutation();
  const [deleteCourseAllocation, deleteCourseAllocationMutation] = useDeleteCourseAllocationMutation();
  const [deleteLabAllocation, deleteLabAllocationMutation] = useDeleteLabAllocationMutation();

  let facultyDropdownvalues: FacultyDropDownField[] = [];

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


  if (mode === 'addCourseAllocation'){
    if (addCourseAllocation?.data?.addCourseAllocation?.response) {
      toast.current.show({ severity: 'success', summary: 'Course Allocation Added', life: 3000 });
      setCourseAllocations(addCourseAllocation?.data?.addCourseAllocation?.response?.courses);
      setLabAllocations(addCourseAllocation?.data?.addCourseAllocation?.response?.labs);
      setMode(null);
    }
    if (addCourseAllocation?.error?.message){
      toast.current.show({ severity: 'error', summary: 'Error allocating faculty to course', detail: addCourseAllocation.error.message, life: 3000 });
      setMode(null);
    }
  }
  if (mode === 'addLabAllocation'){
    if (addLabAllocation?.data?.addLabAllocation?.response) {
      toast.current.show({ severity: 'success', summary: 'Lab Allocation Added', life: 3000 });
      setCourseAllocations(addLabAllocation?.data?.addLabAllocation?.response?.courses);
      setLabAllocations(addLabAllocation?.data?.addLabAllocation?.response?.labs);
      setMode(null);
    }
    if (addLabAllocation?.error?.message){
      toast.current.show({ severity: 'error', summary: 'Error allocating faculty to lab', detail: addLabAllocation.error.message, life: 3000 });
      setMode(null);
    }
  }

  if (mode === 'updateCourseAllocation'){
    if (updateCourseAllocation?.data?.updateCourseAllocation?.response) {
      toast.current.show({ severity: 'success', summary: 'Course Allocation Updated', life: 3000 });
      setCourseAllocations(updateCourseAllocation?.data?.updateCourseAllocation?.response?.courses);
      setLabAllocations(updateCourseAllocation?.data?.updateCourseAllocation?.response?.labs);
      setMode(null);
    }
    if (updateCourseAllocation?.error?.message){
      toast.current.show({ severity: 'error', summary: 'Error updating course allocation', detail: updateCourseAllocation.error.message, life: 3000 });
      setMode(null);
    }
  }

  if (mode === 'updateLabAllocation'){
    if (updateLabAllocation?.data?.updateLabAllocation?.response) {
      toast.current.show({ severity: 'success', summary: 'Lab Allocation Updated', life: 3000 });
      setCourseAllocations(updateLabAllocation?.data?.updateLabAllocation?.response?.courses);
      setLabAllocations(updateLabAllocation?.data?.updateLabAllocation?.response?.labs);
      setMode(null);
    }
    if (updateLabAllocation?.error?.message){
      toast.current.show({ severity: 'error', summary: 'Error updating lab allocation', detail: updateLabAllocation.error.message, life: 3000 });
      setMode(null);
    }
  }

  if (mode === 'deleteCourseAllocation'){
    if (deleteCourseAllocation?.data?.deleteCourseAllocation?.response) {
      toast.current.show({ severity: 'success', summary: 'Course Allocation deleted', life: 3000 });
      setCourseAllocations(deleteCourseAllocation?.data?.deleteCourseAllocation?.response?.courses);
      setLabAllocations(deleteCourseAllocation?.data?.deleteCourseAllocation?.response?.labs);
      setMode(null);
    }
    if (deleteCourseAllocation?.error?.message){
      toast.current.show({ severity: 'error', summary: 'Error deleting course allocation', detail: deleteCourseAllocation.error.message, life: 3000 });
      setMode(null);
    }
  }

  if (mode === 'deleteLabAllocation'){
    if (deleteLabAllocation?.data?.deleteLabAllocation?.response) {
      toast.current.show({ severity: 'success', summary: 'Lab Allocation deleted', life: 3000 });
      setCourseAllocations(deleteLabAllocation?.data?.deleteLabAllocation?.response?.courses);
      setLabAllocations(deleteLabAllocation?.data?.deleteLabAllocation?.response?.labs);
      setMode(null);
    }
    if (deleteLabAllocation?.error?.message){
      toast.current.show({ severity: 'error', summary: 'Error deleting lab allocation', detail: deleteLabAllocation.error.message, life: 3000 });
      setMode(null);
    }
  }
  

  const onCourseAllocate = async (facultyID: string, courseID: string) =>  {
    setMode('addCourseAllocation');
    await addCourseAllocationMutation({COURSE_ID: courseID, FACULTY_ID: facultyID})
  }

  const onLabAllocate = async (facultyID: string, courseID: string, isInCharge: boolean) =>  {
    setMode('addLabAllocation');
    await addLabAllocationMutation({COURSE_ID: courseID, FACULTY_ID: facultyID, IS_IN_CHARGE: isInCharge})
  }

  const onCourseAllocationUpdate = async (allocationID: string, newFacultyID: string, oldFacultyID: string) =>  {
    setMode('updateCourseAllocation');
    await updateCourseAllocationMutation({ALLOCATION_ID: allocationID, NEW_FACULTY_ID: newFacultyID, OLD_FACULTY_ID: oldFacultyID })
  }

  const onLabAllocationUpdate = async (allocationID: string, newFacultyID: string, oldFacultyID: string) =>  {
    setMode('updateLabAllocation');
    await updateLabAllocationMutation({ALLOCATION_ID: allocationID, NEW_FACULTY_ID: newFacultyID, OLD_FACULTY_ID: oldFacultyID })
  }

  const onCourseAllocationDelete = async (allocationID: string, courseID: string) =>  {
    setMode('deleteCourseAllocation');
    await deleteCourseAllocationMutation({ALLOCATION_ID: allocationID, COURSE_ID: courseID })
  }

  const onLabAllocationDelete = async (allocationID: string, courseID: string) =>  {
    setMode('deleteLabAllocation');
    await deleteLabAllocationMutation({ALLOCATION_ID: allocationID, COURSE_ID: courseID })
  }

  const onFacultyAllocationChange = async (value:FacultyDropDownField, courseID: string, type: AllocationType, duty: DutyType,  create: boolean = false) => {
    const newFacultyID = value?.id;
    if (type === 'Course') {
      const ca =  courseAllocations.find(ca=>ca.courseId===courseID)
      console.log("value", value)
      if (value === undefined) {
        await onCourseAllocationDelete(ca?.id, ca?.courseId)
        return
      }
      if (ca?.id) {
        await onCourseAllocationUpdate(ca?.id, newFacultyID, ca?.facultyId)
        return
      }
      await onCourseAllocate(newFacultyID, courseID)
      return
    }
    if (type === 'Lab') {
      const la = labAllocations.find(la=>la?.courseId === courseID && la?.isInCharge === (duty === 'Incharge'))
      if (value === undefined) {
        await onLabAllocationDelete(la?.id, la?.courseId)
        return
      }
      if (la?.id && !create) {
        await onLabAllocationUpdate(la?.id, newFacultyID, la?.facultyId);
        return
      }
      await onLabAllocate(newFacultyID, courseID, duty === 'Incharge')
      return
    }
  }

  if (facultyDropdownvalues.length === 0 && faculties !== null && faculties !== undefined) {
    facultyDropdownvalues = faculties.map(f=> {return {...f, search: f?.user?.firstName + " " + f?.user?.lastName + " " + f?.user?.email}})
      
  }


  const getFacultyDropdownValue = (id: string) : FacultyDropDownField => {
    return facultyDropdownvalues.find(f => f?.id === id)
  }


  
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
      allocated: _ca?.length === 1 || _la?.filter(l=> l.isInCharge === true).length === 1
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

  const selectedFacultyTemplate = (option: FacultyType, props: any) => {
    if (option) {
        return (
            <div className="flex align-items-center">
                <div>{option?.user?.firstName} {option?.user?.lastName} - {option?.workload}/{option?.maxWorkload}</div>
            </div>
        );
    }

    return <span>{props.placeholder}</span>;
};

const facultyOptionTemplate = (option: FacultyType) => {
  return (
      <div className="flex align-items-center">
          <div>{option?.user?.firstName} {option?.user?.lastName} - {option?.user?.email} {option?.workload}/{option?.maxWorkload}</div>
      </div>
  );
};


  
  const rowExpansionTemplate = (data: AllocationPreferenceCourseType) => {
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

    const isLab = data?.code?.charAt(data?.code?.length - 2) === '8';
    const ca = data?.courseAllocations;
    const la = data?.labAllocations;
    
    const renderDropDownOption = () => {
      
      if (isLab) {

        const inChargeAllocation = la.find(l=>l.isInCharge === true)
        const assistantAllocations = la.filter(l=>l.isInCharge === false)

        return (
          <div className="grid p-fluid ">
            <div className="field col-12 md:col-6 ">
            <h6>{inChargeAllocation ?  "Allocated In Charge Faculty" : "Allocate In Charge Faculty"}</h6>
            <Dropdown 
              className='mb-2' 
              value={inChargeAllocation?.facultyId ? getFacultyDropdownValue(inChargeAllocation?.facultyId) : null}
              onChange={(e) => onFacultyAllocationChange(e.value, data?.id, 'Lab', 'Incharge')}  
              options={facultyDropdownvalues} 
              valueTemplate={selectedFacultyTemplate}
              itemTemplate={facultyOptionTemplate}
              optionLabel="search"
              placeholder="Select a Faculty"
              filter
              showClear
            />
            {
            assistantAllocations.map(a=>
              <Dropdown 
                className='mb-2' 
                value={a?.facultyId ? getFacultyDropdownValue(a?.facultyId) : null}
                onChange={(e) => onFacultyAllocationChange(e.value, data?.id, 'Lab', 'Assistant')}
                options={facultyDropdownvalues} 
                valueTemplate={selectedFacultyTemplate}
                itemTemplate={facultyOptionTemplate}
                optionLabel="search"
                placeholder="Select a Faculty"
                filter
                showClear
              />
              )
            }

            <Dropdown 
              className='mb-2' 
              onChange={(e) => onFacultyAllocationChange(e.value, data?.id, 'Lab', 'Assistant', true)}  
              options={facultyDropdownvalues} 
              valueTemplate={selectedFacultyTemplate}
              itemTemplate={facultyOptionTemplate}
              optionLabel="search"
              placeholder="Select a Faculty"
              filter
              showClear
            />
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
            <Button className='mb-2' label="Lab Assistant" severity="info" rounded disabled/>
            </span>
          </div>

        </div>
        );
      }
      if (!isLab) {
        const facultyID = ca[0]?.facultyId;
        return (
          <div className="grid p-fluid">
            <div className="field col-12 md:col-6 ">
              <h6>{facultyID ?  "Allocated Faculty" : "Allocate Faculty"}</h6>
              <Dropdown 
                  className='mb-2' 
                  value={facultyID ? getFacultyDropdownValue(facultyID) : null} 
                  onChange={(e) => onFacultyAllocationChange(e.value, data?.id, 'Course', 'Incharge')}  
                  options={facultyDropdownvalues} 
                  valueTemplate={selectedFacultyTemplate}
                  itemTemplate={facultyOptionTemplate}
                  placeholder="Select a Faculty"
                  optionLabel="search"
                  filter
                  showClear
                />
            </div>
          </div>
        );
    }
  }
    return (
      <div className="orders-subtable">
        {/* {renderLabAllocations()} */}
        {renderDropDownOption()}
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