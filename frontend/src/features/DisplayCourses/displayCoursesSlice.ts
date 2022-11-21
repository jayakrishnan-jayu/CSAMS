import { createSlice,PayloadAction } from "@reduxjs/toolkit";

// type defnitions :


export interface GetCoursesParams
{
    program: string,
    year : number ,
    sem?: number

} 

export interface CourseData 
{
    batch : string ,
    code : string ,
    name : string ,
    credit: number ,
    hours : number ,
    I : number ,
    t : number ,
    p : number ,
    isElective : boolean
}


// Reducers
// 1. One possible usage of having a reducer 


const displayCourseSlices = createSlice({
    setfieldValues : 
})




