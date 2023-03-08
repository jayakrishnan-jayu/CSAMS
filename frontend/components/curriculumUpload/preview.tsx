import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CurriculumUploadInput, VerifyNewCurriculumQuery } from '@/graphql/generated/graphql';
import { Button } from 'primereact/button';


interface PreviewCurriculumProps {
    curriculum: CurriculumUploadInput,
    verifiedCourses: VerifyNewCurriculumQuery, 
    onPreviewComplete: ()=>void,
}

const PreviewCurriculum = ({curriculum, verifiedCourses, onPreviewComplete} : PreviewCurriculumProps) => {
    const {program, year} = curriculum;
    const vc = verifiedCourses.verifyNewCurriculum;
    
    const output: { [year: number]: number[] } = {};
    if (vc) {
        for (const batch of vc) {
            if (batch?.sem && batch.year) {
                if (output[batch.year]) {
                    output[batch.year].push(batch.sem);
                } else {
                    output[batch.year] = [batch.sem];
                }
            }
        }
    }
    


    return (
        <div className="grid">
            
            <div className="col-12">
                <div className='card'>
                    <h6>Uploading the selected curriculum {program}-{year} would apply for the following batches:</h6>
                
                    {Object.keys(output).map((y) => 
                        {
                            return <ul>
                                {output[y].map(s => <li>{program}-{y} Semester {s}</li>)}
                            </ul>
                        }
                    )}                    
                </div>
                <div className="flex align-items-center flex-wrap">
                    <div className="flex mt-6 ml-auto mr-auto">
                        <Button 
                            label='Continue'
                            icon="pi pi-check"
                            onClick={onPreviewComplete}
                        />
                    </div>
                </div>
                
            </div>
        </div>
    );
};


export default PreviewCurriculum;
