import React from 'react';
import { Provider } from 'urql';
import useClient from './useClient';

interface GraphqlProviderProps {
    children: React.ReactNode;
}

const UrqlProvider: React.FC<GraphqlProviderProps> = ({ children }) => {
  const client = useClient();

  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider; 