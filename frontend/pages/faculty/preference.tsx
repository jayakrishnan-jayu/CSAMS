import {
  useCoursesQuery,
  useAddPreferenceMutation,
  CourseType,
} from "@/graphql/generated/graphql";
import { Dropdown } from "primereact/dropdown";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";

const FacultyPreference = () => {
  let emptyCourseData = {
    courseId: "",
    experience: 0,
    weightage: 0,
  };
  const [result] = useCoursesQuery();
  const { fetching, data, error } = result;
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyCourseData);
  const [dialogShown, setDialogShown] = useState(true);
  const [newPreferences, updatePreferences] = useAddPreferenceMutation();

  const toast = useRef(null);
  const dt = useRef(null);

  if (error) return <div>{error.toString()}</div>;
  let courses: any[] | undefined = [];
  if (data?.courses) {
    courses = data?.courses;
  }

  if (newPreferences.error?.message && !dialogShown) {
    toast.current.show({
      severity: "error",
      summary: "Error updating workload",
      detail: newPreferences.error.message,
      life: 3000,
    });
    setDialogShown(true);
  }

  if (newPreferences.data?.addPreference?.response && !dialogShown) {
    toast.current.show({
      severity: "success",
      summary: "Workload Updated",
      life: 3000,
    });
    setDialogShown(true);
  }

  const hideDialog = () => {
    setProductDialog(false);
  };

  const saveProduct = async () => {
    setDialogShown(false);
    await updatePreferences({
      COURSEID: product.courseId,
      EXPERIENCE: product.experience,
      WEIGHTAGE: product.weightage,
    });
    setProduct(emptyCourseData);
    setProductDialog(false);
  };

  const editCourses = (course: CourseType) => {
    setProduct({ ...product, courseId: course.id,  });
    setProductDialog(true);
  };

  const onInputNumberChange = (e, name: string) => {
    const val = e.value || 0; // TODO: parse to integer
    let _product = { ...product };
    if (name === "preference") _product.weightage = val;
    else if (name === "experience") _product.experience = val;
    setProduct(_product);
  };

  const courseIDBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Course Id</span>
        <span className={`generic-badge code-${rowData?.id.toLowerCase()}`}>
          {rowData?.id}
        </span>
      </>
    );
  };

  const courseCodeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Course Code</span>
        <span className={`generic-badge code-${rowData?.code.toLowerCase()}`}>
          {rowData?.code}
        </span>
      </>
    );
  };

  const courseNameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Course Name</span>
        <span className={`generic-badge name-${rowData?.name.toLowerCase()}`}>
          {rowData?.name}
        </span>
      </>
    );
  };

  const courseCreditBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Credit</span>
        <span className={`generic-badge code-${rowData?.credit}`}>
          {rowData?.credit}
        </span>
      </>
    );
  };

  // const courseExtraBodyTemplate = (rowData) => {
  //   return (
  //     <>
  //       <span className="p-column-title">Is Extra</span>
  //       <span className={`generic-badge code-${rowData?.isExtra}`}>
  //         {rowData?.isExtra}
  //       </span>
  //     </>
  //   );
  // };

  const courseProgramBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Program</span>
        <span className={`generic-badge code-${rowData?.program}`}>
          {rowData?.program}
        </span>
      </>
    );
  };

  const courseYearBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Curriculum Year</span>
        <span className={`generic-badge code-${rowData?.curriculumYear}`}>
          {rowData?.curriculumYear}
        </span>
      </>
    );
  };

  const courseBatchYearBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Batch Year</span>
        <span className={`generic-badge code-${rowData?.batchYear}`}>
          {rowData?.batchYear}
        </span>
      </>
    );
  };

  const courseSemBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Sem</span>
        <span className={`generic-badge code-${rowData?.sem}`}>
          {rowData?.sem}
        </span>
      </>
    );
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

  const productDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </>
  );
  console.log(product)

  return (
    <div className="">
      <div className="card">
        <Toast ref={toast} />
        <DataTable
          ref={dt}
          value={courses}
          rows={10}
          loading={fetching}
          rowsPerPageOptions={[5, 10, 25]}
          className="datatable-responsive"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          emptyMessage="No courses info found."
          responsiveLayout="scroll"
        >
          {/* <Column
            field="id"
            header="Course Id"
            sortable
            body={courseIDBodyTemplate}
            headerStyle={{ minWidth: "10rem" }}
          /> */}
          <Column
            field="code"
            header="Course Code"
            sortable
            body={courseCodeBodyTemplate}
            headerStyle={{ minWidth: "10rem" }}
          />
          <Column
            field="name"
            header="Course Name"
            sortable
            body={courseNameBodyTemplate}
            headerStyle={{ minWidth: "10rem" }}
          />
          <Column
            field="credit"
            header="Credit"
            sortable
            body={courseCreditBodyTemplate}
            headerStyle={{ minWidth: "5rem" }}
          />
          {/* <Column
            field="isExtra"
            header="Is Extra"
            sortable
            body={courseExtraBodyTemplate}
            headerStyle={{ minWidth: "5rem" }}
          /> */}
          <Column
            field="program"
            header="Program"
            sortable
            body={courseProgramBodyTemplate}
            headerStyle={{ minWidth: "5rem" }}
          />
          <Column
            field="curriculumYear"
            header="Curriculum Year"
            sortable
            body={courseYearBodyTemplate}
            headerStyle={{ minWidth: "5rem" }}
          />
          <Column
            field="batchYear"
            header="Batch Year"
            sortable
            body={courseBatchYearBodyTemplate}
            headerStyle={{ minWidth: "5rem" }}
          />
          <Column
            field="sem"
            header="Sem"
            sortable
            body={courseSemBodyTemplate}
            headerStyle={{ minWidth: "5rem" }}
          />
          <Column
            body={actionBodyTemplate}
            headerStyle={{ minWidth: "5rem" }}
          />
        </DataTable>
        <Dialog
          visible={productDialog}
          style={{ width: "450px" }}
          header="Preference"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          <div className="formgrid grid">
            <div className="field col">
              <label>Course ID</label>
              <div className={`generic-badge track-${product?.courseId}`}>
                {product?.courseId}
              </div>
            </div>
          </div>

          <div className="formgrid grid">
            <div className="field col">
              <label>Preference</label>
              <InputNumber
                id="preference"
                value={product.weightage}
                onValueChange={(e) => onInputNumberChange(e, "preference")}
                mode="decimal"
                showButtons
                format={false}
              />
            </div>
            <div className="field col">
              <label>Experience</label>
              <InputNumber
                id="experience"
                value={product.experience}
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
