import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { DocumentNode } from "graphql";
import { ClientError, GraphQLClient, request } from "graphql-request";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";


// export declare type MaybePromise<T> = T | PromiseLike<T>;
// export type prepareHeaders = (headers: Headers) => MaybePromise<Headers>;
//export declare function request<T = any, V = Variables>(url: string, document: RequestDocument | TypedDocumentNode<T, V>, ..._variablesAndRequestHeaders: V extends Record<any, never> ? [variables?: V, requestHeaders?: Dom.RequestInit['headers']] : keyof RemoveIndex<V> extends never ? [variables?: V, requestHeaders?: Dom.RequestInit['headers']] : [variables: V, requestHeaders?: Dom.RequestInit['headers']]): Promise<T>;


//1. Declare type of header that is 

export const graphqlBaseQuery =
  ({baseUrl}:
    {
        baseUrl:string
       
    }
    ): BaseQueryFn<{document:string | DocumentNode ; variables?: any } , unknown ,ClientError
  >  =>
  async ({ document, variables }) => {
    try {
      return { data: await request (baseUrl, document, variables  ) };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error };
      }
      throw error;
    }
  };


// {["Content-type"]: "application/json"}
/*
({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    { document: string | DocumentNode; variables?: any },
    unknown,
    ClientError
  >
*/