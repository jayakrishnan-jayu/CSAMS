import React from 'react';
import { CurriculumUploadInput, useUploadCurriculumMutation } from '@/graphql/generated/graphql';
import { Button } from 'primereact/button';


interface DoneCurriculumProps {
    curriculum: CurriculumUploadInput,
}

const DoneCurriculum = ({curriculum} : DoneCurriculumProps) => {
    const [newCurriculum, uploadCurriculum] = useUploadCurriculumMutation();
    
    
    // const output: { [year: number]: number[] } = {};
    // if (vc) {
    //     for (const batch of vc) {
    //         if (batch?.sem && batch.year) {
    //             if (output[batch.year]) {
    //                 output[batch.year].push(batch.sem);
    //             } else {
    //                 output[batch.year] = [batch.sem];
    //             }
    //         }
    //     }
    // }
    


    return (
        <div className="grid">
            
            <div className="col-12">
                <div className='card'>
                    {newCurriculum.fetching ?? <div>Uploading</div>}
                    {newCurriculum.error?.message ?? <div>{JSON.stringify(newCurriculum.error?.message)}</div>}
                    {newCurriculum.data?.uploadCurriculum?.curriculum ?? <div>{newCurriculum.data?.uploadCurriculum?.curriculum}</div>}
                    {/* <h6>Uploading the selected curriculum {program}-{year} would apply for the following batches:</h6> */}
                
                    {/* {Object.keys(output).map((y) => 
                        {
                            return <ul>
                                {output[y].map(s => <li>{program}-{y} Semester {s}</li>)}
                            </ul>
                        }
                    )}                     */}
                </div>
        
                <div className="flex align-items-center flex-wrap">
                    <div className="flex mt-6 ml-auto mr-auto">
                        <Button 
                            label='Continue'
                            icon="pi pi-check"
                            onClick={() => uploadCurriculum({CURRICULUM: curriculum})}
                        />
                    </div>
                </div>
            
                
            </div>
        </div>
    );
};


export default DoneCurriculum;
