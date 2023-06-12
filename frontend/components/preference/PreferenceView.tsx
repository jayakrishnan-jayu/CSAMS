
import {
    useCoursesForPreferenceQuery,
    useAddPreferenceMutation,
    useUpdatePreferenceMutation,
    useDeletePreferenceMutation,
    CourseType,
    AllocationBatchType,
    CourseAllocationPreferenceType,
  
  } from "@/graphql/generated/graphql";
  import { Dropdown } from "primereact/dropdown";
  import { useContext, useRef, useState } from "react";
  import { Button } from "primereact/button";
  import { Dialog } from "primereact/dialog";
  import { Toast } from "primereact/toast";
  import { InputNumber } from "primereact/inputnumber";
  import { MetaDataContext } from "@/components/layout/context/metadatacontext";
  import PreferenceTable from "@/components/preferenceTable";
  import Deadline from "@/components/deadline";
  import BatchPreferenceTable from "@/components/preference/BatchPreferneceTable";
  
  
  type Mode = 'create' | 'update' | 'delete' | null;

const PreferenceView = () => {
    const { metaData } = useContext(MetaDataContext);

    let emptyPrefData = {
      id: "",
      courseName: "",
      courseId: "",
      experience: 0,
      weightage: 0
    };
  
    const [productDialog, setProductDialog] = useState(false);
    const [preference, setPreference] = useState(emptyPrefData);
    const [dialogShown, setDialogShown] = useState(true);
    const [currentDropdownValues, setCurrentDropdownValues] = useState(null)
    const [isUpdateMutation, setIsUpdateMutation] = useState(false);
  
    const [addPreference, addPreferenceMutation] = useAddPreferenceMutation();
    const [updatePreference, updatePreferenceMutation] = useUpdatePreferenceMutation();
    const [deletePreference, deletePreferenceMutation] = useDeletePreferenceMutation();
    const [mode, setMode] = useState<Mode>(null);
  
    const [batches, setBatches] = useState<null | AllocationBatchType[]>(null);
    const [preferences, setPreferences] = useState<null | CourseAllocationPreferenceType[]>(null);
  
    const prefCount = metaData?.metadata?.config?.preferenceCount;
    const prefNums = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  
  
    let dropdownValues = Array.from({length: prefCount}, (_, i) => {return {name: prefNums[i], code: i+1}})
  
    const toast = useRef(null);
  
  
    const [result] = useCoursesForPreferenceQuery();
    const { fetching, data, error } = result;
    
  
    
    if (error) {
      return (<div className="grid">
        <div className="col-12">
          <div className="card">
            {error?.message === "[GraphQL] Courses not yet released" ? <div> Courses not yet released</div> : <div>{error.message}</div>}
            </div>
          </div>
            
        </div>
      )
    }
  
    if (!dialogShown) {
      if (mode === 'create' && addPreference?.error?.message) {
        toast.current.show({
          severity: "error",
          summary: "Error adding preference",
          detail: addPreference.error.message,
          life: 3000,
        });
        setDialogShown(true);
        setMode(null);
      }
      if (mode === 'create' && addPreference?.data?.addPreference?.response) {
        toast.current.show({
          severity: "success",
          summary: "Preference Added",
          life: 3000,
        });
        setPreferences(addPreference.data.addPreference.response?.preferences)
        setDialogShown(true);
        setMode(null);
      }
      if (mode === 'update' && updatePreference?.error?.message) {
        toast.current.show({
          severity: "error",
          summary: "Error updating preference",
          detail: addPreference.error.message,
          life: 3000,
        });
        setDialogShown(true);
        setMode(null);
      }
      if (mode === 'update' && updatePreference?.data?.updatePreference?.response) {
        toast.current.show({
          severity: "success",
          summary: "Preference Updated",
          life: 3000,
        });
        setPreferences(updatePreference.data.updatePreference.response?.preferences);
        setDialogShown(true);
        setMode(null);
      }
      if (mode === 'delete' && deletePreference?.error?.message) {
        toast.current.show({
          severity: "error",
          summary: "Error deleting preference",
          detail: addPreference.error.message,
          life: 3000,
        });
        setDialogShown(true);
        setMode(null);
      }
      if (mode === 'delete' && deletePreference?.data?.deletePreference?.response) {
        toast.current.show({
          severity: "success",
          summary: "Preference Deleted",
          life: 3000,
        });
        setPreferences(deletePreference.data.deletePreference.response?.preferences);
        setDialogShown(true);
        setMode(null);
      }
    }
      
    
  
    const _batches = data?.coursesForPreference?.batches;
    const _prefs = data?.coursesForPreference?.preferences;
  
  console.log(_batches)
    if ((batches === null || batches === undefined) && (_batches !== null && _batches !== undefined)) {
      setBatches(_batches);
    }
    if ((preferences === null || preferences === undefined) &&  (_prefs !== null && _prefs !== undefined)) {
      setPreferences(_prefs);
    }
  
    const hideDialog = () => {
      setProductDialog(false);
      setPreference(emptyPrefData);
    };
  
    const handleCreatePreference = async () => {
      setDialogShown(false);
      setMode('create');
      await addPreferenceMutation({
        COURSEID: preference.courseId,
        EXPERIENCE: preference.experience,
        WEIGHTAGE: preference.weightage,
      });
      setPreference(emptyPrefData);
      setProductDialog(false);
    };
  
    const handleUpdatePreference = async () => {
      setDialogShown(false);
      setMode('update');
      await updatePreferenceMutation({
        ID: preference.id,
        EXPERIENCE: preference.experience,
        WEIGHTAGE: preference.weightage,
      });
      setProductDialog(false);
    }
  
    const handleDeletePreference = async () => {
      setMode('delete');
      setDialogShown(false);
      await deletePreferenceMutation({
        ID: preference.id
      });
      setProductDialog(false);
    }
  
    const editCourses = (course: CourseType) => {
      //@ts-ignore
      const c = preferences.filter(p => p.courseId === course.id && p.facultyId === metaData?.metadata?.faculty?.id);
      console.log(c);
      // const c = course.preferences.filter(p => p.facultyId === metaData?.metadata?.faculty?.id && p.courseId === course.id);
      // setCurrentDropdownValues(dropdownValues.filter(d => d.code !=))
      let _pref = {...preference, courseName: course.code + " " + course.name, courseId: course.id };
      if (c.length === 1) {
        _pref = {..._pref, experience: c[0].experience, weightage: c[0].weigtage, id: c[0].id}
        setCurrentDropdownValues(dropdownValues.filter(d => d.code === c[0].weigtage || !preferences.map(e => e.weigtage).includes(d.code)))
        setIsUpdateMutation(true);
      } else {
        setCurrentDropdownValues(dropdownValues.filter(d => !preferences.map(e => e.weigtage).includes(d.code)))
        setIsUpdateMutation(false);
      }
      setPreference(_pref);
      setProductDialog(true);
    };
  
    const onInputNumberChange = (e, name: string) => {
      const val = e.value || 0; // TODO: parse to integer
      let _pref = { ...preference };
      if (name === "preference") _pref.weightage = val;
      else if (name === "experience") _pref.experience = val;
      setPreference(_pref);
    };
  
    
    const prefDialogFooter = () => {
      return (
      <>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}
        />
        {isUpdateMutation ?
        <>
          <Button label="Delete" icon="pi pi-trash" className="p-button-text" severity="danger" onClick={handleDeletePreference} />
          <Button label="Update" icon="pi pi-check" className="p-button-text" severity="warning" onClick={handleUpdatePreference}/>
        </>
        :
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={handleCreatePreference} />
        }
      </>
      );
    };
  
    const metaDataStartTimeStamp = metaData.metadata.config.currentPreferenceSem.startTimestamp !== null ? new Date(metaData.metadata.config.currentPreferenceSem.startTimestamp) : null;
    const metaDataEndTimeStamp = metaData.metadata.config.currentPreferenceSem.endTimestamp !== null ? new Date(metaData.metadata.config.currentPreferenceSem.endTimestamp) : null;
  
    const renderDialog = () => {
      return (
        <Dialog
              visible={productDialog}
              style={{ width: "450px" }}
              header="Preference"
              modal
              className="p-fluid"
              footer={prefDialogFooter}
              onHide={hideDialog}
            >
              <div className="formgrid grid">
                <div className="field col">
                  <label>Course</label>
                  <div>{preference?.courseName}</div>
                </div>
              </div>
  
              <div className="formgrid grid">
                <div className="field col">
                  <label>Preference</label>
                  <Dropdown value={preference.weightage ? dropdownValues[preference.weightage-1] : null} onChange={(e:any) => setPreference({...preference, weightage: e.value.code})} options={currentDropdownValues} optionLabel="name" placeholder="Select" />
                </div>
                <div className="field col">
                  <label>Experience</label>
                  <InputNumber
                    id="experience"
                    value={preference.experience}
                    onValueChange={(e) => onInputNumberChange(e, "experience")}
                    mode="decimal"
                    showButtons
                    format={false}
                    ></InputNumber>
                </div>
              </div>
            </Dialog>
      );
    }
    //@ts-ignore
    const myPreferences = preferences?.filter(p=>p.facultyId === metaData?.metadata?.faculty?.id)
    .map(p=>{
      let course = data?.coursesForPreference?.courses?.find(_c => _c.id === p?.courseId);
      const batch = batches.find(b=>b.courseIds.includes(course.id));
      //@ts-ignore
      course.batchYear = batch.batchYear;
      //@ts-ignore
      course.program = batch.curriculumName;
  
      return {
        ...p, 
        course: course
      }
    });
  // console.log("my", myPreferences)
    return (
      <div className="grid">
        <div className="col-12">
          <div className="card">
            {
              metaData.metadata.config.currentPreferenceSem.areCoursesVerified ?
              <>
                {(metaDataStartTimeStamp === null || metaDataStartTimeStamp === null) && <h5>Deadline has not been set</h5>}
                {metaDataStartTimeStamp !== null && metaDataStartTimeStamp !== null && <Deadline startTimestamp={metaDataStartTimeStamp} endTimestamp={metaDataEndTimeStamp}/>}
              </>
              : <div>Courses are not released yet!</div>
          }
          
            <Toast ref={toast} />
            {renderDialog()}
            
          </div>
        {myPreferences?.length > 0 &&
        <div className="col-12">
          <div className="card">
            <h5>My Preferences</h5>
          
          <PreferenceTable preferences={myPreferences} exclude={[ 'curriculum']}/>
          </div>
        </div>
         }
        <BatchPreferenceTable
          loading={fetching}
          faculties={data?.coursesForPreference?.faculties}
          courses={data?.coursesForPreference?.courses}
          batches={batches}
          preferences={preferences}
          editCourses={editCourses}
          prefNums={prefNums}
          facultyID={metaData?.metadata?.faculty?.id}
        />
        </div>
      </div>
    );
}

export default PreferenceView;
