import {MetadataQuery, useMetadataQuery} from '@/graphql/generated/graphql'
import { useRouter } from 'next/router';

import React, { createContext } from 'react';

type MetaDataContextType = {
    metaData: MetadataQuery | undefined;
};

export const MetaDataContext = createContext<MetaDataContextType>({
    metaData: undefined,
  });

  interface ProviderProps {
    children: React.ReactNode;
  }
  
  const MetaDataProvider: React.FC<ProviderProps> = ({ children }) => {
    const [result] = useMetadataQuery();
    const {fetching, data, error} = result;
    if (fetching) return <div>Loading profile data</div>;
    if (error) {
      if (error.networkError?.message === 'Internal Server Error') useRouter().push('/api/auth/logout')
      return <div>Server is down</div>;
    }

    return (
        <MetaDataContext.Provider value={{ metaData : data}}>
          {children}
        </MetaDataContext.Provider>
      );

};
export default MetaDataProvider;