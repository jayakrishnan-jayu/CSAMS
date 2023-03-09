import React, { useState } from 'react';
import { CurriculumUploadInput, useUploadCurriculumMutation, CurriculumUploadType } from '@/graphql/generated/graphql';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';

interface DoneCurriculumProps {
    curriculum: CurriculumUploadInput,
    curriculumUploadData?: CurriculumUploadType,
    onDoneCurriculumUpload: (data: CurriculumUploadType) => void,
}

const DoneCurriculum = ({curriculum, curriculumUploadData, onDoneCurriculumUpload} : DoneCurriculumProps) => {
    const router = useRouter();
    const [newCurriculum, uploadCurriculum] = useUploadCurriculumMutation();
    if (newCurriculum.data?.uploadCurriculum){
        onDoneCurriculumUpload(newCurriculum.data.uploadCurriculum as CurriculumUploadType)
    }
    
    const renderUploadButton = () => {
        if (!curriculumUploadData) {
            return (
                <div className="flex align-items-center flex-wrap mb-8 mt-8">
                    <div className="flex mt-6 ml-auto mr-auto">
                    {
                        !newCurriculum.error ? 
                        <Button 
                            label={newCurriculum.fetching ? 'Uploading' : `Upload ${curriculum.program} ${curriculum.year} curriculum`}
                            icon={newCurriculum.fetching ? "pi pi-spin pi-spinner" : "pi pi-upload"}
                            onClick={() => uploadCurriculum({CURRICULUM: curriculum})}
                        /> : <Tag severity="danger" value={newCurriculum.error.message}/> 
                    }
                        
                    </div>
            </div>
            );
        }
        return (
            <div className="flex align-items-center flex-wrap mb-8 mt-8">
                <div className="flex mt-6 ml-auto mr-auto">
                    Curriculum Uploaded
                    <Button 
                        label="Go to manage section"
                        icon="pi pi-next"
                        onClick={() => {router.push("/management/curriculum/manage")}}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="grid">
            <div className="col-12">
            {renderUploadButton()}
            {newCurriculum.fetching && <div>Fetching </div>}
            </div>
        </div>
    );
};


export default DoneCurriculum;
