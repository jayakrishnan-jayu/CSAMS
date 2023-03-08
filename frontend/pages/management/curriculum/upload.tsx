import React, {useEffect, useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import UploadCurriculum from '@/components/curriculumUpload/upload';
import VerifyCurriculum from '@/components/curriculumUpload/verify';
import PreviewCurriculum from '@/components/curriculumUpload/preview';
import { Toast } from 'primereact/toast';
import { VerifyNewCurriculumQuery, CurriculumUploadInput } from '@/graphql/generated/graphql';
import DoneCurriculum from '@/components/curriculumUpload/done';

const Upload = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [curriculum, setCurriculum] = useState<CurriculumUploadInput | null>(null);
    const [verifiedCourses, setVerifiedCourses] = useState<VerifyNewCurriculumQuery|null>(null)
    const toast = useRef(null);

    useEffect(() => {
        if (curriculum) setActiveIndex(1);
    }, [curriculum]);
    
    const items = [
        { label: 'Upload Curriculum'},
        { label: 'Verify'},
        { label: 'Preview of batches to be created'},
        { label: 'Done'}
    ];

const onUpload = (c : CurriculumUploadInput, verifiedCourses: VerifyNewCurriculumQuery) => {
    setCurriculum(c);
    setVerifiedCourses(verifiedCourses)
}

const onVerify = () => {
    setActiveIndex(2);
}

const onPreviewComplete = () => {
    setActiveIndex(3);
}


const render = (activeIndex: number) => {
    switch(activeIndex){
        case 0:
            return <UploadCurriculum onUpload={onUpload} toast={toast}/>;
        case 1:
            console.log("veryifying curriculum")
            if (curriculum) return <VerifyCurriculum curriculum={curriculum} onVerify={onVerify}/>;
            setActiveIndex(0)
            break;
        case 2:
            if (curriculum && verifiedCourses) return <PreviewCurriculum curriculum={curriculum} verifiedCourses={verifiedCourses} onPreviewComplete={onPreviewComplete}/>;
            setActiveIndex(0)
            break;
        case 3:
            if (curriculum && verifiedCourses) return <DoneCurriculum curriculum={curriculum}/>;
            setActiveIndex(0)
            break;
    }
}


    return (
        <div className="grid p-fluid">
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <h5>Steps</h5>
                    <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
                    <div className="mt-4">
                        {render(activeIndex)}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Upload;
