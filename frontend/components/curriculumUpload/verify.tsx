import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CurriculumUploadInput, useVerifyNewCurriculumQuery } from '@/graphql/generated/graphql';


interface VerifyCurriculumProps {
    curriculum: CurriculumUploadInput,
    onVerify: ()=>void,
}

const VerifyCurriculum = ({curriculum, onVerify} : VerifyCurriculumProps) => {
    const {program, extra, semesters, year} = curriculum;
    // const [result] = useVerifyNewCurriculumQuery({variables: {PROGRAM: program, YEAR: year}});
    // const {} = result;

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
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                <h5>{program}-{year} Curriculum</h5>
                    {semesters.map((s) => renderTable([...s.courses, ...s.extra], () => renderSemsterTitle(s.sem)))}
                    {extra.map((e) => renderTable(e.courses, () => renderElectiveTitle(e.name)))}
                </div>
                <div className="flex align-items-center flex-wrap">
                    <div className="flex mt-6 ml-auto mr-auto">
                        <Button 
                            label='Continue'
                            icon="pi pi-check"
                            onClick={onVerify}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default VerifyCurriculum;
