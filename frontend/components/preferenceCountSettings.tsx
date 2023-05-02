import { useUpdatePreferenceCountMutation } from '@/graphql/generated/graphql';
import React, { useContext, useRef, useState } from 'react';
import { MetaDataContext } from './layout/context/metadatacontext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';

const PreferenceCountSettings = () => {
  const { metaData } = useContext(MetaDataContext);

  const [newUpdatePrefCount, updatePrefCount] = useUpdatePreferenceCountMutation();
  const [pref, setPref] = useState(metaData?.metadata?.config?.preferenceCount);
  const [dialogShown, setDialogShown] = useState(true);

  const toast = useRef(null);

  if (newUpdatePrefCount.data?.updatePreferenceCount?.response && !dialogShown) {
    toast.current.show({ severity: 'success', summary: 'Preference Count Updated Updated', life: 3000 });
    setDialogShown(true);
  }

  if (newUpdatePrefCount.error?.message && !dialogShown) {
    toast.current.show({ severity: 'error', summary: 'Error updating Prefernce Count', detail: newUpdatePrefCount.error.message, life: 3000 });
  }

  const onPrefCountUpdate = async () => {
    setDialogShown(false);
    if (pref) await updatePrefCount({COUNT: pref});
    else toast.current.show({ severity: 'error', summary: 'Error updating Prefernce Count', detail: 'Invalid Input', life: 3000 });
  }


    return (
      <div className="card">
      <h5>Preference Count</h5>
      <div className="formgroup-inline">
          <Toast ref={toast} />
          <div className="field">
              <InputNumber value={pref} onValueChange={(e) => setPref(e.value)} showButtons mode="decimal" format={false}></InputNumber>
          </div>
          <Button label="Update" onClick={()=>onPrefCountUpdate()}></Button>
      </div>
  </div>
    );
};

export default PreferenceCountSettings;
