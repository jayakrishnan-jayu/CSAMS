import { useCurriculumExtraCoursesQuery } from '@/graphql/generated/graphql';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

interface ExtraCourseMappingProps {
    extras: Array<string>,
    program: string,
    curriculumYear: number,
    batchID: number,
}

const ExtraCourseMapping = ({extras, program, curriculumYear, batchID}:ExtraCourseMappingProps) => {
    extras = extras.filter(function(item, pos) {
        return extras.indexOf(item) == pos;
    })
    const [result] = useCurriculumExtraCoursesQuery({variables:{CURRICULUMYEAR: curriculumYear, EXTRAS: extras, PROGRAM: program, BATCHID: batchID.toString()}});
    const {fetching, data, error} = result;
    if (error?.message) {
        return <div>Failed to fetch extra courses: {error.message}</div>
    }
    if (fetching) {
        return <div>Loading</div>
    }
    // data?.curriculumExtraCourses?.forEach(ce => console.log(ce?.courses?.map(c => )))
    return (
        <div>
            {data.curriculumExtraCourses?.map(c => 
                    <div className="grid p-fluid mt-1">
                        <div className="field col-12 md:col-6">
                            <InputText
                                type="text"
                                value={c?.extra}
                                disabled
                            ></InputText>
                        </div>
                        <div className="field col-12 md:col-6">
                        <Dropdown value={null} onChange={(e) => console.log(e.value)} options={c?.courses.map(c => {return {...c, 'label': c?.code + ' ' + c?.name}})} optionLabel="label" placeholder="Select Course" filter />
                        </div>
                    </div>
                )}
        </div>
    )
}

export default ExtraCourseMapping;