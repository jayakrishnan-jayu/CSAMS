import { ActiveBatchType } from '@/graphql/generated/graphql';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Sidebar } from 'primereact/sidebar';
import { classNames } from 'primereact/utils';
import { useRef, useState } from 'react';
import BatchUpdateSettings from './batchUpdateSettings';
import { Dialog } from 'primereact/dialog';

interface ActiveBatchTableProps {
    activeBatches: ActiveBatchType[],
    loading: boolean,
}


const ActiveBatchTable = ({activeBatches, loading}: ActiveBatchTableProps) => {
    const dt = useRef(null);
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [activeBatchID, setActiveBatchID] = useState<string>("");


    const isCompleteBodyTemplate = (rowData: ActiveBatchType) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.isComplete, 'text-pink-500 pi-times-circle': !rowData.isActive })}></i>;
    };

    const programBodyTemplate = (rowData: ActiveBatchType) => {
        return rowData.program && <span className={`generic-badge program-${rowData.program.toLowerCase().replace(/ +/g, "")}`}>{rowData.program}</span>;
    };

    const editBatch = (batch: ActiveBatchType) => {
        setActiveBatchID(batch?.id || "")
        setVisibleFullScreen(true);
    }

    const actionBodyTemplate = (rowData: ActiveBatchType) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editBatch(rowData)} />
            </>
        );
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Active Batches</h5>
                    <DataTable
                        ref={dt}
                        value={activeBatches}
                        rows={10}
                        loading={loading}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        emptyMessage="No workload info found."
                        responsiveLayout="scroll"
                    >
                        <Column field="program" header="Program" filterMenuStyle={{ width: '16rem' }} style={{ minWidth: '2rem' }} body={programBodyTemplate}/>
                        <Column field="curriculumYear" header="Curriculum Year" sortable  headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="year" header="Batch" sortable  headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="sem" header="Semester" ></Column>
                        <Column field="isComplete" header="Verified" dataType="boolean"  style={{ minWidth: '6rem' }} body={isCompleteBodyTemplate} /> 
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                    </DataTable>
                    <Dialog visible={visibleFullScreen} onHide={() => setVisibleFullScreen(false)} baseZIndex={1000}>
                        {
                        visibleFullScreen && 
                        <BatchUpdateSettings batchID={activeBatchID} />
                            }
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
export default ActiveBatchTable;