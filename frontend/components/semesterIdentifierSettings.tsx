import { useUpdateSemIdentifierMutation } from '@/graphql/generated/graphql';
import React, { useContext, useRef, useState } from 'react';
import { MetaDataContext } from './layout/context/metadatacontext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

const SemesterIdentifierSettings = () => {
  const { metaData } = useContext(MetaDataContext);

  const dropdownValues = [
    { name: 'Odd Semester', code: '0' },
    { name: 'Even Semester', code: '1' },
];

  const [newSemIdentifierResponse, updateSemIdentifier] = useUpdateSemIdentifierMutation();
  const [year, setYear] = useState(metaData?.metadata?.config?.currentPreferenceSem?.year);
  const [dropDownValue, setDropDownValue] = useState(dropdownValues[metaData?.metadata?.config?.currentPreferenceSem?.isEvenSem ? 1 : 0])
  const [dialogShown, setDialogShown] = useState(true);

  const toast = useRef(null);

  if (newSemIdentifierResponse.data?.updateSemIdentifier?.response && !dialogShown) {
    toast.current.show({ severity: 'success', summary: 'Semester Identifier Updated', life: 3000 });
    setDialogShown(true);
  }

  if (newSemIdentifierResponse.error?.message && !dialogShown) {
    toast.current.show({ severity: 'error', summary: 'Error updating Semester Identifier', detail: newSemIdentifierResponse.error.message, life: 3000 });
  }

  const onSemIdentifierUpdate = async () => {
    setDialogShown(false);
    await updateSemIdentifier({ISEVENSEM: dropDownValue.code === dropdownValues[1].code, YEAR: year})
  }
    return (
      <div className="card">
      <h5>Preference Semester Identifier</h5>
      <div className="formgroup-inline">
          <Toast ref={toast} />
          <div className="field">
              <InputNumber value={year} onValueChange={(e) => setYear(e.value)} showButtons mode="decimal" format={false}></InputNumber>
          </div>
          <div className="field">
            <Dropdown value={dropDownValue} onChange={(e) => setDropDownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" />
          </div>
          <Button label="Update" onClick={()=>onSemIdentifierUpdate()}></Button>
      </div>
  </div>
    );
};

export default SemesterIdentifierSettings;
