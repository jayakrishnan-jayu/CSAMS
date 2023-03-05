import {FacultyQuery, useFacultyQuery} from '@/graphql/generated/graphql'
import React, { createContext } from 'react';

type FacultyContextType = {
    facultyData: FacultyQuery | undefined;
};

export const FacultyContext = createContext<FacultyContextType>({
    facultyData: undefined,
  });

 export const FacultyProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) =>{
    const [result] = useFacultyQuery();
    const {fetching, data, error} = result;
    if (fetching) return <div>Loading profile data</div>;
    if (error) return <div>faild to fetch your profile, please reload</div>

    return (
        <FacultyContext.Provider value={{ facultyData : data}}>
          {props.children}
        </FacultyContext.Provider>
      );

};