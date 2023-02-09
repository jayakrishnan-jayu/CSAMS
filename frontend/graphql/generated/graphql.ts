import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BatchInfoType = {
  __typename?: 'BatchInfoType';
  info?: Maybe<Array<Maybe<BatchYearSemType>>>;
  program?: Maybe<Scalars['String']>;
};

export type BatchType = {
  __typename?: 'BatchType';
  curriculum?: Maybe<CurriculumType>;
  extra?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['ID']>;
  sem?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type BatchYearSemType = {
  __typename?: 'BatchYearSemType';
  semesters?: Maybe<Array<Maybe<Scalars['Int']>>>;
  year?: Maybe<Scalars['Int']>;
};

export type CourseLabType = {
  __typename?: 'CourseLabType';
  course?: Maybe<CourseType>;
  lab?: Maybe<CourseType>;
};

export type CourseType = {
  __typename?: 'CourseType';
  batch?: Maybe<BatchType>;
  code?: Maybe<Scalars['String']>;
  credit?: Maybe<Scalars['Int']>;
  hours?: Maybe<Scalars['Int']>;
  l?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  p?: Maybe<Scalars['Int']>;
  t?: Maybe<Scalars['Int']>;
};

export type CreateUser = {
  __typename?: 'CreateUser';
  user?: Maybe<UserType>;
};

export type CurriculumType = {
  __typename?: 'CurriculumType';
  id?: Maybe<Scalars['ID']>;
  program?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type FacultyType = {
  __typename?: 'FacultyType';
  designation?: Maybe<Scalars['String']>;
  track?: Maybe<Scalars['String']>;
  user?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<CreateUser>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ProgramType = {
  __typename?: 'ProgramType';
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  batchInfo?: Maybe<BatchInfoType>;
  batches?: Maybe<Array<Maybe<BatchType>>>;
  course?: Maybe<CourseType>;
  courseLabs?: Maybe<Array<Maybe<CourseLabType>>>;
  courses?: Maybe<SemesterCourseType>;
  curriculums?: Maybe<Array<Maybe<CurriculumType>>>;
  faculty?: Maybe<FacultyType>;
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<UserType>;
  programs?: Maybe<Array<Maybe<ProgramType>>>;
  users?: Maybe<Array<Maybe<UserType>>>;
};


export type QueryBatchInfoArgs = {
  program?: InputMaybe<Scalars['String']>;
};


export type QueryBatchesArgs = {
  curriculumId?: InputMaybe<Scalars['ID']>;
  program?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type QueryCourseArgs = {
  code: Scalars['String'];
};


export type QueryCourseLabsArgs = {
  program: Scalars['String'];
  sem?: InputMaybe<Scalars['Int']>;
  year: Scalars['Int'];
};


export type QueryCoursesArgs = {
  program: Scalars['String'];
  sem: Scalars['Int'];
  year: Scalars['Int'];
};


export type QueryCurriculumsArgs = {
  program?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type SemesterCourseType = {
  __typename?: 'SemesterCourseType';
  courses?: Maybe<Array<Maybe<CourseType>>>;
};

export type UserType = {
  __typename?: 'UserType';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserType', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null } | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "BatchInfoType",
        "fields": [
          {
            "name": "info",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "BatchYearSemType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "program",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BatchType",
        "fields": [
          {
            "name": "curriculum",
            "type": {
              "kind": "OBJECT",
              "name": "CurriculumType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "extra",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "sem",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "year",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BatchYearSemType",
        "fields": [
          {
            "name": "semesters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "year",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CourseLabType",
        "fields": [
          {
            "name": "course",
            "type": {
              "kind": "OBJECT",
              "name": "CourseType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lab",
            "type": {
              "kind": "OBJECT",
              "name": "CourseType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CourseType",
        "fields": [
          {
            "name": "batch",
            "type": {
              "kind": "OBJECT",
              "name": "BatchType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "credit",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "hours",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "l",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "p",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "t",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateUser",
        "fields": [
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "UserType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CurriculumType",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "program",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "year",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FacultyType",
        "fields": [
          {
            "name": "designation",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "track",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "UserType",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "createUser",
            "type": {
              "kind": "OBJECT",
              "name": "CreateUser",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProgramType",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "batchInfo",
            "type": {
              "kind": "OBJECT",
              "name": "BatchInfoType",
              "ofType": null
            },
            "args": [
              {
                "name": "program",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "batches",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "BatchType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "curriculumId",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "program",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "year",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "course",
            "type": {
              "kind": "OBJECT",
              "name": "CourseType",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "courseLabs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseLabType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "program",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "sem",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "year",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "courses",
            "type": {
              "kind": "OBJECT",
              "name": "SemesterCourseType",
              "ofType": null
            },
            "args": [
              {
                "name": "program",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "sem",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "year",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "curriculums",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CurriculumType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "program",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "year",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "faculty",
            "type": {
              "kind": "OBJECT",
              "name": "FacultyType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hello",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "me",
            "type": {
              "kind": "OBJECT",
              "name": "UserType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "programs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ProgramType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "users",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserType",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SemesterCourseType",
        "fields": [
          {
            "name": "courses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "CourseType",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserType",
        "fields": [
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "firstName",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "lastName",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "username",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;

export const MeDocument = gql`
    query me {
  me {
    id
    email
    firstName
    lastName
    username
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};