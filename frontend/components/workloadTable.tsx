import { useUpdateWorkloadMutation, useWorkloadsQuery } from '@/graphql/generated/graphql';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';

const WorkloadTable = () => {
  let emptyWorkload = {
    track: '',
    designation: '',
    minHoursPerWeek: 0,
    maxHoursPerWeek: 0,
};
  const [result] = useWorkloadsQuery()
  const {fetching, data, error} = result;
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyWorkload);
  const [dialogShown, setDialogShown] = useState(true);
  const [newWorkload, updateWorkload] = useUpdateWorkloadMutation();
    
  const toast = useRef(null);
  const dt = useRef(null);

  if (error) return <div>{error.toString()}</div>
  let workloads: any[] | undefined = [];
  if (data?.workloads) {
    workloads = data?.workloads;
  }

  if (newWorkload.error?.message && !dialogShown) {
    toast.current.show({ severity: 'error', summary: 'Error updating workload', detail: newWorkload.error.message, life: 3000 });
    setDialogShown(true);
  }

  if (newWorkload.data?.updateWorkload?.workload && !dialogShown) {
    toast.current.show({ severity: 'success', summary: 'Workload Updated', life: 3000 });
    setDialogShown(true);
  }
  
    const hideDialog = () => {
        setProductDialog(false);
    };

    const saveProduct = async () => {
      setDialogShown(false);
      await updateWorkload({
        DESIGNATION: product.designation,
        TRACK: product.track,
        MAXHOURS: product.maxHoursPerWeek,
        MINHOURS: product.minHoursPerWeek,
      })
      setProduct(emptyWorkload);
      setProductDialog(false);
    };

    const editWorkload = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const onInputNumberChange = (e, name:string) => {
        const val = e.value || 0; // TODO: parse to integer
        let _product = { ...product };
        if (name === 'minHoursPerWeek')
          _product.minHoursPerWeek = val;
        else if (name === 'maxHoursPerWeek')
          _product.maxHoursPerWeek = val;
        setProduct(_product);
    };

    const trackBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Track</span>
                <span className={`track-badge track-${rowData?.track.toLowerCase()}`}>{rowData?.track}</span>
            </>
        );
    };

    const designationBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Designation</span>
                <span className={`designation-badge designation-${rowData.designation.toLowerCase().replace(/ +/g, "")}`}>{rowData.designation}</span>
            </>
        );
    };

    const minHourBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Min Hours/Week</span>
                {rowData.minHoursPerWeek}
            </>
        );
    };

    const maxHourBodyTemplate = (rowData) => {
      return (
          <>
              <span className="p-column-title">Max Hours/Week</span>
              {rowData.maxHoursPerWeek}
          </>
      );
  };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editWorkload(rowData)} />
            </>
        );
    };


    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <DataTable
                        ref={dt}
                        value={workloads}
                        rows={10}
                        loading={fetching}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        emptyMessage="No workload info found."
                        responsiveLayout="scroll"
                    >
                        <Column field="track" header="Track" sortable body={trackBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="designation" header="Designation" sortable body={designationBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="minHoursPerWeek" header="Min hr/week" body={minHourBodyTemplate}></Column>
                        <Column field="maxHoursPerWeek" header="Max hr/week" body={maxHourBodyTemplate}></Column>
                         <Column body={actionBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="formgrid grid">
                            <div className="field col">
                            <label>Track</label>
                            <div className={`track-badge track-${product?.track.toLowerCase()}`}>{product?.track}</div>
                            </div>
                                <div className="field col">
                                <label>Designation</label>
                                  <div className={`designation-badge designation-${product.designation.toLowerCase().replace(/ +/g, "")}`}>{product.designation}</div>
                                </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label>Min Hours/Week</label>
                                <InputNumber id="minHoursPerWeek" value={product.minHoursPerWeek} onValueChange={(e) => onInputNumberChange(e, 'minHoursPerWeek')} integeronly/>
                            </div>
                            <div className="field col">
                                <label>Max Hours/Week</label>
                                <InputNumber id="maxHoursPerWeek" value={product.maxHoursPerWeek} onValueChange={(e) => onInputNumberChange(e, 'maxHoursPerWeek')} integeronly/>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default WorkloadTable;
