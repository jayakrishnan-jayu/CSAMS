import { useBatchManagementQuery } from '@/graphql/generated/graphql';
import React from 'react';
import ActiveBatchTable from './activeBatchTable';

const BatchManageTable = () => {
  const [result] = useBatchManagementQuery()
  const {fetching, data, error} = result;
  data?.batchManagement?.activeBatches
  if (error) return <div>{error.toString()}</div>
  return (
    <> 
        <ActiveBatchTable activeBatches={data?.batchManagement?.activeBatches} loading={fetching}/>
    </>
  );
}

export default BatchManageTable;
