import { useAllocationManagementQuery } from '@/graphql/generated/graphql';
import React from 'react';
import FacultyPreferenceAllocationTable from './facultyPreferenceAllocationTable';
import BatchAllocationPreferenceTable from './batchAllocationPreferenceTable';

const AllocationManagement = () => {
  const [result] = useAllocationManagementQuery()
  const {fetching, data, error} = result;
  if (error) return <div>{error.toString()}</div>
  return (
    <>
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <FacultyPreferenceAllocationTable 
            loading={fetching} 
            faculties={data?.allocationManagement?.faculties} 
            preferences={data?.allocationManagement?.preferences}
            courseAllocations={data?.allocationManagement?.batches.filter(b=>b.courseAllocations.length > 0).flatMap(b=>b.courseAllocations)}
            labAllocations={data?.allocationManagement?.batches.filter(b=>b.labAllocations.length > 0).flatMap(b=>b.labAllocations)}
            courses={data?.allocationManagement?.courses}
          />
        </div>
      </div>
      <BatchAllocationPreferenceTable
        loading={fetching}
        batches={data?.allocationManagement?.batches}
        courses={data?.allocationManagement?.courses}
        faculties={data?.allocationManagement?.faculties}
        preferences={data?.allocationManagement?.preferences}
        bestPreferences={data?.allocationManagement?.bestPreferences}
      />
    </div>
    </>
  );
}

export default AllocationManagement;
