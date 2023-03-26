import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useContext, useRef, useState } from "react";
import { FacultyContext } from "@/components/layout/context/facultycontext";
import { Toast } from "primereact/toast";

const Settings = () => {
  const { facultyData } = useContext(FacultyContext);
  console.log("FacultData, ", facultyData);
  const [firstName, setFirstName] = useState(
    facultyData?.faculty?.user?.firstName
  );
  const [lastName, setLastName] = useState(
    facultyData?.faculty?.user?.lastName
  );
  const designation = facultyData?.faculty?.designation || "undefined";

  const track = facultyData?.faculty?.track || "undefined";
  const email = facultyData?.faculty?.user?.email || "undefined";

  const toast = useRef(null);

  const onProfileUpdate = () => {
    if (
      firstName?.length == 0 ||
      firstName?.length == null ||
      lastName?.length == 0 ||
      lastName?.length == null
    ) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Message Content",
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Message Content",
        life: 3000,
      });
    }
  };
  return (
    <div className="card">
      <h5>Account Settings</h5>
      <Toast ref={toast} />
      <div className="grid p-fluid mt-5">
        <div className="field col-12 md:col-6">
          <span className="">
            <h6>First Name</h6>
            <InputText
              type="text"
              id="firstNameInput"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></InputText>
          </span>
        </div>
        <div className="field col-12 md:col-6">
          <span className="">
            <h6>Last Name</h6>
            <InputText
              type="text"
              id="lastNameInput"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></InputText>
          </span>
        </div>
      </div>
      <div className="grid p-fluid">
        <div className="field col-12">
          <span className="">
            <h6>Designation</h6>
            <InputText
              type="text"
              id="designationInput"
              value={designation}
              disabled
            ></InputText>
          </span>
        </div>
      </div>
      <div className="grid p-fluid">
        <div className="field col-12">
          <span className="">
            <h6>Track</h6>
            <InputText
              type="text"
              id="trackInput"
              value={track}
              disabled
            ></InputText>
          </span>
        </div>
      </div>
      <div className="grid p-fluid">
        <div className="field col-12">
          <span className="">
            <h6>Email</h6>
            <InputText
              type="text"
              id="emailInput"
              value={email}
              disabled
            ></InputText>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap">
        <Button
          label="Save"
          onClick={onProfileUpdate}
          className="p-button-info"
        />
      </div>
    </div>
  );
};

export default Settings;
