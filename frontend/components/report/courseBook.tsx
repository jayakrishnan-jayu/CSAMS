import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import {useAllocationManagementQuery,AllocationManagementQuery} from "@/graphql/generated/graphql";


const facultyIds: string[] = [];
const courseIds : string[] = [] ;
const FacultyNames  = [] ;
const CourseInfo = []

export default function CourseBook() {
    const toast = useRef(null);

    const [result] = useAllocationManagementQuery({requestPolicy: 'network-only'})
    const {fetching, data, error} = result
    GetFacultyCourseMapping(data)



    const getCourseInfo = ()=>{
        courseIds.forEach( (courseId)=> {
        CourseInfo.push(data.allocationManagement?.courses?.find(c=>c.id == courseId))
        })
    }



    const getFacultyName = ()=> {
       FacultyNames.push (facultyIds.forEach((facultyId)=>{
           FacultyNames.push(data.allocationManagement.faculties.find(f=>f.id == facultyId ))
        }))
    }

    getCourseInfo()
    getFacultyName()


    const handleClick = () => {

        toast.current.show({
            severity: "success",
            summary: "Report Generated",
            life: 3000,
        });
    };

  return (
    <div className="mt-4">
      {/* <div className="card"> */}
      <Toast ref={toast} />
      <Button
        //   icon="pi pi-chevron-down"
        label="Generate"
        className="p-button-rounded p-button-success mr-2 ml-3"
        onClick={() => handleClick()}
      />
      {/* </div> */}
    </div>
  );
}



function GetFacultyCourseMapping(data: AllocationManagementQuery) {


    data.allocationManagement.batches.forEach((batch) => {
        batch.courseAllocations.forEach((allocation) => {
            const { courseId, facultyId } = allocation
            facultyIds.push(facultyId)
            courseIds.push(courseId)

        });

        batch.labAllocations.forEach((allocation) => {
            const { courseId, facultyId } = allocation
            facultyIds.push(facultyId)
            courseIds.push(courseId)
        });
    });

}




