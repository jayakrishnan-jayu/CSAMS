import { useBatchQuery } from '@/graphql/generated/graphql';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { Dropdown } from 'primereact/dropdown';
import { useRef, useState } from 'react';
import ExtraCourseMapping from './extraCourseMapping';

interface BatchUpdateSettingsProps {
    batchID: number
}

const BatchUpdateSettings = ({batchID}:BatchUpdateSettingsProps) => {
    
    const [result] = useBatchQuery({variables:{BATCHID:batchID.toString()}})
    const {fetching, data, error} = result;

    if (error) return <div>Failed to fetch batch details: {error.message}</div>;
    // console.log(data?.batch?.curriculum);
    const renderExtraCourses = () => {
        if (data?.batch?.semesterExtraCourses && data.batch.semesterExtraCourses.length > 0) {
            return (
            <div>
                <h5>Extra Courses</h5>
                <ListBox value={null} onChange={(e) => console.log(e.value)} options={data?.batch?.semesterExtraCourses}  />
                <h5>Mapping</h5>
                <ExtraCourseMapping batchID={batchID} program={data.batch.curriculum?.program} curriculumYear={data.batch.curriculum?.year} extras={data.batch.semesterExtraCourses}/>
                
            </div>
            );
        }
        return <div>
            No Extra Courses for this batch
        </div>
    }
    return (
        <div className="card">
            <h5>{data?.batch?.curriculum?.program} {data?.batch?.year} Batch</h5>
            {/* <Toast ref={toast} /> */}
            <div className="grid p-fluid mt-5">
                <div className="field col-12 md:col-6">
                    <span className="">
                    <h6>Curriculum</h6>
                    <InputText
                        type="text"
                        value={data?.batch?.curriculum?.program + " " + data?.batch?.curriculum?.year}
                        disabled
                    ></InputText>
                    </span>
                </div>
                <div className="field col-12 md:col-6">
                    <span className="">
                    <h6>Semester</h6>
                    <InputText
                        type="number"
                        value={data?.batch?.sem}
                        disabled
                    ></InputText>
                    </span>
                </div>
            </div>
            {renderExtraCourses()}
                
        </div>
    );
}

export default BatchUpdateSettings;