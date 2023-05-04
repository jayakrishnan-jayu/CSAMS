import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function CourseBook() {
  const toast = useRef(null);

  const handleClick = () => {
    toast.current.show({
      severity: "success",
      summary: "Report Generated",
      life: 3000,
    });
  };
  return (
    <div className="mt-4">
      {/* <div className="card"> */}
      <Toast ref={toast} />
      <Button
        //   icon="pi pi-chevron-down"
        label="Generate"
        className="p-button-rounded p-button-success mr-2 ml-3"
        onClick={() => handleClick()}
      />
      {/* </div> */}
    </div>
  );
}
