import { useBatchManagementQuery } from '@/graphql/generated/graphql';
import React from 'react';
import ActiveBatchTable from './activeBatchTable';
import BatchUpdateSettings from './batchUpdateSettings';

const BatchManageTable = () => {
  const [result] = useBatchManagementQuery()
  const {fetching, data, error} = result;
  data?.batchManagement?.activeBatches
  if (error) return <div>{error.toString()}</div>
  return (
    <>
        <ActiveBatchTable activeBatch={data?.batchManagement?.activeBatches} loading={fetching}/>
        <BatchUpdateSettings batchID={82} />
    </>
  );
}

export default BatchManageTable;
