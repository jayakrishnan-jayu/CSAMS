import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

export default function BatchWise() {
  const [dropdownValue, setDropdownValue] = useState(null);

  const dropdownValues = [
    {
      name: "BCA",
      code: "bca",
    },
    {
      name: "MCA",
      code: "mca",
    },
  ];

  const toast = useRef(null);

  const handleClick = () => {
    if (dropdownValue?.code === "bca" || dropdownValue?.code === "mca") {
      toast.current.show({
        severity: "success",
        summary: "Report Generated",
        life: 3000,
      });
    }
  };

  return (
    <div className="mt-4">
      {/* <div className="card"> */}
      <Toast ref={toast} />
      <Dropdown
        value={dropdownValue}
        onChange={(e) => setDropdownValue(e.value)}
        options={dropdownValues}
        optionLabel="name"
        placeholder="Select"
      />
      <Button
        icon="pi pi-chevron-down"
        className="p-button-rounded p-button-success mr-2 ml-3"
        onClick={() => handleClick()}
      />
      {/* </div> */}
    </div>
  );
}
