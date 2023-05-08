import { useBatchQuery, useCurriculumExtraCoursesQuery, useAddBatchExtraCourseMutation, useUpdateBatchExtraCourseMutation, useDeleteBatchExtraCourseMutation, ExtraCourseType } from '@/graphql/generated/graphql';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MutableRefObject, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';


interface BatchUpdateSettingsProps {
    batchID: number
}

const BatchUpdateSettings = ({batchID}:BatchUpdateSettingsProps) => {
    const [result] = useBatchQuery({variables:{BATCHID:batchID.toString()},requestPolicy:'network-only'})
    const {fetching, data, error} = result;
    const toast = useRef(null);

    if (error) return <div>Failed to fetch batch details: {error.message}</div>;
    if (fetching) return <div>Loading</div>
    return (
        <div className="card">
            <Toast ref={toast}/>
            <h5>{data?.batch?.curriculum?.program} {data?.batch?.year} Batch</h5>
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
            <ExtraCourseMappingTable
                toast={toast} 
                batchID={batchID}
                curriculumYear={data?.batch?.curriculum?.year} 
                extras={data?.batch?.semesterExtraCourses} 
                program={data?.batch?.curriculum?.program}
            />
                
        </div>
    );
}

interface ExtraCourseMappingTableProps {
    extras: Array<string>,
    program: string,
    curriculumYear: number,
    batchID: number,
    toast: MutableRefObject<null>,
}

interface ExtraCourseTableData {
    type: string,
    selectedCourseID: string | null,
    selectedCourseCodeName: string | null,
    extraCourses: Array<ExtraCourseType>,

}

const ExtraCourseMappingTable = ({id, extras, program, curriculumYear, batchID, toast}:ExtraCourseMappingTableProps) => {
    let filteredExtras = extras.filter(function(item, pos) {
        return extras.indexOf(item) == pos;
    })
    const [addBatchExtraCourse, addBatchExtraCourseMutation] = useAddBatchExtraCourseMutation();
    const [updateBatchExtraCourse, updateBatchExtraCourseMutation] = useUpdateBatchExtraCourseMutation();
    const [deleteBatchExtraCourse, deleteBatchExtraCourseMutation] = useDeleteBatchExtraCourseMutation();

    const [result] = useCurriculumExtraCoursesQuery({variables:{CURRICULUMYEAR: curriculumYear, EXTRAS: filteredExtras, PROGRAM: program, BATCHID: batchID.toString()}});
    const {fetching, data, error} = result;

    if (error?.message) {
        return <div>Failed to fetch extra courses: {error.message}</div>
    }
    if (fetching) {
        return <div>Loading</div>
    }

    if (addBatchExtraCourse.error?.message) {
        toast.current.show({ severity: 'error', summary: 'Error assigning Extra course', detail: addBatchExtraCourse.error.message, life: 3000 });
    }
    if (updateBatchExtraCourse.error?.message) {
        toast.current.show({ severity: 'error', summary: 'Error updating Extra course', detail: updateBatchExtraCourse.error.message, life: 3000 });
    }
    if (deleteBatchExtraCourse.error?.message) {
        toast.current.show({ severity: 'error', summary: 'Error deleting Extra course', detail: deleteBatchExtraCourse.error.message, life: 3000 });
    }
    if (addBatchExtraCourse.data?.addBatchExtraCourse) {
        toast.current.show({ severity: 'success', summary: 'Extra Course assigned', life: 3000 });
    }
    if (updateBatchExtraCourse.data?.updateBatchExtraCourse) {
        toast.current.show({ severity: 'success', summary: 'Extra Course updated', life: 3000 });
    }
    if (deleteBatchExtraCourse.data?.deleteBatchExtraCourse) {
        toast.current.show({ severity: 'success', summary: 'Extra Course deleted', life: 3000 });
    }

    const onExtraCourseChange = async (x: ExtraCourseType, ec: ExtraCourseTableData) => {
        if (x?.label === 'None') {
            await deleteBatchExtraCourseMutation({BATCHID: batchID.toString(), OLD_EXTRA_COURSEID: ec.selectedCourseID})
        }
        else if (ec.selectedCourseID){
            await updateBatchExtraCourseMutation({BATCHID:batchID, OLD_EXTRA_COURSEID:ec.selectedCourseID, NEW_EXTRA_COURSEID: x.id })
        } else {
            await addBatchExtraCourseMutation({BATCHID: batchID, EXTRA_COURSEID: x.id})
        }
    }
    const actionBodyTemplate = (rowData: ExtraCourseTableData) => {
        let options;
        if (rowData?.selectedCourseID) options = [{label: 'None'}].concat(rowData.extraCourses.map((c => {return {...c, 'label': c?.code + ' ' + c?.name}})))
        else options = rowData.extraCourses.map((c => {return {...c, 'label': c?.code + ' ' + c?.name}}))
        return (
            <Dropdown value={null} onChange={(e) => onExtraCourseChange(e.value, rowData)} options={options} optionLabel="label" placeholder={rowData?.selectedCourseID ? "Update Course" : "Select Course"} filter />
        );
    };

    let parsedData: Array<ExtraCourseTableData> = [];
    for (let type of extras) {
        let selectedCourseID = null;
        let selectedCourseCodeName = null;
        let extraCourses: Array<ExtraCourseType> = [];

        for (let courseObject of data?.curriculumExtraCourses) {
            if (courseObject?.extra === type && courseObject.courses) {
                extraCourses = courseObject.courses;
                break;
            }
        }

        parsedData.push({
            type: type,
            selectedCourseID: selectedCourseID,
            selectedCourseCodeName: selectedCourseCodeName,
            extraCourses: extraCourses,
        });
    }

    data?.batchSelectedExtraCourses?.forEach((d) => {
        let foo = parsedData.filter((p)=> p.selectedCourseID === null && p.type === d?.courseType);
        if (foo.length > 0) {
            foo[0].selectedCourseID = d?.id || null;
            foo[0].selectedCourseCodeName = d?.code + " " + d?.name;
        }
    })
    console.log(parsedData);
    return (
        <div>
            <DataTable
                key={id}
                value={parsedData}
                rows={10}
                loading={fetching}
                rowsPerPageOptions={[5, 10, 25]}
                className="datatable-responsive"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} extra courses"
                emptyMessage="No Extra courses info found."
                responsiveLayout="scroll"
            >
                <Column field="type" header="Extra" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} />
                <Column field="selectedCourseCodeName" header="Selected" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
            </DataTable>
        </div>
    )
}

export default BatchUpdateSettings;