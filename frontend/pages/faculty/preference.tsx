import {
  useCoursesForPreferenceQuery,
  useAddPreferenceMutation,
  useUpdatePreferenceMutation,
  useDeletePreferenceMutation,
  CourseType,

} from "@/graphql/generated/graphql";
import { Dropdown } from "primereact/dropdown";
import { useContext, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { MetaDataContext } from "@/components/layout/context/metadatacontext";
import PreferenceTable from "@/components/preferenceTable";
import Deadline from "@/components/deadline";

const FacultyPreference = () => {
  
  const { metaData } = useContext(MetaDataContext);

  let emptyPrefData = {
    id: "",
    courseName: "",
    courseId: "",
    experience: 0,
    weightage: 0
  };

  const [result] = useCoursesForPreferenceQuery();
  const { fetching, data, error } = result;
  const [productDialog, setProductDialog] = useState(false);
  const [preference, setPreference] = useState(emptyPrefData);
  const [dialogShown, setDialogShown] = useState(true);
  const [expandedRows, setExpandedRows] = useState(null);
  const [currentDropdownValues, setCurrentDropdownValues] = useState(null)
  const [isUpdateMutation, setIsUpdateMutation] = useState(false);

  const [addPreference, addPreferenceMutation] = useAddPreferenceMutation();
  const [updatePreference, updatePreferenceMutation] = useUpdatePreferenceMutation();
  const [deletePreference, deletePreferenceMutation] = useDeletePreferenceMutation();

  const filters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    program: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  };

  const programs = ['BCA', 'BCA DS', 'MCA'];
  const prefNums = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

  const prefCount = metaData.metadata.config.preferenceCount;
  let dropdownValues = Array.from({length: prefCount}, (_, i) => {return {name: prefNums[i], code: i+1}})

  const toast = useRef(null);
  const dt = useRef(null);
  if (error) {
    if (error.message === "[GraphQL] Courses not yet released") return <div> Courses not yet released</div>;
    return <div>{error.toString()}</div>;
  } 
  let courses: CourseType []= [];
  if (data?.courses && data?.preferences) {
    courses = data?.courses;      
  }


  if (addPreference.error?.message && !dialogShown) {
    toast.current.show({
      severity: "error",
      summary: "Error adding preference",
      detail: addPreference.error.message,
      life: 3000,
    });
    setDialogShown(true);
  }

  if (addPreference.data?.addPreference?.response && !dialogShown) {
    toast.current.show({
      severity: "success",
      summary: "Preferenes Added",
      life: 3000,
    });

    setDialogShown(true);
  }

  const hideDialog = () => {
    setProductDialog(false);
    setPreference(emptyPrefData);
  };

  const savePreference = async () => {
    setDialogShown(false);
    await addPreferenceMutation({
      COURSEID: preference.courseId,
      EXPERIENCE: preference.experience,
      WEIGHTAGE: preference.weightage,
    });
    setPreference(emptyPrefData);
    setProductDialog(false);
  };

  // const changePreference = async () => {
  //   setDialogShown(false);
  //   await updatePreference({
  //     ID: preference.id,
  //     EXPERIENCE: preference.experience,
  //     WEIGHTAGE: preference.weightage,
  //   });
  //   setPreference(emptyPrefData);
  //   setProductDialog(false);
  // };

  const editCourses = (course: CourseType) => {
    const c = course.preferences.filter(p => p?.faculty?.user?.id === metaData.metadata.user.id && course.id === p.courseId)
    
    // setCurrentDropdownValues(dropdownValues.filter(d => d.code !=))
    let _pref = {...preference, courseName: course.code + " " + course.name, courseId: course.id };
    if (c.length === 1) {
      _pref = {..._pref, experience: c[0].experience, weightage: c[0].weigtage, id: c[0].id}
      setCurrentDropdownValues(dropdownValues.filter(d => d.code === c[0].weigtage || !data.preferences.map(e => e.weigtage).includes(d.code)))
      setIsUpdateMutation(true);
    } else {
      setCurrentDropdownValues(dropdownValues.filter(d => !data.preferences.map(e => e.weigtage).includes(d.code)))
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

  const programBodyTemplate = (rowData) => {
    return <span className={`generic-badge program-${rowData.program.toLowerCase().replace(/ +/g, "")}`}>{rowData.program}</span>;
  };
  const programFilterTemplate = (options) => {
    return <Dropdown value={options.value} options={programs} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={programItemTemplate} placeholder="Select a Program" className="p-column-filter" showClear />;
  };
  const programItemTemplate = (option) => {
    return <span className={`generic-badge program-${option.toLowerCase().replace(/ +/g, "")}`}>{option}</span>;
  };

  const courseBodyTemplate = (rowData: CourseType) => {
    return <span>{rowData.code} {rowData.name}</span>;
  };

  const totalPrefBodyTemplate = (rowData: CourseType) => {
    return <span>{rowData.preferences.length}</span>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-chevron-up"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editCourses(rowData)}
        />
      </>
    );
  };

  const prefDialogFooter = () => {
    return (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}
      />
      {isUpdateMutation ?
      <>
        {/* <Button label="Delete" icon="pi pi-trash" className="p-button-text" severity="danger" onClick={deletePreference} />
        <Button label="Update" icon="pi pi-check" className="p-button-text" severity="warning" onClick={updatePreference}/> */}
      </>
      :
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={savePreference} />
      }
    </>
    );
  };

  const rowExpansionTemplate = (data: CourseType) => {
    
    if (data.preferences.length === 0) return <div> No one has given preferences to this course yet!</div>
    // if (data.selectedExtraCourses.length === 0) return <div>No extra courses assigned</div>
    return <PreferenceTable courseID={Number(data?.id)}/>
};

  const metaDataStartTimeStamp = metaData.metadata.config.currentPreferenceSem.startTimestamp !== null ? new Date(metaData.metadata.config.currentPreferenceSem.startTimestamp) : null;
  const metaDataEndTimeStamp = metaData.metadata.config.currentPreferenceSem.endTimestamp !== null ? new Date(metaData.metadata.config.currentPreferenceSem.endTimestamp) : null;


  return (
    <div className="">
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
        <DataTable
          ref={dt}
          value={courses}
          rows={10}
          loading={fetching}
          filters={filters}
          rowsPerPageOptions={[5, 10, 25]}
          expandedRows={expandedRows}
          onRowToggle={(b) => setExpandedRows(b.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          className="datatable-responsive"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          emptyMessage="No courses info found."
          responsiveLayout="scroll"
        >
          <Column expander style={{ width: '3em' }} />
          <Column field="name" header="Course" body={courseBodyTemplate} headerStyle={{ minWidth: "10rem" }} />
          <Column field="program" header="Program" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} filter body={programBodyTemplate} filterElement={programFilterTemplate} sortable/>
          <Column field="curriculumYear" header="Curriculum Year" sortable headerStyle={{ minWidth: "5rem" }}/>
          <Column field="batchYear" header="Batch Year" sortable headerStyle={{ minWidth: "5rem" }}/>
          <Column field="credit" header="Credit" sortable headerStyle={{ minWidth: "5rem" }}/>
          <Column field="sem" header="Sem" headerStyle={{ minWidth: "5rem" }}/>
          <Column header="Total No. Pref" body={totalPrefBodyTemplate} headerStyle={{ minWidth: "5rem" }}/>
          <Column body={actionBodyTemplate} headerStyle={{ minWidth: "5rem" }}/>
        </DataTable>
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
      </div>
    </div>
  );
};

export default FacultyPreference;
