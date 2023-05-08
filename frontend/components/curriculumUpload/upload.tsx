import { useState, useRef, useEffect } from 'react';
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { VerifyNewCurriculumQuery, useVerifyNewCurriculumQuery, CurriculumUploadInput } from '@/graphql/generated/graphql';

interface UploadCurriculumProps {
    onUpload: (c: CurriculumUploadInput, verifiedCourses: VerifyNewCurriculumQuery)=>void
    toast: any;
}


const UploadCurriculum = ({onUpload, toast}: UploadCurriculumProps) => {
    const [totalSize, setTotalSize] = useState<number>(0);
    const [curriculum, setCurriculum] = useState<CurriculumUploadInput|null>(null)
    const [validFormat, setValidFormat] = useState<boolean>(false)
    const [verifiedCourses, setVerifiedCourses] = useState<VerifyNewCurriculumQuery|null>(null)
    const fileUploadRef = useRef<null | FileUpload>(null);
    
    useEffect(() => {
        setVerifiedCourses(null);
        setValidFormat(false);
        if (curriculum == null || !validCurriculum(curriculum)) {
            return;
        }
        setValidFormat(true)
    }, [curriculum]);

    const onContinue = () => {
        if (curriculum !== null && verifiedCourses !== null && validFormat) {
            toast.current.show({ severity: 'success', summary: 'Valid', detail: 'Curriculum', life: 3000 });
            onUpload(curriculum, verifiedCourses)
        }
    }

    const validCurriculum = (c: CurriculumUploadInput) =>  {
        const programs = ["MCA", "BCA", "BCA DS"]
        if (programs.indexOf(c.program) === -1) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid Curriculum program name', life: 10000 });
            return false;
        }
        if (typeof c.year === "number" && c.year < 2000 && c.year > 3000) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid Curriculum Year', life: 10000 });
            return false;
        }
        // TODO further check
        return true;
    }

    const onTemplateSelect = (e) => {
        const fr: any = new FileReader();
        let tmpTotalSize = totalSize;

        Array.from(e.files).forEach((file: any) => {
            tmpTotalSize += file.size;
        });
        setTotalSize(tmpTotalSize);

        fr.addEventListener("load", e => {
            let result: CurriculumUploadInput = JSON.parse(fr.result)
            result.year = parseInt(JSON.parse(fr.result)['year'])
            setCurriculum(result)
        });
        fr.readAsText(e.files[0]);
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setCurriculum(null)
    };

    const invalidFormatTemplate = (
        <div className="flex align-items-center flex-wrap">
        <div className="flex mt-6 ml-auto mr-auto">
            <Tag severity="danger" value="Invalid Format"/>
        </div>
    </div>
    )

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;

        return (
            <div
                className={className}
                style={{
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {chooseButton}
                {cancelButton}
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div>
                <div className="flex align-items-center flex-wrap">
                    <div className="flex align-items-center">
                        <span className="flex flex-column text-left ml-3">
                            {file.name}
                            <small>{new Date().toLocaleDateString()}</small>
                        </span>
                    </div>
                    <Tag
                        value={props.formatSize}
                        severity="info"
                        className="border-change ml-auto px-3 py-2"
                    />
                </div>
            </div>
            
        );
    };

    const continueTemplate = () => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex mt-6 ml-auto mr-auto">
                    <Button 
                    label='Continue'
                    icon="pi pi-check"
                    onClick={onContinue}
                    />
                </div>
        </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i
                    className="pi pi-code mt-3 p-5"
                    style={{
                        fontSize: '5em',
                        borderRadius: '50%',
                        backgroundColor: 'var(--surface-b)',
                        color: 'var(--surface-d)',
                    }}
                />
                <span
                    style={{
                        fontSize: '1.2em',
                        color: 'var(--text-color-secondary)',
                    }}
                    className="my-5"
                >
                    Drag and Drop curriculum data here
                </span>
            </div>
        );
    };


    const chooseOptions = {
        label: 'Choose JSON',
        icon: 'pi pi-fw pi-image',
        className: 'button-gradient p-button-oulined',
    };

    const cancelOptions = {
        label: 'Cancel',
        icon: 'pi pi-fw pi-times',
        className: 'button-gradient p-button-outlined',
    };

    const onVerify = (data : VerifyNewCurriculumQuery) => {
        setVerifiedCourses(data)
        
    }

    return (
        <div>
            <div className="flex flex-row">
                
                <Card
                    className="border-change shadow-6 mr-3"
                    style={{ width: '-webkit-fill-available' }}
                >
                    <FileUpload
                        ref={fileUploadRef}
                        name="curriculum"
                        accept="application/json"
                        customUpload
                        maxFileSize={1000000}
                        style={{ width: '-webkit-fill-available' }}
                        // onUpload={onTemplateUpload}
                        onSelect={onTemplateSelect}
                        onError={onTemplateClear}
                        onClear={onTemplateClear}
                        headerTemplate={headerTemplate}
                        itemTemplate={itemTemplate}
                        progressBarTemplate={<></>}
                        emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions}
                        cancelOptions={cancelOptions}
                    />
                </Card>        
            </div>
            {curriculum !== null && verifiedCourses && validFormat && continueTemplate()}
            {curriculum !== null && verifiedCourses === null && <Verification curriculum={curriculum} onVerify={onVerify}/>}
            {curriculum !== null && !validFormat && invalidFormatTemplate}
        </div>
    );
};

interface VerificationProps {
    curriculum: CurriculumUploadInput;
    onVerify: (data: VerifyNewCurriculumQuery) => void;
}
const Verification = ({curriculum, onVerify, }: VerificationProps) => {
    const [result] = useVerifyNewCurriculumQuery({variables:{PROGRAM: curriculum.program, YEAR: curriculum.year}})
    const {fetching, data, error} = result;
    if(data?.verifyNewCurriculum) onVerify(data);
    return (
        <div className="flex align-items-center flex-wrap">
            <div className="flex mt-6 ml-auto mr-auto">
                {fetching && <Tag severity="info" value="Verifying.."/>}
                {error && <Tag severity="danger" value={error.message}/>}
            </div>
        </div>
    )
}

export default UploadCurriculum;
