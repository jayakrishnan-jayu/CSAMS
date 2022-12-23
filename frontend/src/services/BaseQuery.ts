import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { DocumentNode } from "graphql";
import { ClientError,  request } from "graphql-request";


//const token = (state: RootState) => state.AuthAPI ;
const token = "hi"
const requestHeaders: HeadersInit = new Headers();
// requestHeaders.set('Content-Type', 'application/json');
requestHeaders.set('authorization' , `Bearer ${token}`);


export const graphqlBaseQuery =
  ({baseUrl , requestHeaders }:
    {
        baseUrl:string,
        requestHeaders?: HeadersInit 
       
    }
    ): BaseQueryFn<{document:string | DocumentNode ; variables?: any } , unknown ,ClientError
  >  =>
  async ({ document, variables }) => {
    try {
      
      return { data: await request (baseUrl, document, variables , requestHeaders  ) };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error };
      }
      throw error;
    }
  };


  


