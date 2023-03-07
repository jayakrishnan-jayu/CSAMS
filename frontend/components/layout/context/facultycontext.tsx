import {FacultyQuery, useFacultyQuery} from '@/graphql/generated/graphql'
import { useRouter } from 'next/router';

import React, { createContext } from 'react';

type FacultyContextType = {
    facultyData: FacultyQuery | undefined;
};

export const FacultyContext = createContext<FacultyContextType>({
    facultyData: undefined,
  });

  interface ProviderProps {
    children: React.ReactNode;
  }
  
  const FacultyProvider: React.FC<ProviderProps> = ({ children }) => {
    const [result] = useFacultyQuery();
    const {fetching, data, error} = result;
    if (fetching) return <div>Loading profile data</div>;
    if (error) {
      if (error.networkError?.message === 'Internal Server Error') useRouter().push('/api/auth/logout')
      return <div>Server is down</div>;
    }

    return (
        <FacultyContext.Provider value={{ facultyData : data}}>
          {children}
        </FacultyContext.Provider>
      );

};
export default FacultyProvider;