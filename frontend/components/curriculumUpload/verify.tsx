import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CourseInput, CourseLabInput, CurriculumUploadInput, CurriculumUploadType, InputMaybe, useCurriculumUploadQuery } from '@/graphql/generated/graphql';


interface VerifyCurriculumProps {
    curriculum_program: string,
    curriculum_year: number,
    footerElement?: () => JSX.Element,
}

const VerifyCurriculum = ({curriculum_program, curriculum_year, footerElement} : VerifyCurriculumProps) => {
    const [result] = useCurriculumUploadQuery({variables:{PROGRAM: curriculum_program, YEAR:curriculum_year }})
    const {data, fetching, error} = result;
    if (error?.message) return <div>Failed to load data: {error.message}</div>
    if (fetching) return <div>Loading</div>
    
    const {program, extra, semesters, year}: CurriculumUploadInput = JSON.parse(data?.curriculumUpload?.data);
    const renderSemsterTitle = (sem : number) => {
        return (
            <div className="flex justify-content-between">
                <span>Semester - {sem}</span>
            </div>
        );
    };

    const renderElectiveTitle = (name : string) => {
        return (
            <div className="flex justify-content-between">
                <span>{name}</span>
            </div>
        );
    };

    const renderLabTitle = (sem : number) => {
        return (
            <div className="flex justify-content-between">
                <span>Semester {sem} Labs</span>
            </div>
        );
    };

    const renderTable = (courses: any[], renderTitle: ()=>JSX.Element) => {
        return (
            <div>
                    <DataTable
                        value={courses}
                        className="p-datatable-gridlines mb-4"
                        showGridlines
                        rows={15}
                        dataKey="id"
                        filterDisplay="menu"
                        responsiveLayout="scroll"
                        emptyMessage="No faculties found."
                        header={renderTitle}
                    >
                        <Column field="code" header="Code" style={{ minWidth: '4rem' }} />
                        <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
                        <Column field="L" header="L" style={{ minWidth: '2rem' }} />
                        <Column field="T" header="T" style={{ minWidth: '2rem' }} />
                        <Column field="P" header="P" style={{ minWidth: '2rem' }} />
                        <Column field="C" header="C" style={{ minWidth: '2rem' }} />
                    </DataTable>
                </div>

        )
    }

    const courseByCode = (courses:InputMaybe<CourseInput>[], courseCode: string | undefined): InputMaybe<CourseInput> => {
        return courses.filter((c) => c?.code === courseCode)[0]
    }

    const renderCourseLabsTable = (courseLabs: InputMaybe<CourseLabInput>[] | undefined, courses:InputMaybe<CourseInput>[] | undefined, sem:number | undefined) => {
        let data;
        if (courseLabs && courses) {
            data = courseLabs.map(cl => {
                let course = courseByCode(courses, cl?.courseCode);
                let lab = courseByCode(courses, cl?.labCode);
                return {"cCode": cl?.courseCode, "lCode":cl?.labCode, "cName": course?.name, "lName": lab?.name};
            });
        }
        if (data?.length === 0) {
            return undefined;
        }
        return (
            <div>
                    <DataTable
                        value={data}
                        className="p-datatable-gridlines mb-4"
                        showGridlines
                        rows={15}
                        dataKey="id"
                        filterDisplay="menu"
                        responsiveLayout="scroll"
                        emptyMessage="No faculties found."
                        header={"Course Labs - Semester "+sem}
                    >
                        <Column field="cCode" header="Course Code" style={{ minWidth: '4rem' }} />
                        <Column field="cName" header="Course Name" style={{ minWidth: '12rem' }} />
                        <Column field="lCode" header="Lab Code" style={{ minWidth: '4rem' }} />
                        <Column field="lName" header="Lab Name" style={{ minWidth: '12rem' }} />
                    </DataTable>
                </div>

        )
    }

    const labsOnlyFilter = (courseLabs: InputMaybe<CourseLabInput>[] | undefined, courses:InputMaybe<CourseInput>[] | undefined, sem:number | undefined) => {
        if (courseLabs && courses) {
            let data =  courses.filter(c => c?.code.substring(c.code.length-2, c.code.length-1) === '8').filter(c => courseLabs.filter(cl => cl?.labCode === c?.code).length === 0);
            if (data.length !== 0) return data;
        }
        return undefined;
    }
    
    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                <h5>{program}-{year} Curriculum</h5>
                    {semesters.map((s) => renderTable([...s.courses, ...s.extra.map(e => {return {'name': e}})], () => renderSemsterTitle(s.sem)))}
                    {extra.map((e) => renderTable(e.courses, () => renderElectiveTitle(e.name)))}
                    {semesters.map(s => {let data = renderCourseLabsTable(s?.courseLabs, s?.courses, s?.sem); if (data !== undefined) return data;})}
                    {semesters.map(s => {let data = labsOnlyFilter(s?.courseLabs, s?.courses, s?.sem); if (data !== undefined) return renderTable(data, () => renderLabTitle(s.sem))})}
                </div>
                {footerElement && footerElement()}
            </div>
        </div>
    );
};


export default VerifyCurriculum;
