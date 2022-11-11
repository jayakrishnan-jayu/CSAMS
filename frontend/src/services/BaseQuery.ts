import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { DocumentNode } from "graphql";
import { ClientError, request } from "graphql-request";

export const graphqlBaseQuery =
  ({baseUrl}:
    {
        baseUrl:string
    }
    ): BaseQueryFn<{document:string | DocumentNode ; variables?: any} , unknown ,ClientError
  > =>
  async ({ document, variables }) => {
    try {
      return { data: await request(baseUrl, document, variables) };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error };
      }
      throw error;
    }
  };


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