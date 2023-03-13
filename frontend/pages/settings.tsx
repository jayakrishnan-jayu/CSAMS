import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import { FacultyContext } from "@/components/layout/context/facultycontext";

const Settings = () => {

  const { facultyData } = useContext(FacultyContext);
  console.log("FacultData, ", facultyData);
  const [firstName, setFirstName] = useState("Anandu");
  const [lastName, setLastName] = useState("P");
  const [designation, setDesignation] = useState("Teaching");
  const [track, setTrack] = useState("Something Something");
  const [email, setEmail] = useState("anandup0122@gmail.com");
  return (
    <div className="card">
      <h5>Account Settings</h5>
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
        <Button label="Save" className="p-button-info" />
      </div>
    </div>
  );
};

export default Settings;
