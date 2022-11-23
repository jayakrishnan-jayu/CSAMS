import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { RequestOptions } from "graphql-request";
import type { RootState } from "../store";
import {graphqlBaseQuery} from "../services/BaseQuery"

// const axiosBaseQuery = (): BaseQueryFn<RequestOptions> => async (requestOpts, { getState }) => {
//     try {
//       const token = (getState() as RootState).auth.AccessToken ;
//       if(token)
//       {
        
//       }
//       });
  
//       return { data: wrapResponseWithLink(result.data, result.headers.link) };
//     } catch (axiosError) {
//       const err = axiosError as AxiosError;
//       return { error: { status: err.response?.status, data: err.response?.data } };
//     }
//   };

